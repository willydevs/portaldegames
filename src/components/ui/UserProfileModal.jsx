import React, { useEffect, useState } from 'react';
import Button from './Button';

const UserProfileModal = ({ isOpen, onClose, userName, userReviews }) => {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Calculate stats
    const totalReviews = userReviews.length;
    const positiveCount = userReviews.filter(r => r.classificação?.toLowerCase() === 'positivo').length;
    const neutralCount = userReviews.filter(r => r.classificação?.toLowerCase() === 'neutro').length;
    const negativeCount = totalReviews - positiveCount - neutralCount;

    const getInitials = (name) => {
        return name
            ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
            : 'U';
    };

    const getSentimentColor = (classification) => {
        switch (classification?.toLowerCase()) {
            case 'positivo': return 'text-green-500 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
            case 'negativo': return 'text-red-500 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
            default: return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-fade-in-up">

                {/* Header / Profile Card */}
                <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-gray-100 dark:border-slate-800 flex flex-col items-center text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-white/50 dark:bg-black/20 rounded-full hover:bg-white/80 dark:hover:bg-white/10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg mb-4">
                        <div className="w-full h-full bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-3xl font-bold text-gray-700 dark:text-gray-200">
                            {getInitials(userName)}
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{userName}</h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Membro da comunidade</div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-6">
                        <div className="flex flex-col items-center p-3 bg-white dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700/50 shadow-sm">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalReviews}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Avaliações</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-500/10">
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{positiveCount}</span>
                            <span className="text-xs text-green-600/80 dark:text-green-400/80 uppercase tracking-wide">Positivas</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700/50">
                            <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">{neutralCount + negativeCount}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Outras</span>
                        </div>
                    </div>
                </div>

                {/* History List */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-black/20">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Histórico de Comentários
                    </h3>
                    <div className="space-y-4">
                        {userReviews.map((review, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm flex gap-4">
                                <div className="shrink-0 pt-1">
                                    <div className={`w-2 h-2 rounded-full ${review.classificação?.toLowerCase() === 'positivo' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${getSentimentColor(review.classificação)}`}>
                                            {review.classificação || 'Neutro'}
                                        </span>
                                        <span className="text-xs text-gray-400">{review.data}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{review.comentário}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
