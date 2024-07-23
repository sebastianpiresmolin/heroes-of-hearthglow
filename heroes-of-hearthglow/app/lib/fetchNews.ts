export const fetchNews = async (
  page: number,
  setNews: (news: any[]) => void,
  setActiveNews: (news: any) => void,
  setTotalPages: (totalPages: number) => void,
  itemsPerPage: number,
  token: string
) => {
  try {
    const response = await fetch(`/api/news/allnews?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch news. Status: ${response.status}`);
      throw new Error('Failed to fetch news');
    }
    const { news, totalCount } = await response.json();
    setNews(news);
    setActiveNews(news.length > 0 ? news[0] : null);
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }
};
