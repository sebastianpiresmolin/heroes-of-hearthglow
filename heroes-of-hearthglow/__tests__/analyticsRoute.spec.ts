import { GET } from '../app/api/analytics/route';

jest.mock('@google-analytics/data', () => {
    const runReport = jest.fn().mockResolvedValue([{ data: 'mocked data' }]);
    return {
        BetaAnalyticsDataClient: jest.fn().mockImplementation(() => ({
            runReport,
        })),
        runReport,
    };
});

jest.mock('next/server', () => {
    const originalModule = jest.requireActual('next/server');
    return {
        ...originalModule,
        NextResponse: {
            json: jest.fn((data) => ({
                json: jest.fn().mockResolvedValue(data),
                status: data.error ? 500 : 200,
            })),
        },
    };
});

describe('GET /api/analytics', () => {
    it('should return a successful response with the correct data', async () => {
        process.env.GOOGLE_GA4_PROPERTY_ID = 'mocked-property-id';
        process.env.GOOGLE_CLIENT_EMAIL = 'mocked-client-email';
        process.env.GOOGLE_PRIVATE_KEY = 'mocked-private-key';

        const req = {
            url: 'http://localhost:3000/api/analytics?startDate=2023-01-01&endDate=2023-01-31&metrics=activeUsers',
            method: 'GET',
            headers: {},
        } as unknown as Request;

        const response = await GET(req);
        const json = await response.json();

        expect(response.status).toBe(200);
        expect(json).toEqual({ data: 'mocked data' });
    });

    it('should return an error response when runReport fails', async () => {
        const { runReport } = jest.requireMock('@google-analytics/data');
        runReport.mockRejectedValueOnce(new Error('Test error'));

        process.env.GOOGLE_GA4_PROPERTY_ID = 'mocked-property-id';
        process.env.GOOGLE_CLIENT_EMAIL = 'mocked-client-email';
        process.env.GOOGLE_PRIVATE_KEY = 'mocked-private-key';

        const req = {
            url: 'http://localhost:3000/api/analytics?startDate=2023-01-01&endDate=2023-01-31&metrics=activeUsers',
            method: 'GET',
            headers: {},
        } as unknown as Request;

        const response = await GET(req);
        const json = await response.json();

        expect(response.status).toBe(500);
        expect(json).toEqual({ error: 'Test error' });
    });
});