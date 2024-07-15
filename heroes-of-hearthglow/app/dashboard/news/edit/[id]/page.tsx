'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useParams } from 'next/navigation';

export default function PatchNews() {
  interface newsItemInterface {
    title: string;
    description: string;
    image: string;
    id: number;
    time: string;
  }

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [newsItem, setNewsItem] = React.useState({
    title: '',
    description: '',
    image: '',
    id: 0,
    time: '',
  });
  const [showPreview, setShowPreview] = React.useState(false);

  useEffect(() => {
    if (id) {
      setNewsItem((prevState) => ({
        ...prevState,
        id: Number(id),
      }));
    }
  }, [id]);

  // Submit news item to database
  async function submitNewsItem(newsItem: newsItemInterface) {
    const response = await fetch('/api/news/createNews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsItem),
    });
    router.push('/dashboard/news');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="flex-col">
      <div className="flex absolute top-3">
        <a className=" text-zinc-500" href="/dashboard">
          Home
        </a>
        <p className=" text-zinc-500 ml-2">&gt;</p>
        <a
          className=" text-zinc-500 ml-2"
          href="/dashboard/news
        "
        >
          News
        </a>
        <p className=" text-zinc-500 ml-2">&gt;</p>
        <p className=" text-zinc-500 ml-2">Create</p>
      </div>
      {/* Create News Form */}
      {!showPreview && (
        <div className="flex-col w-3/5 m-auto justify-center h-full">
          <div className="bg-neutral-900 m-auto w-fit h-fit flex-col p-10 mt-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <h1 className="text-trueGray-50 text-4xl font-bold">
              Create News Item
            </h1>
            <div className="flex gap-20">
              <div>
                <h2 className="text-trueGray-50 text-2xl font-bold mt-5">
                  Title
                </h2>
                <input
                  className="p-2 my-2 text-trueGray-50 focus:outline-trueGray-50 outline-1 rounded-md 2xl:w-[300px] 2xl:h-[50px]
                bg-zinc-800"
                  id="title"
                  type="text"
                  value={newsItem.title}
                  onChange={(e) =>
                    setNewsItem({ ...newsItem, title: e.target.value })
                  }
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <h2 className="text-trueGray-50 text-2xl font-bold mt-5">
                  Image
                </h2>
                <input
                  className="p-2 my-2 text-trueGray-50 focus:outline-trueGray-50 outline-1 rounded-md 2xl:w-[400px] 2xl:h-[50px]
                bg-zinc-800"
                  id="image"
                  type="text"
                  value={newsItem.image}
                  onChange={(e) =>
                    setNewsItem({ ...newsItem, image: e.target.value })
                  }
                  placeholder="Enter image URL: https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            <h2 className="text-trueGray-50 text-2xl font-bold mt-5">
              Description
            </h2>
            <div className="flex flex-wrap justify-end items-start w-full h-fit">
              <textarea
                className="w-full p-2 my-2 text-trueGray-50 overflow-y-scroll focus:outline-trueGray-50 outline-1 rounded-md 2xl:w-full 2xl:h-[500px] bg-zinc-800 resize-none"
                id="image"
                value={newsItem.description}
                onChange={(e) =>
                  setNewsItem({ ...newsItem, description: e.target.value })
                }
                placeholder="Enter description..."
                required
              ></textarea>
              <button
                className="text-trueGray-50 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700"
                onClick={() => setShowPreview(true)}
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      )}
      {/* News Preview */}
      {showPreview && (
        <div className=" max-w-[1050px] flex-col h-fit justify-center w-[90vw] m-auto p-10 relative bg-neutral-900 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
          <h1
            className="text-center lg:mb-5 p-5 text-trueGray-50 text-4xl font-bold"
            id="news"
          >
            PREVIEW
          </h1>
          <div className="relative">
            {' '}
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className=" w-full h-auto rounded-t-lg shadow-[inset_0px_0px_10px_10px_#black]"
            />
            <p className="absolute bottom-0 left-0 p-2 z-10 text-white ">
              {newsItem.time}
            </p>
          </div>
          <h2 className="bg-slate-300 pt-5 pb-5 font-bold text-xl text-center">
            {newsItem.title}
          </h2>
          <p className="text-justify whitespace-pre-wrap bg-slate-300 pr-5 pl-5 pb-5 rounded-b-lg">
            {newsItem.description}
          </p>
          <button
            className="text-trueGray-50 mr-10 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700"
            onClick={() => setShowPreview(false)}
          >
            Edit
          </button>
          <button
            className="text-trueGray-50 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700"
            onClick={() => submitNewsItem(newsItem)}
          >
            Create & Publish
          </button>
        </div>
      )}
    </div>
  );
}
