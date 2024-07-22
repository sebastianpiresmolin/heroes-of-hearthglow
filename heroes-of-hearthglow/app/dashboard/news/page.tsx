'use client';
import { useEffect, useState } from 'react';
import { fetchNews } from '@/app/lib/fetchNews';
import Link from 'next/link';
import {
  PencilIcon,
  TrashIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import {
  Modal,
  Button,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

export default function DashboardNews() {
  interface NewsItem {
    id: number;
    title: string;
    time: string;
    description: string;
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeNews, setActiveNews] = useState<NewsItem>(news[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews(currentPage, setNews, setActiveNews, setTotalPages, itemsPerPage);
  }, [currentPage]);

  useEffect(() => {
    if (news.length > 0) {
      setActiveNews(news[0]);
    }
  }, [news]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async () => {
    if (!activeNews?.id) {
      console.error('No news item selected for deletion');
      return;
    }

    try {
      const response = await fetch(`/api/news/deleteNews/${activeNews.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the news item');
      }

      await fetchNews(
        currentPage,
        setNews,
        setActiveNews,
        setTotalPages,
        itemsPerPage
      );
    } catch (error) {
      console.error('Error deleting news item:', error);
    } finally {
      hideModal();
    }
  };

  return (
    <div className="flex">
      <div className="flex absolute top-3">
        <p className=" text-zinc-500 ml-2">News</p>
      </div>
      <div className="flex-col w-3/5 h-full">
        <div>
          <div className="bg-neutral-900 flec-col p-10 mt-10 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-trueGray-50 text-4xl font-bold">News</h1>

              <div className="flex">
                {currentPage > 1 && ( // Show previous button only if current page is greater than 1
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="text-trueGray-50 flex items-center text-2xl"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    <p className="text-md ml-2 mr-8 font-semibold text-trueGray-50">
                      Previous
                    </p>
                  </button>
                )}

                {currentPage < totalPages && ( // Show next button only if current page is less than total pages
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="text-trueGray-50 text-2xl flex items-center"
                  >
                    <p className="text-md mr-2 font-semibold text-trueGray-50">
                      Next
                    </p>
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <Link
              href="/dashboard/news/create"
              className="text-trueGray-50 mt-4 w-fit bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700 flex items-center"
            >
              Create News Post +
            </Link>
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
                  <p className="text-trueGray-50 w-[50px] ">
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
      <div className="flex-col mt-10 bg-neutral-900 flec-col p-10 ml-10 w-2/5 shadow-sm shadow-black outline outline-1 outline-zinc-700 rounded-lg">
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
            href={`/dashboard/news/edit/${activeNews ? activeNews.id : ''}`}
            className="text-trueGray-50 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-zinc-700 outline outline-1 outline-zinc-700 flex items-center"
          >
            <PencilIcon className="w-5 h-5 mr-2 " />
            <span className="text-md font-semibold">Edit</span>
          </Link>
          <button
            onClick={showModal}
            className="text-red-500 w-fit bg-zinc-800 p-4 mt-4 rounded-lg hover:bg-red-900 outline outline-1 outline-zinc-700 flex items-center"
          >
            <TrashIcon className="w-5 h-5 mr-2 " />
            <p className="text-md font-semibold">Delete</p>
          </button>
        </div>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          onClose={hideModal}
          isOpen={isModalVisible}
          className="bg-neutral-900 text-trueGray-50 p-10"
        >
          <ModalHeader>
            <p id="modal-title" className="text-lg text-trueGray-50">
              Confirm Deletion
            </p>
          </ModalHeader>
          <ModalContent>
            <ModalBody>
              Are you sure you want to delete this news item?
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={handleDelete}>
                DELETE
              </Button>
              <Button onClick={hideModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
