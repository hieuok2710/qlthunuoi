import React from 'react';
import { News } from '../types';

interface NewsCardProps {
  article: News;
  onView: (article: News) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onView }) => {
  return (
    <div 
        onClick={() => onView(article)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if(e.key === 'Enter' || e.key === ' ') onView(article)}}
        aria-label={`Xem bài viết: ${article.title}`}
    >
      <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{article.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{new Date(article.date).toLocaleDateString('vi-VN')}</p>
        <p className="text-gray-600 dark:text-gray-300 flex-grow">
            {article.content.substring(0, 100)}{article.content.length > 100 ? '...' : ''}
        </p>
         <span className="text-teal-600 dark:text-teal-400 font-semibold mt-4 self-start">Đọc thêm &rarr;</span>
      </div>
    </div>
  );
};

export default NewsCard;
