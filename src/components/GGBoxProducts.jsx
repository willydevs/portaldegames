import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './ui/Button';

// Importing images
import logoGGBox from '../assets/images/empresas/logo-ggbox-colored.png';
import retroImg from '../assets/images/produtos/ggbox/imgi_3_nostalgia.webp';
import gamerImg from '../assets/images/produtos/ggbox/imgi_4_gamer.webp';
import exclusivoImg from '../assets/images/produtos/ggbox/imgi_5_exclusivo.webp';
import mobileImg from '../assets/images/produtos/ggbox/imgi_2_android.webp';

const ProductCard = ({ title, oldPrice, price, description, image, link }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[300px] md:min-w-[350px] snap-center group h-full relative overflow-hidden">

        {/* Product Image */}
        <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center relative">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
            <span className="text-gray-400 dark:text-gray-500 line-through text-sm font-medium mr-2">R$ {oldPrice}</span>
            <span className="text-3xl font-bold text-primary dark:text-blue-400">R$ {price}</span>
        </div>

        <div className="flex justify-center mb-6">
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full uppercase">Vitalício</span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed flex-grow text-center text-balance">
            {description}
        </p>

        <div className="text-center mb-6">
            <a href="#" className="text-pink-500 hover:text-pink-400 text-sm font-medium transition-colors">
                {title === "PACK EXCLUSIVO" ? "Suporte premium?" : "Ver lista de jogos"}
            </a>
        </div>

        <div className="mt-auto">
            {/* Conditional Button Styling: Only PACK EXCLUSIVO gets Primary (Blue). Others get Outline. */}
            <Button
                variant={title === "PACK EXCLUSIVO" ? 'primary' : 'outline'}
                fullWidth
                className={title === "PACK EXCLUSIVO" ? "shadow-blue-500/20" : "dark:text-gray-200 dark:border-gray-700 dark:hover:bg-slate-800"}
            >
                Comprar Agora
            </Button>
        </div>
    </div>
);

const GGBoxProducts = () => {
    const scrollRef = useRef(null);
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

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
            title: "PACK RETRÔ",
            oldPrice: "89,90",
            price: "50,00",
            image: retroImg,
            description: "Ideal para computadores com configurações simples, nesse pack você encontra os clássicos."
        },
        {
            title: "PACK GAMER",
            oldPrice: "149,90",
            price: "100,00",
            image: gamerImg,
            description: "Inclui: PSP, PS2, PS3, PS4, PS5, Xbox 360, GameCube, Wii, Wii U e Switch e muitos outros!"
        },
        {
            title: "PACK EXCLUSIVO",
            oldPrice: "189,90",
            price: "120,00",
            image: exclusivoImg,
            description: "Acesse todos os nossos sistemas, além de acesso exclusivo ao super pack de atualizações e pack mobile."
        },
        {
            title: "PACK MOBILE",
            oldPrice: "59,90",
            price: "30,00",
            image: mobileImg,
            description: "Perfeito para dispositivos móveis: celulares, tablets, TVs Android e TV boxes."
        }
    ];

    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftState, setScrollLeftState] = useState(0);

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

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300 border-t border-gray-200 dark:border-slate-800" id="ggbox">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="flex items-center gap-4 mb-6 md:mb-0">
                        {/* Store Logo */}
                        <div className="w-16 h-16 rounded-lg border border-gray-100 dark:border-slate-800 p-1 bg-white dark:bg-slate-900 shadow-sm shrink-0">
                            <img src={logoGGBox} alt="GGBox Logo" className="w-full h-full object-contain rounded-md" />
                        </div>

                        {/* Store Info */}
                        <div className="text-left">
                            <div className="flex items-center gap-1.5">
                                <span className="text-gray-500 dark:text-gray-400 font-normal">
                                    {location.pathname === '/lojas' ? 'Loja' : 'Loja em destaque'}
                                </span>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">GGBOX</h2>
                                {/* Blue Verified Badge */}
                                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Vendido por <span className="text-blue-500 hover:underline cursor-pointer">Portal de Games</span>
                            </div>
                        </div>
                    </div>
                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        <button onClick={scrollLeft} className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                        <button onClick={togglePause} className={`p-3 rounded-full border border-gray-200 dark:border-slate-700 transition-colors focus:outline-none shadow-sm ${isPaused ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900' : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'}`}>{isPaused ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}</button>
                        <button onClick={scrollRight} className="p-3 rounded-full bg-white border border-gray-200 hover:bg-gray-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none shadow-sm"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                    </div>
                </div>

                <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={handleMouseLeave}>
                    <div ref={scrollRef} className={`flex overflow-x-auto gap-6 pb-12 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 select-none ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                        {products.map((product, idx) => (
                            <ProductCard key={idx} {...product} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GGBoxProducts;
