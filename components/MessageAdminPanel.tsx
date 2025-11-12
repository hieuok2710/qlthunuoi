
import React, { useState } from 'react';
import { Message } from '../types';
import { FaEnvelope, FaEnvelopeOpen, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MessageAdminPanelProps {
  messages: Message[];
  onToggleRead: (messageId: number) => void;
}

const MessageAdminPanel: React.FC<MessageAdminPanelProps> = ({ messages, onToggleRead }) => {
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null);

  const handleToggleExpand = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    const isOpening = expandedMessageId !== messageId;
    
    // Automatically mark as read when expanding an unread message
    if (isOpening && message && !message.isRead) {
      onToggleRead(messageId);
    }
    
    setExpandedMessageId(isOpening ? messageId : null);
  };
  
  const sortedMessages = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Hộp thư tin nhắn</h3>
        {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount} tin nhắn mới
            </span>
        )}
      </div>
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedMessages.length > 0 ? sortedMessages.map(msg => {
            const isExpanded = expandedMessageId === msg.id;
            return (
              <li key={msg.id} className={`py-3 px-2 ${!msg.isRead ? 'bg-teal-50 dark:bg-gray-700/50' : ''}`}>
                <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggleExpand(msg.id)}>
                  <div className="flex items-center gap-3">
                     {!msg.isRead ? <FaEnvelope className="text-teal-500" /> : <FaEnvelopeOpen className="text-gray-500" />}
                     <div>
                        <p className={`font-semibold dark:text-gray-200 ${!msg.isRead ? 'font-bold' : ''}`}>
                            {msg.subject} - <span className="font-normal text-gray-600 dark:text-gray-400">{msg.name}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(msg.date).toLocaleString('vi-VN')}</p>
                     </div>
                  </div>
                  <button className="text-gray-500 dark:text-gray-400">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="mt-4 pl-8 pr-4 pb-2">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">{msg.message}</p>
                    <div className="border-t dark:border-gray-600 pt-2 flex justify-between items-center">
                       <p className="text-sm text-gray-500 dark:text-gray-400">Email: {msg.email}</p>
                       <button
                          onClick={() => onToggleRead(msg.id)}
                          className={`font-bold py-1 px-3 rounded-full text-xs transition-colors duration-200 ${
                            msg.isRead 
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {msg.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'}
                        </button>
                    </div>
                  </div>
                )}
              </li>
            );
          }) : <p className="text-center text-gray-500 dark:text-gray-400 py-4">Chưa có tin nhắn nào.</p>}
        </ul>
      </div>
    </div>
  );
};

export default MessageAdminPanel;
