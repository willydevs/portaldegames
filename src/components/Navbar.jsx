import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import LoginModal from './ui/LoginModal';
import ThemeToggle from './ui/ThemeToggle';

// Image import
import logoImg from '../assets/images/logo.png';

const Navbar = ({ theme, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Jogos', href: '/jogos', isRoute: true },
        { name: 'Destaque', href: '/#products' },
        { name: 'Lojas', href: '/lojas', isRoute: true },
        { name: 'Depoimentos', href: '/#testimonials' },
        { name: 'Benefícios', href: '/#benefits' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <img src={logoImg} alt="Portal de Games" className="h-10 w-auto relative z-10" />
                        </div>
                        <span className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                            Portal<span className="text-primary">Games</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            link.isRoute ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-sm font-medium transition-colors ${location.pathname === link.href ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'}`}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                        <Button
                            variant="primary"
                            size="sm"
                            className="shadow-blue-500/20"
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            Acessar Agora
                        </Button>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </nav>
    );
};

export default Navbar;
