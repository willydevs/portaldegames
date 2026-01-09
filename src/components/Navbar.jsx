import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import Button from './ui/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
                    : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <a href="/" className="group">
                    <img
                        src={logo}
                        alt="Portal de Games"
                        className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                    />
                </a>

                <div className="hidden md:flex items-center space-x-8">
                    <a href="#games" className="text-gray-600 hover:text-primary font-medium transition-colors">Jogos</a>
                    <a href="#systems" className="text-gray-600 hover:text-primary font-medium transition-colors">Sistemas</a>
                    <a href="#benefits" className="text-gray-600 hover:text-primary font-medium transition-colors">Benefícios</a>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="hidden md:inline-flex" size="sm">
                        Entrar
                    </Button>
                    <Button variant="primary" size="sm" className="shadow-primary/20">
                        Acessar Agora
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
