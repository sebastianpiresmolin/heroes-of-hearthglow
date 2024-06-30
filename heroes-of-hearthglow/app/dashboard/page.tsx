'use client';
import { Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function DashboardHome() {
  interface NewsItem {
    id: number;
    title: string;
    time: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch('/api/news/fivelatestnews');
      const data = await response.json();
      setNews(data);
    }

    fetchNews();
  }, []);

  return (
    <div className="flex">
      <a className="absolute top-3 text-zinc-500" href="/dashboard">
        Home
      </a>
      <div className="flex-col w-3/5 h-full">
        <div className="flex gap-10">
          <div className="bg-neutral-900 leading-10 w-full p-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <p className="text-zinc-400">This week</p>
            <h1 className="text-trueGray-50 text-4xl font-semibold">$1,329</h1>
            <p className="text-zinc-400">
              <span className="text-green-400">+25%</span> from last week
            </p>
          </div>
          <div className="bg-neutral-900 w-full p-10 leading-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <p className="text-zinc-400">This week</p>
            <h1 className="text-trueGray-50 text-4xl font-semibold">$1,329</h1>
            <p className="text-zinc-400">
              <span className="text-green-400">+25%</span> from last week
            </p>
          </div>
        </div>
        <div>
          <div className="bg-neutral-900 flec-col p-10 mt-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <h1 className="text-trueGray-50 text-4xl font-bold">Latest News</h1>
            <p className="text-zinc-400">The latest five news updates</p>
            <div className="flex justify-between mt-10 mr-2 ml-2">
              <p className="text-zinc-400">ID</p>
              <p className="text-zinc-400 basis-3/4">Title</p>
              <p className="text-zinc-400">Date</p>
            </div>
            {news.map((news) => (
              <div
                key={news.id}
                className="flex-col justify-between mt-8 text-2xl"
              >
                <div className="flex justify-between align-middle">
                  <p className="text-trueGray-50  ">
                    <span className="text-zinc-400"># </span>
                    {news.id}
                  </p>
                  <p className="text-trueGray-50 basis-3/4">{news.title}</p>
                  <p className="text-trueGray-50">{news.time}</p>
                </div>
                <Divider className="bg-zinc-600 mt-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 flec-col p-10 ml-10 w-2/5 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
        <div></div>
      </div>
    </div>
  );
}
