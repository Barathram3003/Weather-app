import React, { useState, useEffect, useRef } from 'react';
import Barath from "./assets/Barath.jpg";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className='bg-white top-0 flex items-center justify-between px-12 rounded-2xl md:px-20 py-6'>
            <a href="https://barathram3003.github.io/Portfolio---Barathramana-C-/" className='cursor-pointer'>
                <p className='lg:font-extrabold lg:text-2xl font-semibold text-xl font-play'>Barathramana</p>
            </a>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center gap-8"
                >
                    <img
                        src={Barath}
                        alt="Profile"
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-xl"
                    />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r bg-white shadow-lg z-50 rounded-lg">
                        <a
                            href="https://weatherapp-br03.netlify.app/"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-800 hover:text-white"
                        >
                            Weather App
                        </a>
                        <a
                            href="https://qrcodegeneratorbr3003.netlify.app/"
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-800 hover:text-white"
                        >
                            QrCode Generator
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
