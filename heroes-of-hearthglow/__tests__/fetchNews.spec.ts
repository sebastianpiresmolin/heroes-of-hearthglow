import fetchMock from 'jest-fetch-mock';
import { fetchNews } from '../app/lib/data';

// Mock the state setting functions
const setNews = jest.fn();
const setActiveNews = jest.fn();
const setTotalPages = jest.fn();

const itemsPerPage = 8;

describe('fetchNews', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('should fetch news and set state correctly', async () => {
    const mockNews = [{ title: 'News 1' }, { title: 'News 2' }];
    const mockTotalCount = 20;

    fetchMock.mockResponseOnce(
      JSON.stringify({ news: mockNews, totalCount: mockTotalCount })
    );

    await fetchNews(1, setNews, setActiveNews, setTotalPages, itemsPerPage);

    expect(fetchMock).toHaveBeenCalledWith('/api/news/allnews?page=1');
    expect(setNews).toHaveBeenCalledWith(mockNews);
    expect(setActiveNews).toHaveBeenCalledWith(mockNews[0]);
    expect(setTotalPages).toHaveBeenCalledWith(
      Math.ceil(mockTotalCount / itemsPerPage)
    );
  });

  it('should handle empty news array', async () => {
    const mockNews: any[] = [];
    const mockTotalCount = 0;

    fetchMock.mockResponseOnce(
      JSON.stringify({ news: mockNews, totalCount: mockTotalCount })
    );

    await fetchNews(1, setNews, setActiveNews, setTotalPages, itemsPerPage);

    expect(fetchMock).toHaveBeenCalledWith('/api/news/allnews?page=1');
    expect(setNews).toHaveBeenCalledWith(mockNews);
    expect(setActiveNews).toHaveBeenCalledWith(null);
    expect(setTotalPages).toHaveBeenCalledWith(
      Math.ceil(mockTotalCount / itemsPerPage)
    );
  });

  it('should handle fetch error', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    await fetchNews(1, setNews, setActiveNews, setTotalPages, itemsPerPage);

    expect(fetchMock).toHaveBeenCalledWith('/api/news/allnews?page=1');
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Failed to fetch news:',
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });
});
