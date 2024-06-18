import React from 'react';
import { getLatestNews } from '../lib/data';

export default async function LatestNews() {
  const newsData = await getLatestNews();
  const news = newsData.map((news) => news.toJSON());

  return (
    <section className="flex justify-center bg-gray-400 ">
      <div className="max-w-[1050px] flex-col h-fit bg-cover bg-center justify-center w-[90vw] relative">
        <h1 className="text-center p-5 text-4xl font-bold text-black" id="news">
          NEWS
        </h1>
        <div className="relative">
          {' '}
          {/* Container with relative positioning */}
          <img
            src={news[0].image}
            alt={news[0].title}
            className="w-full h-auto rounded-lg shadow-[inset_0px_0px_10px_10px_#9ca3af]"
          />
          {/* Absolute positioning for the p element */}
          <p className="absolute bottom-0 left-0 p-2 z-10 text-white ">
            {news[0].time}
          </p>
        </div>
        <h2>{news[0].title}</h2>
        <p className="text-justify whitespace-pre-wrap">
          {news[0].description}
        </p>
      </div>
    </section>
  );
}
