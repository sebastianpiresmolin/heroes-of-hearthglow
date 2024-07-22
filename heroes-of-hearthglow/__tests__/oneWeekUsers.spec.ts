import { createMocks } from 'node-mocks-http';
import handler from '../app/api/analytics/oneWeekUsers';
import fetchMock from 'jest-fetch-mock';
import { NextApiRequest, NextApiResponse } from 'next';

// Enable fetchMock globally
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('/api/analytics/oneWeekUsers API endpoint', () => {
  it('should return data when API call is successful', async () => {
    const mockResponseData = {
      rows: [
        {
          dimensionValues: [{ value: 'value1' }],
          metricValues: [{ value: '100' }],
        },
      ],
    };

    
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData));

    const { req, res } = createMocks({
      method: 'GET',
    });

    // Cast to unknown first, then to NextApiRequest and NextApiResponse, because createMocks returns a generic object
    // and handler expects NextApiRequest and NextApiResponse objects
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockResponseData);
  });

  it('should return 500 when API call fails', async () => {
    // Mock the fetch response to fail
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    const { req, res } = createMocks({
      method: 'GET',
    });


    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Failed to fetch data' });
  });
});