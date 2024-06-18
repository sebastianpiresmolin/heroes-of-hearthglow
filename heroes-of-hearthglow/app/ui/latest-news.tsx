import { getLatestNews } from '../lib/data';

export default async function LatestNews() {
  const newsData = await getLatestNews();
  const news = newsData.map((news) => news.toJSON());

  return (
    <section className="flex justify-center bg-gray-400 ">
      <div className="max-w-[1050px] flex-col h-fit justify-center w-[90vw] relative">
        <h1
          className="text-center lg:mb-5 p-5 text-4xl font-bold text-black"
          id="news"
        >
          NEWS
        </h1>
        <div className="relative">
          {' '}
          {/* Container with relative positioning */}
          <img
            src={news[0].image}
            alt={news[0].title}
            className=" w-full h-auto rounded-t-lg shadow-[inset_0px_0px_10px_10px_#black]"
          />
          {/* Absolute positioning for the p element */}
          <p className="absolute bottom-0 left-0 p-2 z-10 text-white ">
            {news[0].time}
          </p>
        </div>
        <h2 className="bg-black bg-opacity-10 pt-5 pb-5 font-bold text-xl text-center">
          {news[0].title}
        </h2>
        <p className="text-justify whitespace-pre-wrap bg-black bg-opacity-10 pr-5 pl-5 rounded-b-lg">
          {news[0].description}
        </p>
        <div className="flex justify-center p-5">
          <a
            href="#"
            className="mb-10 text-xl md:text-2xl lg:text-4xl font-bold text-gray-500 bg-blue-200 p-4 md:p-6 rounded-2xl hover:scale-95"
          >
            SHOW MORE
          </a>
        </div>
      </div>
    </section>
  );
}
