

import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const LocationHours: React.FC = () => {
    return (
        <section id="location" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Liên hệ & Ghé thăm chúng tôi</h2>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Info Column */}
                    <div className="space-y-8">
                        {/* Working Hours */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center gap-3">
                                <FaClock className="text-teal-500" />
                                Giờ làm việc
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300 pl-8">
                                <li><strong>Thứ Hai - Thứ Sáu:</strong> 8:00 - 19:00</li>
                                <li><strong>Thứ Bảy:</strong> 9:00 - 17:00</li>
                                <li><strong>Chủ Nhật:</strong> Đóng cửa</li>
                            </ul>
                        </div>
                        {/* Contact Info */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Thông tin liên lạc</h3>
                            <div className="space-y-4">
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
                        </div>
                    </div>

                    {/* Map Column */}
                    <div className="rounded-lg overflow-hidden shadow-2xl h-full min-h-[500px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62781.99222588327!2d105.1017046427551!3d10.81438965851496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a568246a3666b%3A0x8e9e43d9b0485601!2zVMOibiBDaMOidSwgQW4gR2lhbmcsIFZp4buHdG5hbQ!5e0!3m2!1sen!2s!4v1721889814144!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Vị trí phòng khám PetCare"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationHours;