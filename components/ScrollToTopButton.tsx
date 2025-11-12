import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-teal-500 hover:bg-teal-600 text-white font-bold p-4 rounded-full shadow-lg transition-opacity duration-300 z-50 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Quay lại đầu trang"
            style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;
