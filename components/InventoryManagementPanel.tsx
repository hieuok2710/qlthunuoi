import React, { useState } from 'react';
import { InventoryLog } from '../types';
import Pagination from './Pagination';

interface InventoryManagementPanelProps {
  inventoryLogs: InventoryLog[];
}

const LOGS_PER_PAGE = 10;

const InventoryManagementPanel: React.FC<InventoryManagementPanelProps> = ({ inventoryLogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(inventoryLogs.length / LOGS_PER_PAGE);
  const indexOfLastLog = currentPage * LOGS_PER_PAGE;
  const indexOfFirstLog = indexOfLastLog - LOGS_PER_PAGE;
  const currentLogs = inventoryLogs.slice(indexOfFirstLog, indexOfLastLog);

  const getTypeBadgeClass = (type: InventoryLog['type']) => {
    switch (type) {
      case 'Nhập kho': return 'bg-green-100 text-green-800';
      case 'Xuất kho': return 'bg-yellow-100 text-yellow-800';
      case 'Bán hàng': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Lịch sử xuất/nhập kho</h3>
      
      <div className="overflow-x-auto min-h-[520px]">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ngày</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sản phẩm</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Loại</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Số lượng</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tồn kho sau GD</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {currentLogs.length > 0 ? currentLogs.map(log => (
              <tr key={log.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(log.date).toLocaleString('vi-VN')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{log.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(log.type)}`}>
                        {log.type}
                    </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-center ${log.type === 'Nhập kho' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {log.type === 'Nhập kho' ? '+' : '-'}{log.quantityChange}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white text-center">{log.stockAfter}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  Chưa có giao dịch kho nào được ghi nhận.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {inventoryLogs.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                Hiển thị {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, inventoryLogs.length)} trên tổng số {inventoryLogs.length} bản ghi
            </p>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
      )}
    </div>
  );
};

export default InventoryManagementPanel;