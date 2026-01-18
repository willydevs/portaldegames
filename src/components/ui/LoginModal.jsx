import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);



    // Prevent rendering until mounted to avoid hydration mismatches if used in SSR contexts (optional but good practice)
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl flex flex-col p-8 animate-fade-in-up border border-gray-100 dark:border-slate-800">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bem-vindo de volta!</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Acesse sua conta para continuar.</p>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Senha</label>
                            <a href="#" className="text-xs text-blue-500 hover:underline">Esqueceu a senha?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div className="pt-2">
                        <Button variant="primary" fullWidth size="lg" className="shadow-lg shadow-blue-500/20">
                            Entrar
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Não tem uma conta? <a href="#" className="text-blue-500 font-bold hover:underline">Cadastre-se</a>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default LoginModal;
