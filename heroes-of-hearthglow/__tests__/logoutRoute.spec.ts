import { GET } from '@/app/api/auth/logout/route';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('next/server', () => {
    const originalModule = jest.requireActual('next/server');

    return {
        ...originalModule,
        NextResponse: {
            json: jest.fn((data: any, init: { status?: number } = {}) => ({
                json: async () => data,
                status: init.status || 200,
                cookies: {
                    set: jest.fn(),
                    get: jest.fn(),
                },
            })),
        },
    };
});

describe('GET /api/logout', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return a 500 error if an exception occurs', async () => {

        (NextResponse.json as jest.Mock).mockImplementationOnce(() => {
            throw new Error('Unexpected Error');
        });

        const mockRequest = {
            method: 'GET',
            headers: {
                get: jest.fn(() => 'application/json'),
            },
        } as unknown as NextRequest;

        // Kör GET-metoden
        const response: any = await GET(mockRequest);

        // Kontrollera att statuskoden är 500
        expect(response.status).toBe(500);

        // Kontrollera att rätt svar returneras
        const responseBody = await response.json();
        expect(responseBody).toEqual({
            error: 'Unexpected Error',
        });
    });

    it('should clear the token cookie and return a successful logout message', async () => {
        const mockRequest = {
            method: 'GET',
            headers: {
                get: jest.fn(() => 'application/json'),
            },
        } as unknown as NextRequest;

        const response: any = await GET(mockRequest);

        expect(response.status).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            message: 'Logout successful',
            success: true,
        });

        const cookies = response.cookies;
        expect(cookies.set).toHaveBeenCalledWith('token', '', {
            httpOnly: true,
            expires: expect.any(Date),
        });
    });
});