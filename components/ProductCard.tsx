import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    formatPrice: (price: number) => string;
    onPurchase: (productId: number) => void;
    onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, formatPrice, onPurchase, onViewDetails }) => {
    
    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngăn việc mở modal khi click nút mua hàng
        onPurchase(product.id);
    };

    return (
        <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer"
            onClick={() => onViewDetails(product)}
        >
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">
                    {product.description.substring(0, 70)}...
                </p>
                <div className="flex justify-between items-center my-2">
                     <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{formatPrice(product.price)}</p>
                     <p className={`text-sm font-semibold ${product.stock > 10 ? 'text-gray-600 dark:text-gray-300' : 'text-red-500'}`}>Tồn kho: {product.stock}</p>
                </div>
                <button
                    onClick={handlePurchaseClick}
                    className={`w-full mt-auto text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ${
                        product.stock > 0
                            ? 'bg-teal-500 hover:bg-teal-600'
                            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={product.stock <= 0}
                >
                    {product.stock > 0 ? 'Mua ngay' : 'Hết hàng'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;