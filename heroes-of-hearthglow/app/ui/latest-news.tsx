'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

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
    return newsData;
  } catch (error) {
    return [];
  }
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsCard, setNewsCard] = useState<number>(0);

  useEffect(() => {
    const getNews = async () => {
      const fetchedNews = await fetchNews();
      setNews(fetchedNews);
      setIsLoading(false);
    };

    getNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (news.length === 0) {
    return <p>No news available</p>;
  }

  return (
      <section className="flex justify-center bg-black">
        <div className="max-w-[1050px] flex-col h-fit justify-center w-[90vw] relative">
          <h1 className="text-center lg:mb-5 p-5 text-4xl lg:text-6xl lg:mb-10 font-bold text-cyan-50" id="news">
            NEWS
          </h1>
          <div className="relative">
            <img
                src={news[newsCard].image}
                alt={news[newsCard].title}
                className="w-full h-auto rounded-t-lg border-amber-400 border-2 border-b-0"
            />
            <p className="absolute bottom-0 left-1 p-2 z-10 text-slate-300"
               style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}>
              <span className="absolute inset-0 bg-black opacity-30 rounded-t-lg w"></span>
              <span className="relative">
              {news[newsCard].time}
                </span>
            </p>
          </div>
          <h2 className="bg-gray-950 pt-5 border-amber-400 border-2 border-t-0 border-b-0 pb-5 font-bold text-slate-300 lg:text-4xl lg:text-center md:text-3xl text-2xl text-center">
            {news[newsCard].title}
          </h2>
          <p className="text-justify text-md lg:text-justify lg:text-lg md:text-md leading-8 font-normal border-amber-400 border-2 border-t-0 whitespace-pre-wrap bg-gray-950 text-slate-300 pr-5 pl-5 pb-5 rounded-b-lg">
            {news[newsCard].description}
          </p>
          <div className="flex justify-center p-5 gap-8">
            {newsCard > 0 && (
                <a
                    onClick={() => setNewsCard(prev => prev - 1)}
                    className="text-xl md:text-2xl lg:text-4xl font-bold text-slate-300 bg-stone-900 border-2 border-amber-400 p-4 md:p-6 rounded-2xl hover:scale-95"
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </a>
            )}
            {newsCard < news.length - 1 && (
                <a
                    onClick={() => setNewsCard(prev => prev + 1)}
                    className="text-xl md:text-2xl lg:text-4xl font-bold text-slate-300 bg-stone-900 border-2 border-amber-400 p-4 md:p-6 rounded-2xl hover:scale-95"
                >
                  <ArrowRightIcon className="w-6 h-6" />
                </a>
            )}
          </div>
        </div>
      </section>
  );
}