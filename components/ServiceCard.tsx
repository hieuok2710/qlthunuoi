import React, { useState } from 'react';
import { Service } from '../types';

interface ServiceCardProps {
    service: Service;
    isAdmin: boolean;
    onBook: (service: Service) => void;
    onUpdatePrice: (serviceId: number, newPrice: number) => void;
    formatPrice: (price: number) => string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isAdmin, onBook, onUpdatePrice, formatPrice }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPrice, setEditedPrice] = useState(service.price.toString());

    const handleSave = () => {
        const newPrice = parseInt(editedPrice, 10);
        if (!isNaN(newPrice)) {
            onUpdatePrice(service.id, newPrice);
            setIsEditing(false);
        } else {
            alert("Vui lòng nhập một số hợp lệ.");
        }
    };
    
    const handleCancel = () => {
        setEditedPrice(service.price.toString());
        setIsEditing(false);
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 text-teal-600 mx-auto mb-4">
                    <service.icon className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-semibold text-center mb-2 dark:text-white">{service.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4 min-h-[72px]">{service.description}</p>
            </div>
            <div className="mt-auto text-center">
                {isEditing ? (
                    <div className="mb-4">
                        <input 
                            type="number"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
                        />
                    </div>
                ) : (
                    <p className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-4 h-7">{formatPrice(service.price)}</p>
                )}

                {isAdmin && (
                    <div className="mb-4">
                        {isEditing ? (
                            <div className="flex justify-center gap-2">
                                <button onClick={handleSave} className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 text-sm">Lưu</button>
                                <button onClick={handleCancel} className="bg-gray-500 text-white font-bold py-1 px-3 rounded hover:bg-gray-600 text-sm">Hủy</button>
                            </div>
                        ) : (
                             <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 text-sm">Chỉnh sửa giá</button>
                        )}
                    </div>
                )}

                <button 
                    onClick={() => onBook(service)} 
                    className="bg-teal-500 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-600 transition-colors duration-300"
                    disabled={isEditing}
                >
                    Đặt lịch ngay
                </button>
            </div>
        </div>
    );
};

export default ServiceCard;
