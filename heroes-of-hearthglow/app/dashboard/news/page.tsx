'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function DashboardNews() {
  interface NewsItem {
    id: number;
    title: string;
    time: string;
    description: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeNews, setActiveNews] = useState<NewsItem>(news[0]);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch('/api/news/allnews');
      const data = await response.json();
      setNews(data);
    }

    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      setActiveNews(news[0]);
    }
  }, [news]);

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
                className="flex-col justify-between bg-zinc-800 mt-6 text-2xl items-center p-4 rounded-md shadow-sm shadow-black outline outline-1 outline-zinc-700 cursor-pointer hover:bg-zinc-700"
                onClick={() => setActiveNews(news)}
              >
                <div className="flex justify-between align-middle">
                  <p className="text-trueGray-50  ">
                    <span className="text-zinc-400"># </span>
                    {news.id}
                  </p>
                  <p className="text-trueGray-50 basis-3/4">{news.title}</p>
                  <p className="text-trueGray-50">{news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-col bg-neutral-900 flec-col p-10 ml-10 w-2/5 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
        <div className="flex text-2xl justify-between">
          <p className="text-trueGray-50">
            <span className="text-zinc-400"># </span>
            {activeNews ? activeNews.id : 'Loading...'}
          </p>
          <h1 className="text-trueGray-50">
            {activeNews ? activeNews.title : 'Loading...'}
          </h1>
        </div>
        <div>
          <p className="text-zinc-400 text-xl mt-4">
            {activeNews ? activeNews.time : 'Loading...'}
          </p>
        </div>
        <div className="max-h-[600px] overflow-y-scroll bg-zinc-800 pl-6 pr-6 outline outline-1 outline-zinc-700 rounded-lg mt-4">
          <p className="text-trueGray-50 mt-4 text-xl whitespace-pre-wrap text-justify">
            {activeNews ? activeNews.description : 'Loading...'}
          </p>
        </div>
        <div className="flex gap-10 mt-5">
          <Link
            href="/dashboard/news"
            className="text-trueGray-50 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700 flex items-center"
          >
            <PencilIcon className="w-5 h-5 mr-2 " />
            <p className="text-md font-semibold">Edit</p>
          </Link>
          <Link
            href="/dashboard/news"
            className="text-red-500 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-red-900 outline outline-1 outline-zinc-700 flex items-center"
          >
            <TrashIcon className="w-5 h-5 mr-2 " />
            <p className="text-md font-semibold">Delete</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
