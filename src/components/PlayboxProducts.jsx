import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './ui/Button';
import playboxLogo from '../assets/images/empresas/playbox-reserva.webp';

const ProductCard = ({ title, oldPrice, price, description, features, recommended, isBestSeller, image, color }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[300px] md:min-w-[350px] snap-center group h-full relative overflow-hidden">

        {/* Top Color Bar for "Tier" effect */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${color}`}></div>

        <div className="relative">
            {isBestSeller && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider z-20 shadow-md">
                    Mais Popular
                </div>
            )}
            {/* Product Image */}
            <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight text-center">{title}</h3>

        <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <span className="text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">{features[0]}</span>
            </div>
        </div>

        <div className="mb-4 flex flex-col items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 line-through text-lg font-medium">R$ {oldPrice}</span>
            <div className={`text-4xl font-bold mb-2 ${isBestSeller ? 'text-yellow-500' : 'text-primary dark:text-blue-400'}`}>R$ {price}</div>
            <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                VITALÍCIO
            </div>
        </div>

        <div className="space-y-3 mb-8 flex-grow">
            {features.slice(1).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {feature.startsWith('no-') ? (
                        <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    )}
                    <span className={feature.startsWith('no-') ? 'text-gray-400 line-through' : ''}>
                        {feature.replace('no-', '')}
                    </span>
                </div>
            ))}
        </div>

        <div className="mt-auto">
            <Button variant={isBestSeller ? 'primary' : 'outline'} fullWidth className={isBestSeller ? 'bg-yellow-500 hover:bg-yellow-600 border-yellow-500 shadow-yellow-500/20 text-white' : 'dark:border-gray-700 dark:text-gray-200 dark:hover:bg-slate-800'}>
                Comprar Agora
            </Button>
        </div>
    </div>
);

const PlayboxProducts = () => {
    const scrollRef = useRef(null);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;
        const scrollAmount = 350;
        const interval = setInterval(() => {
            if (!isHovered && !isPaused) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 7000);

        return () => clearInterval(interval);
    }, [isHovered, isPaused]);

    // Drag to scroll handlers
    const handleMouseDown = (e) => {
        setIsDown(true);
        setIsPaused(true);
        const slider = scrollRef.current;
        setStartX(e.pageX - slider.offsetLeft);
        setScrollLeftState(slider.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
        setIsHovered(false);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const slider = scrollRef.current;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeftState - walk;
    };

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    };

    const togglePause = () => setIsPaused(!isPaused);

    const products = [
        {
            title: "Ultimate",
            oldPrice: "144,80",
            price: "134,80",
            image: "/logos/playbox/ultimate.avif",
            color: "bg-yellow-500",
            features: [
                "40 Consoles", // Used as tag
                "40 consoles desbloqueados",
                "Mais de 20.000 Jogos incluídos",
                "Biblioteca completa",
                "Atualizações exclusivas",
                "Instalação remota",
                "Consoles mais recentes"
            ],
            isBestSeller: true
        },
        {
            title: "Upgrade",
            oldPrice: "114,90",
            price: "104,90",
            image: "/logos/playbox/intermediario.avif",
            color: "bg-blue-500",
            features: [
                "35 Consoles", // Used as tag
                "35 consoles desbloqueados",
                "Mais de 18.000 Jogos incluídos",
                "Atualizações exclusivas",
                "Biblioteca completa",
                "no-Instalação remota",
                "no-Consoles mais recentes"
            ]
        },
        {
            title: "Playbox",
            oldPrice: "74,90",
            price: "64,90",
            image: "/logos/playbox/basico.avif",
            color: "bg-gray-500",
            features: [
                "30 Consoles", // Used as tag
                "30 consoles desbloqueados",
                "Mais de 15.000 Jogos incluídos",
                "no-Atualizações exclusivas",
                "no-Biblioteca completa",
                "no-Instalação remota",
                "no-Consoles mais recentes"
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 border-t border-gray-100 dark:border-slate-800" id="playbox">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6">
                    {/* Store Card Container */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800 w-full max-w-md mx-auto md:mx-0 relative overflow-hidden group">

                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        {/* Top Config: Logo + Info */}
                        <div className="flex items-center gap-5 mb-6 relative z-10">
                            {/* Store Logo */}
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shrink-0">
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full p-1">
                                    <img src={playboxLogo} alt="Playbox Logo" className="w-full h-full object-contain rounded-full" />
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="text-left flex-grow">
                                <span className="text-gray-500 dark:text-gray-400 font-medium text-sm block mb-0.5">
                                    {location.pathname === '/lojas' ? 'Loja Parceira' : 'Loja em Destaque'}
                                </span>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Playbox</h2>
                                    {/* Blue Verified Badge */}
                                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-4-3.99-4-.485 0-.96.084-1.4.238C14.45 2.375 13.08 1.5 11.5 1.5c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.71-4 3.99 0 .485.084.96.238 1.4C1.375 9.55.5 10.92.5 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 4 3.99 4 .485 0 .96-.084 1.4-.238C8.55 22.625 9.92 23.5 11.5 23.5c1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.71 4-3.99 0-.485-.084-.96-.238-1.4C21.625 15.45 22.5 14.08 22.5 12.5zM9.04 17.5l-4.5-4.5 1.42-1.42 3.08 3.08 8.08-8.08 1.42 1.42-9.5 9.5z"></path>
                                    </svg>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 leading-tight">
                                    Vendido por <span className="text-blue-600 dark:text-blue-400 font-medium">Portal de Games</span>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                                    +1 mil vendas
                                </div>
                            </div>
                        </div>

                        {/* Delivery Banner */}
                        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-center justify-between group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors cursor-default">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                                <span className="text-gray-600 dark:text-gray-300 font-bold text-xs uppercase tracking-wider">Entrega <span className="text-green-600 dark:text-green-400">Imediata</span></span>
                            </div>
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>

                    {/* Navigation & Pause (Centered below card on mobile, right on desktop) */}
                    <div className="flex items-center justify-center gap-4 w-full md:w-auto">
                        <button
                            onClick={scrollLeft}
                            className="p-4 rounded-full bg-white border border-gray-100 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-all focus:outline-none shadow-lg hover:shadow-xl active:scale-95"
                            aria-label="Previous"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <button
                            onClick={togglePause}
                            className={`p-4 rounded-full border transition-all focus:outline-none shadow-lg hover:shadow-xl active:scale-95 ${isPaused ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300 dark:hover:bg-slate-800'}`}
                            aria-label={isPaused ? "Play" : "Pause"}
                        >
                            {isPaused ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            )}
                        </button>

                        <button
                            onClick={scrollRight}
                            className="p-4 rounded-full bg-white border border-gray-100 hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-all focus:outline-none shadow-lg hover:shadow-xl active:scale-95"
                            aria-label="Next"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>

                <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
                    <div
                        ref={scrollRef}
                        className={`flex overflow-x-auto gap-6 pb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 select-none ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {products.map((product, idx) => (
                            <ProductCard key={idx} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlayboxProducts;
