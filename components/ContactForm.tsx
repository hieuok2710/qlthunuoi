import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { Message } from '../types';

interface ContactFormProps {
    onSendMessage: (message: Omit<Message, 'id' | 'date' | 'isRead'>) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSendMessage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !subject || !message) {
            setError('Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }

        // Pass the message data to the parent component
        onSendMessage({ name, email, subject, message });

        setIsSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');

        setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
    };

    return (
        <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Liên hệ với chúng tôi</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Có câu hỏi hoặc muốn đặt lịch? Gửi tin nhắn cho chúng tôi và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
            </p>
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Thông tin liên lạc</h3>
                    <p className="flex items-start text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt className="w-5 h-5 mr-4 mt-1 text-teal-500 flex-shrink-0" />
                        <span>Đường Trần Phú, Khóm Long Thạnh D, phường Tân Châu, tỉnh An Giang</span>
                    </p>
                     <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaPhone className="w-5 h-5 mr-4 text-teal-500" />
                        <span>0916.499.916</span>
                    </p>
                     <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaEnvelope className="w-5 h-5 mr-4 text-teal-500" />
                        <span>nthieutc@gmail.com</span>
                    </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                     {isSubmitted && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert">
                            <p className="font-bold">Gửi thành công!</p>
                            <p>Cảm ơn bạn đã liên hệ. Chúng tôi sẽ sớm trả lời bạn.</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                            <p>{error}</p>
                        </div>
                    )}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Tên của bạn</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" placeholder="Nguyễn Văn A" required />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Email</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" placeholder="email@example.com" required />
                    </div>
                     <div>
                        <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Chủ đề</label>
                        <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" placeholder="Về lịch hẹn..." required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Tin nhắn</label>
                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600" placeholder="Nội dung tin nhắn của bạn..." required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-2 transition-colors duration-300">
                        <FaPaperPlane /> Gửi tin nhắn
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;