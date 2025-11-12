import React from 'react';
import { Product } from '../types';
import { FaShoppingCart } from 'react-icons/fa';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  formatPrice: (price: number) => string;
  onPurchase: (productId: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product, formatPrice, onPurchase }) => {
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 w-full">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 md:h-full object-cover" />
        </div>
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
            <div className="overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{product.name}</h2>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-3xl font-light leading-none">&times;</button>
                </div>
                <p className="text-md text-gray-500 dark:text-gray-400 mb-4">{product.category}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {product.description}
                </p>
            </div>
            <div className="mt-6 border-t dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{formatPrice(product.price)}</p>
                    <p className={`text-md font-semibold ${product.stock > 10 ? 'text-gray-600 dark:text-gray-300' : 'text-red-500'}`}>Tồn kho: {product.stock}</p>
                </div>
                <button
                    onClick={() => onPurchase(product.id)}
                    className={`w-full text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 flex items-center justify-center gap-2 ${
                        product.stock > 0
                            ? 'bg-teal-500 hover:bg-teal-600'
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={product.stock <= 0}
                >
                    <FaShoppingCart />
                    {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;