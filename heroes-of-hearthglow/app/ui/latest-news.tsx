'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type NewsItem = {
  image: string;
  title: string;
  time: string;
  description: string;
  [key: string]: any;
};

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const response = await axios.get('/api/news/fivelatestnews');
    const newsData = response.data;
    console.log('Fetched news data:', newsData); // Log fetched news data
    return newsData; // Return news data directly without mapping
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getNews = async () => {
      const fetchedNews = await fetchNews();
      console.log('Setting fetched news:', fetchedNews); // Log news before setting state
      setNews(fetchedNews);
      setIsLoading(false); // Set loading to false once data is fetched
    };

    getNews();
  }, []);

  console.log('Current news state:', news); // Log current news state

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (news.length === 0) {
    return <p>No news available</p>;
  }

  return (
      <section className="flex justify-center bg-gray-400">
        <div className="max-w-[1050px] flex-col h-fit justify-center w-[90vw] relative">
          <h1 className="text-center lg:mb-5 p-5 text-4xl font-bold text-black" id="news">
            NEWS
          </h1>
          <div className="relative">
            <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-auto rounded-t-lg shadow-[inset_0px_0px_10px_10px_#black]"
            />
            <p className="absolute bottom-0 left-0 p-2 z-10 text-white">
              {news[0].time}
            </p>
          </div>
          <h2 className="bg-slate-300 pt-5 pb-5 font-bold text-xl text-center">
            {news[0].title}
          </h2>
          <p className="text-justify whitespace-pre-wrap bg-slate-300 pr-5 pl-5 pb-5 rounded-b-lg">
            {news[0].description}
          </p>
          <div className="flex justify-center p-5">
            <a href="#" className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-500 bg-blue-200 p-4 md:p-6 rounded-2xl hover:scale-95">
              SHOW MORE
            </a>
          </div>
        </div>
      </section>
  );
}