import React from 'react';
import { Appointment, User } from '../types';

interface AppointmentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  currentUser: User | null;
  onUpdateStatus: (appointmentId: number, status: Appointment['status']) => void;
}

const AppointmentViewModal: React.FC<AppointmentViewModalProps> = ({ isOpen, onClose, appointment, currentUser, onUpdateStatus }) => {
  if (!isOpen || !appointment) {
    return null;
  }

  const canManage = currentUser?.role === 'admin' || currentUser?.role === 'quanly';
  const isConfirmed = appointment.status === 'Đã xác nhận';
  const canUserCancel = !canManage && isConfirmed;
  const canAdminManage = canManage && isConfirmed;
  
  const getStatusBadgeClass = (status: Appointment['status']) => {
    switch (status) {
        case 'Hoàn thành': return 'bg-green-100 text-green-800';
        case 'Đã hủy': return 'bg-red-100 text-red-800';
        case 'Đã xác nhận':
        default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Chi tiết cuộc hẹn</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p><strong>Chủ nuôi:</strong> {appointment.ownerName}</p>
            <p><strong>Thú cưng:</strong> {appointment.petName} ({appointment.petType})</p>
            <p><strong>Dịch vụ:</strong> {appointment.serviceName}</p>
            <p><strong>Ngày hẹn:</strong> {new Date(appointment.appointmentDate).toLocaleDateString('vi-VN')}</p>
            <p><strong>Trạng thái:</strong> 
                <span className={`ml-2 px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                    {appointment.status}
                </span>
            </p>
        </div>

        <div className="mt-6 border-t dark:border-gray-700 pt-4 flex justify-end gap-3">
          {canUserCancel && (
            <button
                onClick={() => onUpdateStatus(appointment.id, 'Đã hủy')}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Hủy lịch hẹn
            </button>
          )}
          {canAdminManage && (
            <>
              <button
                onClick={() => onUpdateStatus(appointment.id, 'Đã hủy')}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Hủy lịch
              </button>
              <button
                onClick={() => onUpdateStatus(appointment.id, 'Hoàn thành')}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Đánh dấu Hoàn thành
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentViewModal;