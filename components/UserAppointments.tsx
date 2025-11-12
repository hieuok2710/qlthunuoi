import React from 'react';
import { Appointment } from '../types';

interface UserAppointmentsProps {
  appointments: Appointment[];
  onViewAppointment: (appointment: Appointment) => void;
}

const UserAppointments: React.FC<UserAppointmentsProps> = ({ appointments, onViewAppointment }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments
    .filter(app => new Date(app.appointmentDate) >= today && app.status === 'Đã xác nhận')
    .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());

  const pastAppointments = appointments
    .filter(app => new Date(app.appointmentDate) < today || app.status !== 'Đã xác nhận')
    .sort((a, b) => new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime());

  const getStatusBadgeClass = (status: Appointment['status']) => {
    switch (status) {
        case 'Hoàn thành': return 'bg-green-100 text-green-800';
        case 'Đã hủy': return 'bg-red-100 text-red-800';
        case 'Đã xác nhận':
        default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Fix: Changed AppointmentRow to be a render function to correctly handle keys in a list.
  const AppointmentRow = (app: Appointment) => (
    <li key={app.id} onClick={() => onViewAppointment(app)} className="py-3 px-2 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded">
      <div>
        <p className="font-semibold dark:text-gray-200">{app.serviceName} - {app.petName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(app.appointmentDate).toLocaleDateString('vi-VN')}</p>
      </div>
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(app.status)}`}>
        {app.status}
      </span>
    </li>
  );

  return (
    <section id="user-appointments" className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Lịch hẹn của bạn</h2>
      {appointments.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
          <p>Bạn chưa có lịch hẹn nào. Hãy khám phá các dịch vụ của chúng tôi và đặt lịch hẹn đầu tiên!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Lịch hẹn sắp tới</h3>
            {upcomingAppointments.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Fix: Changed usage to pass AppointmentRow as a render function to map. */}
                {upcomingAppointments.map(AppointmentRow)}
              </ul>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">Bạn không có lịch hẹn nào sắp tới.</p>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Lịch hẹn đã qua</h3>
            {pastAppointments.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                {/* Fix: Changed usage to pass AppointmentRow as a render function to map. */}
                {pastAppointments.map(AppointmentRow)}
              </ul>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">Bạn không có lịch hẹn nào trong quá khứ.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserAppointments;
