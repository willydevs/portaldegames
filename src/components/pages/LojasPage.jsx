import React, { useEffect } from 'react';
import GPBoxProducts from '../GPBoxProducts';
import PlayboxProducts from '../PlayboxProducts';
import StoreCard from '../ui/StoreCard';

// Importing partner images
import playboxImg from '../../assets/images/empresas/playbox-reserva.webp';
import ragboxImg from '../../assets/images/empresas/ragbox.png';
import fullstoreImg from '../../assets/images/empresas/fullstoregg.png';
import gameflixImg from '../../assets/images/empresas/gameflix-logo.png';

const LojasPage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const otherStores = [
        { name: "Ragbox", logo: ragboxImg, type: "Retro", verified: true },
        { name: "Full Store GG", logo: fullstoreImg, type: "Mobile / PC", verified: true },
        { name: "GameFlix", logo: gameflixImg, type: "Retro / PC", verified: true },
    ];

    return (
        <div className="pt-24 pb-20">
            {/* Header Section */}
            <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Lojas do Portal de Games
                </h1>
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full border border-green-100 dark:border-green-900/50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    <span className="font-medium">Todas as lojas abaixo são verificadas, seguras e aprovadas pelo Portal de Games.</span>
                </div>
            </div>

            {/* GPBox Section (Reused) */}
            <GPBoxProducts />

            {/* Playbox Section (Reused) */}
            <PlayboxProducts />

            {/* Other Stores Grid */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Outras Lojas Aprovadas</h2>
                        <p className="text-gray-600 dark:text-gray-400">Explore mais opções de parceiros oficiais.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {otherStores.map((store, idx) => (
                            <div key={idx} className="h-full">
                                <StoreCard {...store} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LojasPage;
