import { fetchAnalyticsData } from '../app/lib/data';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('fetchAnalyticsData', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should fetch data successfully', async () => {
        const mockData = { activeUsers: 100 };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const params = { startDate: '2023-01-01', endDate: '2023-01-31', metrics: 'activeUsers' };
        const data = await fetchAnalyticsData(params);

        expect(data).toEqual(mockData);
        expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/api/analytics?startDate=2023-01-01&endDate=2023-01-31&metrics=activeUsers'));
    });

    it('should throw an error for a failed fetch', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ message: 'Not Found' }), { status: 404 });

        const params = { startDate: '2023-01-01', endDate: '2023-01-31', metrics: 'activeUsers' };

        await expect(fetchAnalyticsData(params)).rejects.toThrow('HTTP error! status: 404');
    });

    it('should construct the correct URL', async () => {
        const mockData = { activeUsers: 100 };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const params = { startDate: '2023-01-01', endDate: '2023-01-31', metrics: 'activeUsers' };
        await fetchAnalyticsData(params);

        const expectedURL = new URL(`/api/analytics?startDate=${params.startDate}&endDate=${params.endDate}&metrics=${params.metrics}`, "http://localhost:3000").toString();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenLastCalledWith(expectedURL);
    });
});