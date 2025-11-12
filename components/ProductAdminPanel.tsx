
import React, { useState } from 'react';
import { Product } from '../types';
import { FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';
import Pagination from './Pagination';

interface ProductAdminPanelProps {
  products: Product[];
  onCreateProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onManageStock: (product: Product) => void;
}

const PRODUCTS_PER_PAGE = 5;

const ProductAdminPanel: React.FC<ProductAdminPanelProps> = ({ products, onCreateProduct, onEditProduct, onDeleteProduct, onManageStock }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'Đồ chơi' | 'Trang sức' | 'Dụng cụ chăm sóc'>('Đồ chơi');
  const [stock, setStock] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setCategory('Đồ chơi');
    setStock('');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = parseInt(price, 10);
    const stockNumber = parseInt(stock, 10);

    if (!name || !description || !imageUrl || isNaN(priceNumber) || isNaN(stockNumber) || priceNumber < 0 || stockNumber < 0) {
      alert("Vui lòng điền đầy đủ và chính xác thông tin sản phẩm.");
      return;
    }

    onCreateProduct({
      name,
      description,
      price: priceNumber,
      imageUrl,
      category,
      stock: stockNumber,
    });
    resetForm();
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quản lý sản phẩm</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Thêm sản phẩm mới</h4>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tên sản phẩm" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Giá (VND)" min="0" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            <select value={category} onChange={e => setCategory(e.target.value as any)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required>
              <option value="Đồ chơi">Đồ chơi</option>
              <option value="Trang sức">Trang sức</option>
              <option value="Dụng cụ chăm sóc">Dụng cụ chăm sóc</option>
            </select>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Số lượng tồn kho" min="0" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL hình ảnh" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả sản phẩm" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 h-24" required />
            <button type="submit" className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">Thêm sản phẩm</button>
          </form>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Danh sách sản phẩm</h4>
          <div className="min-h-[350px]">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentProducts.length > 0 ? currentProducts.map(product => (
                <li key={product.id} className="py-2 flex justify-between items-center dark:text-gray-300">
                  <div>
                    <span className="font-semibold">{product.name}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tồn kho: {product.stock}</p>
                  </div>
                  <div className="flex items-center gap-2">
                      <button onClick={() => onManageStock(product)} className="text-green-500 hover:text-green-700 p-2 rounded-full" aria-label={`Quản lý kho ${product.name}`}><FaBoxOpen /></button>
                      <button onClick={() => onEditProduct(product)} className="text-blue-500 hover:text-blue-700 p-2 rounded-full" aria-label={`Chỉnh sửa ${product.name}`}><FaEdit /></button>
                      <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full" aria-label={`Xóa ${product.name}`}><FaTrash /></button>
                  </div>
                </li>
              )) : (
                <li className="py-4 text-center text-gray-500 dark:text-gray-400">Không có sản phẩm nào.</li>
              )}
            </ul>
          </div>
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdminPanel;