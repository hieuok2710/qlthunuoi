import React from 'react';
import { Appointment } from '../types';

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

const AppointmentDetailModal: React.FC<AppointmentDetailModalProps> = ({ isOpen, onClose, appointment }) => {
  if (!isOpen || !appointment) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Đặt lịch thành công!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">Cảm ơn bạn, <span className="font-semibold">{appointment.ownerName}</span>!</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Lịch hẹn của bạn cho <span className="font-semibold">{appointment.petName}</span> ({appointment.petType}) vào ngày <span className="font-semibold">{new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}</span> đã được xác nhận.</p>
        
        <div className="bg-teal-50 dark:bg-gray-700 border-l-4 border-teal-500 dark:border-teal-400 text-teal-800 dark:text-teal-200 p-4 rounded-md text-left mb-6">
            <h4 className="font-bold mb-2">Mẹo chăm sóc thú cưng:</h4>
            <p className="italic">Hãy nhớ dành cho thú cưng của bạn nhiều tình yêu thương và một nơi nghỉ ngơi thoải mái sau chuyến thăm khám. Liên hệ với chúng tôi nếu bạn có bất kỳ lo ngại nào!</p>
        </div>

        <button
          onClick={onClose}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;