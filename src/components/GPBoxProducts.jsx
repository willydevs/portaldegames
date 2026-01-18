import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './ui/Button';
import StorePreviewModal from './ui/StorePreviewModal';

const ProductCard = ({ title, oldPrice, price, description, features, recommended, isBestSeller, image, link }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[300px] md:min-w-[350px] snap-center group h-full">
        <div className="relative">
            {isBestSeller && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider z-20 shadow-md">
                    Mais Vendido
                </div>
            )}
            {/* Product Image */}
            <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
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
            <span className="text-gray-400 dark:text-gray-500 line-through text-sm font-medium mr-2">R$ {oldPrice}</span>
            <span className="text-3xl font-bold text-primary dark:text-blue-400">R$ {price}</span>
        </div>

        <div className="flex justify-center mb-6">
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase">Vitalício</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow text-center line-clamp-3">
            {description}
        </p>

        <div className="mt-auto">
            <Button
                variant={isBestSeller ? 'primary' : 'outline'}
                fullWidth
                className={isBestSeller ? 'shadow-lg shadow-blue-600/20' : 'dark:border-gray-700 dark:text-gray-200 dark:hover:bg-slate-800'}
                onClick={() => window.open(link, '_blank')}
            >
                Comprar Agora
            </Button>
        </div>
    </div>
);

const GPBoxProducts = () => {
    const scrollRef = useRef(null);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const gpboxStoreData = {
        name: "GPBOX",
        logo: "/logos/logo.png",
        logo: "/logos/logo.png",
        verified: true,
        url: "https://gpbox.app.br",
        sales: "+3 mil vendas",
        videos: [
            "pCFptaSdw6I",
            "4nmd8hs5Id4",
            "5Xdv1dhwQtc"
        ]
    };

    // Auto-scroll logic similar to ConsoleLists
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = 350; // Approx card width

        const interval = setInterval(() => {
            // Pause if hovered OR isPaused is true
            if (!isHovered && !isPaused) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 7000); // Slower interval as requested

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
            title: "Standard",
            oldPrice: "67,00",
            price: "50,00",
            image: "/products/standard.webp",
            description: "Base completa do sistema: este é o ponto de partida para quem quer jogar sem complicação. Milhares de jogos clássicos, ocupando cerca de 70 GB.",
            features: ["Ideal para computadores simples", "Reviva grandes títulos clássicos"],
            link: "https://go.perfectpay.com.br/PPU38CPRMCT"
        },
        {
            title: "Pack Adicional",
            oldPrice: "67,00",
            price: "40,00",
            image: "/products/adicional.jpg",
            description: "Expanda o sistema com novos consoles e plataformas. Adiciona suporte a PSP, PS2, PS3, PS4, PS5, Xbox 360, Wii U, Switch e outros.",
            features: ["Requer o pack STANDARD instalado", "Consoles modernos, emuladores avançados"],
            link: "https://go.perfectpay.com.br/PPU38CPRO7J"
        },
        {
            title: "Atualizações",
            oldPrice: "60,00",
            price: "40,00",
            image: "/products/update.webp",
            description: "Conteúdo adicional distribuído ao longo do tempo, somando mais de 20 TB de arquivos entre jogos, melhorias e novos títulos.",
            features: ["Mantenha o sistema renovado", "Turbine sua coleção"],
            link: "https://go.perfectpay.com.br/PPU38CPRO84"
        },
        {
            title: "Pack PC Completo",
            oldPrice: "184,00",
            price: "100,00",
            image: "/products/pc-completo.webp",
            description: "Tudo que nossa plataforma tem de melhor em um único pacote por um preço especial.",
            features: ["1x Standard", "1x Pack Adicional", "1x Pack de Atualizações", "Economia máxima"],
            isBestSeller: true,
            link: "https://go.perfectpay.com.br/PPU38CPRSB7"
        },
        {
            title: "Pack Completo",
            oldPrice: "214,00",
            price: "120,00",
            image: "/products/pack-completo.webp",
            description: "Versão definitiva. Inclui todo o conteúdo de PC mais a versão Mobile para Android.",
            features: ["1x Standard, Adicional e Atualizações", "1x GPBOX Mobile", "Jogue no PC e Android"],
            link: "https://go.perfectpay.com.br/PPU38CPRSBB"
        },
        {
            title: "Premium Mobile",
            oldPrice: "50,00",
            price: "30,00",
            image: "/products/android.webp",
            description: "Celular / TV Box Android. Execute jogos clássicos diretamente em dispositivos Android 7.0.3 ou superior.",
            features: ["Leve e Otimizado", "Compatível com TV Box"],
            link: "https://go.perfectpay.com.br/PPU38CPRSAL"
        }
    ];

    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setIsPaused(true); // Ensure auto-scroll is paused while dragging
        const slider = scrollRef.current;
        setStartX(e.pageX - slider.offsetLeft);
        setScrollLeftState(slider.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDown(false);
        setIsHovered(false); // Resume normal hover behavior checks
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const slider = scrollRef.current;
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeftState - walk;
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300" id="products">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-6">
                    {/* Store Card Container - Now Clickable */}
                    <div
                        className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800 w-full max-w-md mx-auto md:mx-0 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >

                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        {/* Top Config: Logo + Info */}
                        <div className="flex items-center gap-5 mb-6 relative z-10">
                            {/* Store Logo */}
                            <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shrink-0">
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full p-1">
                                    <img src="/logos/logo.png" alt="GPBOX Logo" className="w-full h-full object-contain rounded-full" />
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="text-left flex-grow">
                                <span className="text-gray-500 dark:text-gray-400 font-medium text-sm block mb-0.5">
                                    {location.pathname === '/lojas' ? 'Loja Parceira' : 'Loja em Destaque'}
                                </span>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">GPBOX</h2>
                                    {/* Blue Verified Badge */}
                                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-4-3.99-4-.485 0-.96.084-1.4.238C14.45 2.375 13.08 1.5 11.5 1.5c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.71-4 3.99 0 .485.084.96.238 1.4C1.375 9.55.5 10.92.5 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 4 3.99 4 .485 0 .96-.084 1.4-.238C8.55 22.625 9.92 23.5 11.5 23.5c1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.71 4-3.99 0-.485-.084-.96-.238-1.4C21.625 15.45 22.5 14.08 22.5 12.5zM9.04 17.5l-4.5-4.5 1.42-1.42 3.08 3.08 8.08-8.08 1.42 1.42-9.5 9.5z"></path>
                                    </svg>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 leading-tight">
                                    Vendido por <span className="text-blue-600 dark:text-blue-400 font-medium">Portal de Games</span>
                                </div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                                    +3 mil vendas
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

                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={handleMouseLeave}
                >
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

            {/* Store Preview Modal */}
            <StorePreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                store={gpboxStoreData}
            />
        </section>
    );
};

export default GPBoxProducts;
