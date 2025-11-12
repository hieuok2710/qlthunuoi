
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetPassword: (userId: number, newPasswordHash: string) => void;
  user: User | null;
}

const UserEditModal: React.FC<UserEditModalProps> = ({ isOpen, onClose, onSetPassword, user }) => {
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setNewPassword('');
    }
  }, [isOpen]);

  if (!isOpen || !user) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
        alert("Vui lòng nhập mật khẩu mới.");
        return;
    }
    onSetPassword(user.id, newPassword); // In a real app, hash this password
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full m-4">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Đặt lại mật khẩu</h2>
        <p className="text-center mb-4 dark:text-gray-300">Bạn đang đặt lại mật khẩu cho người dùng: <span className="font-bold">{user.username}</span></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập mật khẩu mới"
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
              Đặt mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
