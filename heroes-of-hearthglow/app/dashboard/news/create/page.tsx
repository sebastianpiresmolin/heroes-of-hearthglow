'use client';

import React, { use, useEffect } from 'react';

export default function CreateNews() {
  const formatDate = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Add 1 because months are 0-indexed.
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [newsItem, setNewsItem] = React.useState({
    title: '',
    description: '',
    image: '',
    id: 0,
    time: formatDate(new Date()),
  });

  useEffect(() => {
    fetch('/api/news/latestId')
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ' + data[0].id); // First log: logs the fetched data
        setNewsItem(() => ({ ...newsItem, id: data[0].id + 1 }));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    console.log('new state: ' + newsItem.id); // Second log: logs the updated state
  }, [newsItem.id]);

  useEffect(() => {
    console.log('date: ' + newsItem.time, 'type:', typeof newsItem.time); // Second log: logs the updated state
  }, [newsItem.time]);

  return (
    <div className="flex">
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
      <div className="flex-col w-3/5 m-auto justify-center h-full">
        <div className="bg-neutral-900 m-auto w-fit flec-col p-10 mt-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
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
          <textarea
            className="p-2 my-2 text-trueGray-50 overflow-y-scroll focus:outline-trueGray-50 outline-1 rounded-md 2xl:w-[780px] 2xl:h-[500px]
              bg-zinc-800 resize-none" // Added resize-none to prevent resizing
            id="image"
            value={newsItem.description}
            onChange={(e) =>
              setNewsItem({ ...newsItem, description: e.target.value })
            }
            placeholder="Enter description..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
}
