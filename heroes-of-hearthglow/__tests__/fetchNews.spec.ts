import fetchMock from 'jest-fetch-mock';

// Mock the state setting functions
const setNews = jest.fn();
const setActiveNews = jest.fn();
const setTotalPages = jest.fn();

const itemsPerPage = 8;

const fetchNews = async (page: number) => {
  try {
    const response = await fetch(`/api/news/allnews?page=${page}`);
    const { news, totalCount } = await response.json();
    setNews(news);
    setActiveNews(news.length > 0 ? news[0] : null);
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }
};

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

    await fetchNews(1);

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

    await fetchNews(1);

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

    await fetchNews(1);

    expect(fetchMock).toHaveBeenCalledWith('/api/news/allnews?page=1');
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Failed to fetch news:',
      expect.any(Error)
    );

    consoleErrorMock.mockRestore();
  });
});
