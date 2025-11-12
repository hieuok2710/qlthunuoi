import React, { useState } from 'react';
import { News } from '../types';

interface NewsAdminPanelProps {
  news: News[];
  onCreateNews: (news: Omit<News, 'id' | 'date'>) => void;
}

const NewsAdminPanel: React.FC<NewsAdminPanelProps> = ({ news, onCreateNews }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !imageUrl) {
      alert('Vui lòng điền đầy đủ thông tin tin tức.');
      return;
    }
    onCreateNews({ title, content, imageUrl });
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quản lý Tin tức</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Thêm bài viết mới</h4>
          <form onSubmit={handleCreateNews}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Tiêu đề</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Nội dung</label>
              <textarea value={content} onChange={e => setContent(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 h-24" required />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">URL hình ảnh</label>
               <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            </div>
            <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">Đăng bài</button>
          </form>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Bài viết đã đăng</h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
            {news.map(article => (
              <li key={article.id} className="py-2 truncate dark:text-gray-300">
                {article.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsAdminPanel;
