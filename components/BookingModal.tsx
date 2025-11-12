import React, { useState, useEffect } from 'react';
import { Service, User } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  currentUser: User | null;
  onBook: (bookingDetails: {
    ownerName: string;
    petName: string;
    petType: 'Chó' | 'Mèo' | 'Khác';
    appointmentDate: string;
    serviceId: number;
    serviceName: string;
    userId: number;
  }) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service, currentUser, onBook }) => {
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'Chó' | 'Mèo' | 'Khác'>('Chó');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    // Pre-fill owner name if a user is logged in, and reset form when modal opens/closes
    if (isOpen) {
        if (currentUser) {
            setOwnerName(currentUser.username);
        }
    } else {
      setOwnerName('');
      setPetName('');
      setPetType('Chó');
      setAppointmentDate('');
    }
  }, [isOpen, currentUser]);

  if (!isOpen || !service) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !petName || !appointmentDate) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    onBook({
      ownerName,
      petName,
      petType,
      appointmentDate,
      serviceId: service.id,
      serviceName: service.name,
      userId: currentUser ? currentUser.id : 0, // Use 0 for guest users
    });
  };

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Đặt lịch dịch vụ</h2>
        <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-6">{service.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Tên của bạn"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              required
              disabled={!!currentUser}
            />
            <input
              type="text"
              placeholder="Tên thú cưng"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value as 'Chó' | 'Mèo' | 'Khác')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Chó">Chó</option>
              <option value="Mèo">Mèo</option>
              <option value="Khác">Khác</option>
            </select>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={getTodayString()}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-4">
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
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
