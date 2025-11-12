

import React, { useState } from 'react';
import { User } from '../types';
import { FaEdit } from 'react-icons/fa';

interface UserAdminPanelProps {
  users: User[];
  onCreateUser: (user: Omit<User, 'id'>) => void;
  onEditUser: (user: User) => void;
}

const UserAdminPanel: React.FC<UserAdminPanelProps> = ({ users, onCreateUser, onEditUser }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<User['role']>('user');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      alert('Vui lòng nhập tên người dùng và mật khẩu.');
      return;
    }
    onCreateUser({
      username: newUsername,
      passwordHash: newPassword, // In real app, hash this before sending
      role: newUserRole
    });
    setNewUsername('');
    setNewPassword('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quản lý người dùng</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Tạo người dùng mới</h4>
          <form onSubmit={handleCreateUser}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Tên đăng nhập</label>
              <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Mật khẩu</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Vai trò</label>
               <select value={newUserRole} onChange={e => setNewUserRole(e.target.value as User['role'])} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600">
                   <option value="user">Người dùng</option>
                   <option value="quanly">Quản lý</option>
                   <option value="admin">Admin</option>
               </select>
            </div>
            <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600">Tạo người dùng</button>
          </form>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4 dark:text-gray-200">Danh sách người dùng</h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
            {users.map(user => (
              <li key={user.id} className="py-2 flex justify-between items-center dark:text-gray-300">
                <div className="flex-grow">
                    <span>{user.username}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pass: {user.passwordHash}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : user.role === 'quanly' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{user.role}</span>
                    <button
                        onClick={() => onEditUser(user)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full"
                        aria-label={`Chỉnh sửa người dùng ${user.username}`}
                    >
                        <FaEdit />
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserAdminPanel;