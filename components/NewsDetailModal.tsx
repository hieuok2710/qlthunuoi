
import React, { useState, useEffect } from 'react';
import { News } from '../types';

interface NewsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: News | null;
}

const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ isOpen, onClose, article }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Use a short timeout to allow the component to mount with initial styles
      // before transitioning to the visible styles, triggering the animation.
      const timer = setTimeout(() => {
        setShow(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen || !article) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-out ${show ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col transition-all duration-300 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="p-4 sm:p-6 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{article.title}</h2>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-3xl font-light">&times;</button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto">
            <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover rounded-md mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Đăng ngày: {new Date(article.date).toLocaleDateString('vi-VN')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {article.content}
            </p>
        </div>
        <div className="p-4 sm:p-6 border-t dark:border-gray-700 text-right">
             <button
                onClick={onClose}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
                >
                Đóng
            </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal;
