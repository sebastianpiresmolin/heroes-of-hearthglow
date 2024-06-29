import { getLatestFiveNews } from '../lib/data';
import { Divider } from '@nextui-org/react';

export default async function LatestFiveNews() {
  const newsData = await getLatestFiveNews();
  const news = newsData.map((news) => news.toJSON());

  return (
    <div className="bg-neutral-900 flec-col p-10 mt-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
      <h1 className="text-trueGray-50 text-4xl font-bold">Latest News</h1>
      <p className="text-zinc-400">The latest five news updates</p>
      <div className="flex justify-between mt-10 mr-2 ml-2">
        <p className="text-zinc-400">ID</p>
        <p className="text-zinc-400 basis-3/4">Title</p>
        <p className="text-zinc-400">Date</p>
      </div>
      {news.map((news) => (
        <div key={news.id} className="flex-col justify-between mt-8 ">
          <div className="flex justify-between">
            <p className="text-trueGray-50  ">
              <span className="text-zinc-400"># </span>
              {news.id}
            </p>
            <p className="text-trueGray-50 basis-3/4 text-2xl">{news.title}</p>
            <p className="text-trueGray-50">{news.time}</p>
          </div>
          <Divider className="bg-zinc-600 mt-8" />
        </div>
      ))}
    </div>
  );
}
