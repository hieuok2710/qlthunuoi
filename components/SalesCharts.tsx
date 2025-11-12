import React, { useMemo } from 'react';
import { Sale } from '../types';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface SalesChartsProps {
  sales: Sale[];
  filter: 'day' | 'week' | 'month';
  formatPrice: (price: number) => string;
}

const SalesCharts: React.FC<SalesChartsProps> = ({ sales, filter, formatPrice }) => {
  const revenueData = useMemo(() => {
    if (sales.length === 0) return [];

    const now = new Date();
    
    if (filter === 'day') {
      const hours = Array.from({ length: 24 }, (_, i) => ({ hour: i, revenue: 0 }));
      sales.forEach(sale => {
        const saleHour = new Date(sale.saleDate).getHours();
        hours[saleHour].revenue += sale.totalPrice;
      });
      return hours.map(h => ({ name: `${h.hour}:00`, 'Doanh thu': h.revenue }));
    }

    if (filter === 'week') {
      const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
      const weekData = days.map(day => ({ name: day, 'Doanh thu': 0 }));
      sales.forEach(sale => {
        const saleDay = new Date(sale.saleDate).getDay();
        weekData[saleDay]['Doanh thu'] += sale.totalPrice;
      });
      return weekData;
    }

    if (filter === 'month') {
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const monthData = Array.from({ length: daysInMonth }, (_, i) => ({
            name: `Ngày ${i + 1}`,
            'Doanh thu': 0
        }));
        sales.forEach(sale => {
            const saleDate = new Date(sale.saleDate).getDate();
            monthData[saleDate - 1]['Doanh thu'] += sale.totalPrice;
        });
        return monthData;
    }

    return [];
  }, [sales, filter]);

  const bestSellersData = useMemo(() => {
    // Fix: Rewrote the reduce function to a for...of loop to ensure correct type
    // inference for the 'productSales' object, resolving errors in subsequent method calls.
    const productSales: Record<string, { quantity: number; revenue: number }> = {};
    for (const sale of sales) {
      if (!productSales[sale.productName]) {
        productSales[sale.productName] = { quantity: 0, revenue: 0 };
      }
      productSales[sale.productName].quantity += sale.quantity;
      productSales[sale.productName].revenue += sale.totalPrice;
    }
    
    return Object.entries(productSales)
      .sort(([, a], [, b]) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(([name, data]) => ({ name, 'Số lượng bán': data.quantity }));
  }, [sales]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          return (
              <div className="bg-white dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                  <p className="label font-bold text-gray-800 dark:text-gray-200">{`${label}`}</p>
                  <p className="intro text-teal-600 dark:text-teal-400">{`${payload[0].name} : ${payload[0].dataKey.includes('Doanh thu') ? formatPrice(payload[0].value) : payload[0].value}`}</p>
              </div>
          );
      }
      return null;
  };

  const hasData = revenueData.length > 0 || bestSellersData.length > 0;

  return (
    <div className="mt-8">
        {hasData ? (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Xu hướng doanh thu</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                        <XAxis dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <YAxis tickFormatter={(value) => new Intl.NumberFormat('vi-VN', { notation: 'compact', compactDisplay: 'short' }).format(value as number)} tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="Doanh thu" stroke="#14b8a6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Sản phẩm bán chạy nhất</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bestSellersData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                        <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" tick={{ fill: 'currentColor', fontSize: 12 }} width={120} interval={0} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="Số lượng bán" fill="#14b8a6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ) : (
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400 py-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p>Không có dữ liệu bán hàng cho khoảng thời gian đã chọn.</p>
            </div>
        )}
    </div>
  );
};

export default SalesCharts;