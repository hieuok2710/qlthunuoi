
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ isOpen, onClose, onSave, product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'Đồ chơi' | 'Trang sức' | 'Dụng cụ chăm sóc'>('Đồ chơi');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImageUrl(product.imageUrl);
      setCategory(product.category);
    }
  }, [product]);

  if (!isOpen || !product) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = parseInt(price, 10);
    if (!name || !description || !imageUrl || isNaN(priceNumber)) {
        alert("Vui lòng điền đầy đủ và chính xác thông tin.");
        return;
    }
    onSave({
      ...product,
      name,
      description,
      price: priceNumber,
      imageUrl,
      category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Tên sản phẩm</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
          </div>
           <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Giá (VND)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
          </div>
           <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Danh mục</label>
              <select value={category} onChange={e => setCategory(e.target.value as any)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required>
                  <option value="Đồ chơi">Đồ chơi</option>
                  <option value="Trang sức">Trang sức</option>
                  <option value="Dụng cụ chăm sóc">Dụng cụ chăm sóc</option>
              </select>
          </div>
           <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">URL hình ảnh</label>
              <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
          </div>
           <div>
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Mô tả</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 h-24" required />
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
