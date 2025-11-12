import React, { useState, useMemo } from 'react';
import { Sale } from '../types';
import SalesCharts from './SalesCharts';

interface SalesDashboardProps {
  sales: Sale[];
  formatPrice: (price: number) => string;
}

type FilterType = 'day' | 'week' | 'month';

const SalesDashboard: React.FC<SalesDashboardProps> = ({ sales, formatPrice }) => {
  const [filter, setFilter] = useState<FilterType>('day');

  const filteredSales = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return sales.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      switch (filter) {
        case 'day':
          return saleDate >= today;
        case 'week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Adjust for week start on Monday
          return saleDate >= startOfWeek;
        case 'month':
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          return saleDate >= startOfMonth;
        default:
          return true;
      }
    });
  }, [sales, filter]);
  
  const totalRevenue = useMemo(() => filteredSales.reduce((sum, sale) => sum + sale.totalPrice, 0), [filteredSales]);
  const totalItemsSold = useMemo(() => filteredSales.reduce((sum, sale) => sum + sale.quantity, 0), [filteredSales]);
  
  const FilterButton: React.FC<{ value: FilterType; label: string }> = ({ value, label }) => (
      <button
          onClick={() => setFilter(value)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === value
                  ? 'bg-teal-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
      >
          {label}
      </button>
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Thống kê doanh thu</h3>
      <div className="flex justify-center gap-2 mb-6">
        <FilterButton value="day" label="Hôm nay" />
        <FilterButton value="week" label="Tuần này" />
        <FilterButton value="month" label="Tháng này" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Sản phẩm đã bán</p>
          <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{totalItemsSold}</p>
        </div>
      </div>

      <SalesCharts sales={filteredSales} filter={filter} formatPrice={formatPrice} />
    </div>
  );
};

export default SalesDashboard;