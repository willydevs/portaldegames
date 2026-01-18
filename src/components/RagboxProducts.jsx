import React, { useRef, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './ui/Button';
import StorePreviewModal from './ui/StorePreviewModal';

// Importing logo
import ragboxLogo from '../assets/images/empresas/ragbox.png';

const ProductCard = ({ title, oldPrice, price, description, image, badge, link }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[300px] md:min-w-[350px] snap-center group h-full relative overflow-hidden">

        {/* Product Image */}
        <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center relative group-hover:shadow-lg transition-shadow">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-tight text-center">{title}</h3>

        {/* Delivery Badge (FULL Style) */}
        <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1">
                <svg className="w-4 h-4 text-green-600 dark:text-green-500 fill-current" viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z" /></svg>
                <span className="text-green-600 dark:text-green-500 font-extrabold italic text-sm tracking-tighter">ENTREGA <span className="text-green-500 dark:text-green-400">IMEDIATA</span></span>
            </div>
        </div>

        <div className="mb-4 flex items-center justify-center">
            {oldPrice && <span className="text-gray-400 dark:text-gray-500 line-through text-sm font-medium mr-2">R$ {oldPrice}</span>}
            <span className="text-3xl font-bold text-primary dark:text-blue-400">R$ {price}</span>
        </div>

        <div className="flex justify-center mb-6">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {badge || "VITALÍCIO"}
            </span>
        </div>

        <div className="mb-4">
            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1 text-center">
                {title === "PREMIUM MOBILE" ? "Celular / TV Box Android" : "PC / Notebook (Bootável)"}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow text-center text-balance">
                {description}
            </p>
            {title === "PREMIUM MOBILE" && (
                <p className="text-xs text-gray-500 dark:text-gray-500 text-center -mt-4 mb-4">Requer Android 7.0.3 ou superior.</p>
            )}
            <div className="text-center mb-2">
                <Link to="/jogos" className="text-pink-500 hover:text-pink-400 text-sm font-medium transition-colors">
                    Ver lista de jogos
                </Link>
            </div>
        </div>

        <div className="mt-auto">
            <Button
                variant='primary'
                fullWidth
                className="shadow-blue-500/20"
                onClick={() => window.open(link, '_blank')}
            >
                Comprar Agora
            </Button>
        </div>
    </div>
);

const ragboxStoreData = {
    name: "RAGBOX",
    logo: ragboxLogo,
    verified: true,
    url: "https://ragbox.app.br",
    sales: "+10 mil vendas",
    videos: [
        { type: 'instagram', id: 'DNk-L6zxvrl' },
        { type: 'instagram', id: 'C_HWo7LvuP_' },
        { type: 'instagram', id: 'DNn2GD8Rj0F' }
    ]
};

const RagboxProducts = () => {
    const scrollRef = useRef(null);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

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
        }, 8000);

        return () => clearInterval(interval);
    }, [isHovered, isPaused]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
    };

    const togglePause = () => setIsPaused(!isPaused);

    const products = [
        {
            title: "PREMIUM MOBILE",
            oldPrice: "50,00",
            price: "30,00",
            image: "/products/ragbox-premium-mobile.png",
            badge: "Vitalício",
            description: "Jogue os clássicos no seu celular, tablet ou TV Box Android.",
            link: "https://go.perfectpay.com.br/PPU38CPRSAL"
        },
        {
            title: "PENDRIVE RETRÔ 32GB",
            oldPrice: "120,00",
            price: "89,90",
            image: "/products/pendrive-retro.png",
            badge: "Plug & Play",
            description: "Sistema Multijogos via boot. Transforme qualquer PC em uma máquina retrô. São 32GB de jogos configurados.",
            link: "https://go.perfectpay.com.br/PPU38CQ57PB"
        }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300 border-t border-gray-200 dark:border-slate-800" id="ragbox">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6">
                    {/* Store Card Container */}
                    <div
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800 w-full max-w-md mx-auto md:mx-0 relative overflow-hidden group cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
                        onClick={() => setIsModalOpen(true)}
                    >

                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        {/* Top Config: Logo + Info */}
                        <div className="flex items-center gap-5 mb-6 relative z-10">
                            {/* Store Logo */}
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shrink-0">
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full p-1">
                                    <img src={ragboxLogo} alt="Ragbox Logo" className="w-full h-full object-contain rounded-full" />
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="text-left flex-grow">
                                <span className="text-gray-500 dark:text-gray-400 font-medium text-sm block mb-0.5">
                                    {location.pathname === '/lojas' ? 'Loja Parceira' : 'Loja em Destaque'}
                                </span>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">RAGBOX</h2>
                                    {/* Blue Verified Badge */}
                                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-4-3.99-4-.485 0-.96.084-1.4.238C14.45 2.375 13.08 1.5 11.5 1.5c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.71-4 3.99 0 .485.084.96.238 1.4C1.375 9.55.5 10.92.5 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 4 3.99 4 .485 0 .96-.084 1.4-.238C8.55 22.625 9.92 23.5 11.5 23.5c1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.71 4-3.99 0-.485-.084-.96-.238-1.4C21.625 15.45 22.5 14.08 22.5 12.5zM9.04 17.5l-4.5-4.5 1.42-1.42 3.08 3.08 8.08-8.08 1.42 1.42-9.5 9.5z"></path>
                                    </svg>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 leading-tight">
                                    Vendido por <span className="text-blue-600 dark:text-blue-400 font-medium">Portal de Games</span>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                                    +10 mil vendas
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

                <div className="relative">
                    {/* Changed alignment to start as requested */}
                    <div className="flex flex-wrap justify-start gap-6 px-4 md:px-0">
                        {products.map((product, idx) => (
                            <div key={idx} className="w-full sm:w-[350px]">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Store Preview Modal */}
            <StorePreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                store={ragboxStoreData}
            />

        </section>
    );
};

export default RagboxProducts;
