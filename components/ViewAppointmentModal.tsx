import React from 'react';
import { Appointment } from '../types';

interface ViewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
}

const ViewAppointmentModal: React.FC<ViewAppointmentModalProps> = ({ isOpen, onClose, appointments }) => {
  if (!isOpen) {
    return null;
  }
  
  const sortedAppointments = [...appointments].sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Danh sách lịch hẹn</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
            {sortedAppointments.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày hẹn</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chủ nuôi</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thú cưng</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loài</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedAppointments.map(app => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(app.appointmentDate).toLocaleDateString('vi-VN')}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.ownerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.petName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.petType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.serviceName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500 py-8">Chưa có lịch hẹn nào được đặt.</p>
            )}
        </div>
        <div className="mt-6 text-right">
             <button
                onClick={onClose}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full"
            >
                Đóng
            </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentModal;
