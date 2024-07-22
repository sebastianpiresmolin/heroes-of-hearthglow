export const fetchNews = async (
  page: number,
  setNews: (news: any[]) => void,
  setActiveNews: (news: any) => void,
  setTotalPages: (totalPages: number) => void,
  itemsPerPage: number
) => {
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
