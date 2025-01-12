import { POST } from '@/app/api/auth/login/route';
import { connect } from '@/app/lib/dbconnect';
import { User } from '@/app/lib/data';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { NextRequest, NextResponse } from 'next/server';

jest.mock('@/app/lib/dbconnect', () => ({
    connect: jest.fn(),
}));

jest.mock('@/app/lib/data', () => ({
    User: {
        findOne: jest.fn(),
    },
}));

jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    __esModule: true,
    default: {
        sign: jest.fn(() => 'mockedToken'),
    },
}));

jest.mock('@/corsMiddleware', () => ({
    corsMiddleware: jest.fn(() => {
        return new (jest.requireMock('next/server').NextResponse)(null, {
            status: 200,
            headers: { 'X-Test-Cors': 'true' },
        });
    }),
}));


// Mock `NextResponse` from next/server to simulate response objects
jest.mock('next/server', () => {
    const originalModule = jest.requireActual('next/server');

    return {
        ...originalModule,
        NextResponse: class {
            static json(data: any, init: { status?: number; headers?: Record<string, string> } = {}) {
                const headers = new Map(Object.entries(init.headers || {}));
                const mockCookies = new Map<string, string>();
                return {
                    json: jest.fn().mockResolvedValue(data),
                    status: init.status || 200,
                    headers: {
                        get: (key: string) => headers.get(key),
                        set: (key: string, value: string) => headers.set(key, value),
                    },
                    cookies: {
                        set: (key: string, value: string) => mockCookies.set(key, value),
                        get: (key: string) => mockCookies.get(key),
                    },
                };
            }

            // Constructor method to simulate creating instances of NextResponse
            constructor(body: any, init: { status?: number; headers?: Record<string, string> } = {}) {
                const headers = new Map(Object.entries(init.headers || {}));
                return {
                    body,
                    status: init.status || 200,
                    headers: {
                        get: (key: string) => headers.get(key),
                        set: (key: string, value: string) => headers.set(key, value),
                    },
                    cookies: {
                        set: jest.fn(),
                    },
                };
            }
        },
    };
});

describe('POST /api/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // 1 //
    it('should return 403 if CORS policy is violated', async () => {
        const corsMiddleware = require('@/corsMiddleware').corsMiddleware;
        corsMiddleware.mockReturnValueOnce(false);

        const request = {
            method: 'OPTIONS',
            headers: {
                get: jest.fn().mockReturnValue('http://not-allowed-origin'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);
        expect(response.status).toBe(403);
        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'CORS policy violation' });
    });

    // 2 //
    it('should return 400 if user does not exist', async () => {
        (connect as jest.Mock).mockResolvedValue(true);
        (User.findOne as jest.Mock).mockResolvedValue(null);

        const request = {
            method: 'POST',
            json: jest.fn().mockResolvedValue({
                username: 'nonexistent',
                password: 'password123',
            }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);

        expect(connect).toHaveBeenCalled();
        expect(User.findOne).toHaveBeenCalledWith({ username: /^nonexistent$/i });
        expect(response.status).toBe(400);
        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'User does not exist' });
    });

    // 3 //
    it('should return 500 if request body is missing username or password', async () => {
        const request = {
            method: 'POST',
            json: jest.fn().mockResolvedValue({
                username: '',
            }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);
        expect(response.status).toBe(500);
        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'Invalid request body - username or password missing' });
    });

    // 4 //
    it('should return 400 if password is invalid', async () => {
        // Mocka anslutning och existerande användare
        (connect as jest.Mock).mockResolvedValue(true);
        (User.findOne as jest.Mock).mockResolvedValue({
            username: 'testuser',
            password: 'hashedpassword',
        });

        (bcryptjs.compare as jest.Mock).mockResolvedValue(false);

        const request = {
            method: 'POST',
            json: jest.fn().mockResolvedValue({
                username: 'testuser',
                password: 'wrongpassword',
            }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);

        expect(bcryptjs.compare).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
        expect(response.status).toBe(400);

        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'Invalid password' });
    });

    // 5 //
    it('should return a token on successful login', async () => {
        (connect as jest.Mock).mockResolvedValue(true);
        (User.findOne as jest.Mock).mockResolvedValue({
            _id: '123',
            username: 'testuser',
            password: 'hashedpassword',
        });
        (bcryptjs.compare as jest.Mock).mockResolvedValue(true);

        const request = {
            method: 'POST',
            json: jest.fn().mockResolvedValue({
                username: 'testuser',
                password: 'correctpassword',
            }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);

        expect(jwt.default.sign).toHaveBeenCalledWith(
            { id: '123', username: 'testuser' },
            process.env.TOKEN_SECRET!,
            { expiresIn: '1d' }
        );

        const responseData = await response.json();
        expect(responseData).toMatchObject({
            message: 'Login successful',
            success: true,
        });
        expect(response.cookies.get('token')).toEqual('mockedToken');
    });

    // 6 //
    it('should return 500 on internal server error', async () => {
        (connect as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

        const request = {
            method: 'POST',
            json: jest.fn().mockResolvedValue({
                username: 'testuser',
                password: 'correctpassword',
            }),
            headers: {
                get: jest.fn().mockReturnValue('application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await POST(request);

        expect(response.status).toBe(500);
        const responseData = await response.json();
        expect(responseData).toEqual({ error: 'Database connection failed' });
    });
});