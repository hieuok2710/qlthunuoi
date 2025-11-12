import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdateStock: (productId: number, change: number) => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose, product, onUpdateStock }) => {
  const [action, setAction] = useState<'import' | 'export'>('import');
  const [quantity, setQuantity] = useState('');
  
  useEffect(() => {
    if (!isOpen) {
      setQuantity('');
      setAction('import');
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qtyNumber = parseInt(quantity, 10);
    if (isNaN(qtyNumber) || qtyNumber <= 0) {
      alert('Vui lòng nhập số lượng hợp lệ.');
      return;
    }
    if (action === 'export' && qtyNumber > product.stock) {
      alert('Số lượng xuất không thể lớn hơn tồn kho.');
      return;
    }
    
    const change = action === 'import' ? qtyNumber : -qtyNumber;
    onUpdateStock(product.id, change);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full m-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Quản lý tồn kho</h2>
        <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-6">{product.name}</h3>
        <p className="mb-4 dark:text-gray-300">Tồn kho hiện tại: <span className="font-bold">{product.stock}</span></p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Hành động</label>
            <div className="flex gap-4">
              <label className="flex items-center dark:text-gray-300">
                <input type="radio" name="action" value="import" checked={action === 'import'} onChange={() => setAction('import')} className="form-radio text-teal-500 focus:ring-teal-500" />
                <span className="ml-2">Nhập kho</span>
              </label>
              <label className="flex items-center dark:text-gray-300">
                <input type="radio" name="action" value="export" checked={action === 'export'} onChange={() => setAction('export')} className="form-radio text-teal-500 focus:ring-teal-500" />
                <span className="ml-2">Xuất kho</span>
              </label>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Số lượng</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Hủy</button>
            <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;
