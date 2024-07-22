import { fetchAnalyticsData } from '../app/lib/fetchAnalyticsData';

global.fetch = jest.fn();

describe('fetchAnalyticsData', () => {
  const mockUrl = 'https://example.com/api/data';
  const mockData = {
    rows: [
      {
        dimensionValues: [{ value: 'dimension1' }],
        metricValues: [{ value: 'metric1' }],
      },
    ],
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch and return data when the response is ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchAnalyticsData(mockUrl);

    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should throw an error when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchAnalyticsData(mockUrl)).rejects.toThrow(
      'Failed to fetch data'
    );
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should throw an error when fetch fails', async () => {
    const mockError = new Error('Network error');
    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(fetchAnalyticsData(mockUrl)).rejects.toThrow('Network error');
    expect(global.fetch).toHaveBeenCalledWith(mockUrl);
  });
});
