'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

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
        console.error("Error fetching news:", error);
        return [];
    }
}

export default function LatestNews() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [newsCard, setNewsCard] = useState<number>(0);
    const [direction, setDirection] = useState<number>(0);

    useEffect(() => {
        const getNews = async () => {
            const fetchedNews = await fetchNews();
            setNews(fetchedNews);
            setIsLoading(false);
        };

        getNews();
    }, []);

    if (isLoading) {
        return (
            <section className="flex justify-center items-center min-h-screen">
                <p className="text-white text-2xl font-bold">Loading...</p>
            </section>
        );
    }

    if (news.length === 0) {
        return (
            <section className="flex justify-center items-center min-h-screen">
                <p className="text-white text-2xl font-bold">No news available</p>
            </section>
        );
    }

    // Framer Motion-varianter
    const variants = {
        enter: (direction: number) => ({
            x: direction === 1 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction === 1 ? -300 : 300,
            opacity: 0,
        }),
    };

    return (
        <section className="flex justify-center bg-black overflow-hidden">
            <div className="max-w-[1050px] flex-col h-fit justify-center w-[90vw] relative overflow-hidden">
                <h1
                    className="text-center lg:mb-5 p-5 text-4xl lg:text-6xl lg:mb-10 font-bold text-cyan-50"
                    id="news"
                >
                    NEWS
                </h1>
                <div className="h-[630px] max-h-[630px] min-h-[630px] md:max-h-[800px] md:h-[800px] md:min-h-[800px] overflow-y-scroll">
                    <div className="relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={`news-${newsCard}`}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={variants}
                                transition={{duration: 0.2}}
                                className="relative"
                            >
                                <img
                                    src={news[newsCard].image}
                                    alt={news[newsCard].title}
                                    className="w-full h-auto rounded-t-lg border-amber-400 border-2 border-b-0 max-h-[400px] object-cover object-center [ object-position: center]"
                                />
                                <p
                                    className="absolute bottom-0 left-1 p-2 z-10 text-slate-300"
                                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'}}
                                >
                                    <span className="absolute inset-0 bg-black opacity-30 rounded-t-lg"></span>
                                    <span className="relative">{news[newsCard].time}</span>
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.h2
                                key={`title-${newsCard}`}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={variants}
                                transition={{duration: 0.2}}
                                className="text-center pl-2 pr-2 bg-gray-950 pt-2 pb-2 font-bold text-slate-300 lg:text-4xl md:text-3xl text-2xl border-amber-400  border-2 border-b-0 border-t-0"
                            >
                                {news[newsCard].title}
                            </motion.h2>
                        </AnimatePresence>
                    </div>

                    <div className="relative overflow-hidden ">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.p
                                key={`desc-${newsCard}`}
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={variants}
                                transition={{duration: 0.2}}
                                className="whitespace-pre-wrap text-justify lg:text-lg leading-8 bg-gray-950 text-slate-300 pr-5 pl-5 pb-5  h-[400px] border-amber-400 border-l-2 border-r-2 overflow-y-scroll"
                            >
                                {news[newsCard].description}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex justify-center p-5 gap-8 border-amber-400 rounded-b-lg border-2">
                    <button
                        onClick={() => {
                            if (newsCard > 0) {
                                setDirection(-1); // -1 = left
                                setNewsCard((prev) => prev - 1);
                            }
                        }}
                        className={`text-xl md:text-2xl lg:text-4xl font-bold text-slate-300 bg-stone-900 border-2 border-amber-400 p-4 md:p-6 rounded-2xl transition-transform ${
                            newsCard <= 0
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:scale-95'
                        }`}
                    >
                        <ArrowLeftIcon className="w-6 h-6"/>
                    </button>
                    <button
                        onClick={() => {
                            if (newsCard < news.length - 1) {
                                setDirection(1); // 1 = right
                                setNewsCard((prev) => prev + 1);
                            }
                        }}
                        className={`text-xl md:text-2xl lg:text-4xl font-bold text-slate-300 bg-stone-900 border-2 border-amber-400 p-4 md:p-6 rounded-2xl transition-transform ${
                            newsCard >= news.length - 1
                                ? 'opacity-30 cursor-not-allowed'
                                : 'hover:scale-95'
                        }`}
                    >
                        <ArrowRightIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </section>
    );
}