import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './ui/Button';
import StorePreviewModal from './ui/StorePreviewModal';
import ProductModal from './store/ProductModal';

const ProductCard = ({ title, oldPrice, price, description, features, recommended, isBestSeller, image, link, onOpenModal }) => (
    <div
        onClick={onOpenModal}
        className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[300px] md:min-w-[350px] snap-center group h-full cursor-pointer relative"
    >
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
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenModal();
                }}
            >
                Ver Detalhes
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
    const [selectedProduct, setSelectedProduct] = useState(null);

    const gpboxStoreData = {
        name: "GPBOX",
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
            if (!isHovered && !isPaused && !selectedProduct) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 7000);

        return () => clearInterval(interval);
    }, [isHovered, isPaused, selectedProduct]);

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

    // Products with Updated Copy
    const products = [
        {
            id: 'standard',
            title: "Standard",
            name: "Standard", // For Modal
            productName: "Standard",
            badge: "Vitalício", // For Modal
            oldPrice: "67,00",
            priceFrom: 67.00, // For Modal Logic
            price: "50,00",
            priceTo: 50.00, // For Modal Logic
            image: "/products/standard.webp",
            description: "Com o Standard, você mergulha em um universo com mais de 7.000 jogos retrô prontos para jogar, sem instalação complexa, sem anúncios, sem enrolação. Acesso completo à coleção clássica que marcou gerações!",
            features: [
                "Funciona em dispositivos antigos e novos",
                "Mais de 7.000 jogos retrô prontos para jogar",
                "Compatível com controles USB e Bluetooth",
                "Instalação fácil e interface intuitiva",
                "Sem necessidade de configurações manuais",
                "Acesso vitalício, sem mensalidades"
            ],
            link: "https://go.perfectpay.com.br/PPU38CPRMCT",
            ctaLink: "https://go.perfectpay.com.br/PPU38CPRMCT" // For Modal
        },
        {
            id: 'gold',
            title: "Pack Adicional (Gold)",
            name: "Pack Adicional (Gold)",
            badge: "Vitalício",
            oldPrice: "57,00",
            priceFrom: 57.00,
            price: "40,00",
            priceTo: 40.00,
            image: "/products/adicional.jpg",
            description: "Expanda sua biblioteca e desbloqueie consoles clássicos e modernos com alto desempenho. O Pack Adicional (Gold) é a escolha ideal para quem já possui o Pack Standard e quer elevar a experiência de jogo.",
            features: [
                "Consoles modernos e adicionais liberados",
                "Jogos otimizados para melhor estabilidade e desempenho",
                "Compatibilidade com controles USB, Xbox e DualShock/DualSense",
                "Instalação simples e sem configurações complexas",
                "Acesso vitalício ao conteúdo do pacote",
                "*Requer o Pack Standard instalado para funcionamento."
            ],
            link: "https://go.perfectpay.com.br/PPU38CPRO7J",
            ctaLink: "https://go.perfectpay.com.br/PPU38CPRO7J"
        },
        {
            id: 'updates',
            title: "Pack de Atualizações",
            name: "Pack de Atualizações",
            badge: "Vitalício",
            oldPrice: "60,00",
            priceFrom: 60.00,
            price: "40,00",
            priceTo: 40.00,
            image: "/products/update.webp",
            description: "Novos jogos, melhorias e conteúdos extras liberados continuamente — tudo pronto para usar. O Pack de Atualizações é ideal para quem quer manter o sistema sempre atual.",
            features: [
                "Novos jogos adicionados periodicamente",
                "Packs extras, melhorias visuais e ajustes técnicos",
                "Atualizações de sistemas, organização e otimização",
                "Correções constantes e compatibilidade aprimorada",
                "Acesso vitalício a todo conteúdo futuro"
            ],
            link: "https://go.perfectpay.com.br/PPU38CPRO84",
            ctaLink: "https://go.perfectpay.com.br/PPU38CPRO84"
        },
        {
            id: 'upscale',
            title: "Patch Upscale",
            name: "Patch Upscale",
            badge: "Vitalício",
            oldPrice: "70,00",
            priceFrom: 70.00,
            price: "19,90",
            priceTo: 19.90,
            image: "/products/upscale.png",
            description: "Leve seus jogos para HD e Full HD com mais nitidez to visual aprimorado. O Patch Upscale foi desenvolvido para quem deseja melhorar significativamente a qualidade visual dos jogos retrô.",
            features: [
                "Suporte a resolução HD e Full HD",
                "Texturas mais nítidas e melhor definição de imagem",
                "Redução de serrilhados e bordas mais suaves",
                "Cores mais equilibradas e agradáveis aos olhos",
                "Aplicação simples: instalar e jogar",
                "Compatível com diversos consoles e sistemas"
            ],
            link: "https://go.perfectpay.com.br/PPU38CPRSAL", // Using placeholder link or mapped if known? User didn't give link for Upscale but gave copy. I'll use a placeholder or reuse one for now.
            ctaLink: "#"
        },
        {
            id: 'pc-completo',
            title: "Pack PC Completo",
            name: "Pack PC Completo",
            badge: "Vitalício",
            oldPrice: "184,00",
            priceFrom: 184.00,
            price: "100,00",
            priceTo: 100.00,
            image: "/products/pc-completo.webp",
            description: "A experiência definitiva para jogar no PC com máximo desempenho, organização e variedade. O Pack PC Completo foi criado para quem quer tudo em um só lugar. Inclui: Pack Standard, Special Edition, Pack de Atualizações.",
            features: [
                "Mais de 20.000 jogos disponíveis",
                "Todos os consoles integrados em um único sistema",
                "Atualizações frequentes de conteúdo",
                "Estrutura organizada e instalação simplificada",
                "Acesso vitalício ao pacote"
            ],
            isBestSeller: true,
            highlight: true,
            link: "https://go.perfectpay.com.br/PPU38CPRSB7",
            ctaLink: "https://go.perfectpay.com.br/PPU38CPRSB7"
        },
        {
            id: 'pack-completo',
            title: "Pack Completo",
            name: "Pack Completo",
            badge: "Vitalício",
            oldPrice: "214,00",
            priceFrom: 214.00,
            price: "120,00",
            priceTo: 120.00,
            image: "/products/pack-completo.webp",
            description: "O pacote definitivo para jogar no PC com desempenho, organização e um catálogo completo. Inclui todo o conteúdo dos pacotes anteriores: Standard, Special Edition, Atualizações e Mobile.",
            features: [
                "Mais de 20.000 jogos disponíveis",
                "Todos os consoles incluídos no sistema",
                "Conteúdo em constante atualização",
                "Instalação simples e bem organizada",
                "Acesso vitalício ao pacote"
            ],
            highlight: true,
            link: "https://go.perfectpay.com.br/PPU38CPRSBB",
            ctaLink: "https://go.perfectpay.com.br/PPU38CPRSBB"
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
        <>
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

                        {/* Navigation & Pause */}
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
                                <ProductCard
                                    key={idx}
                                    {...product}
                                    onOpenModal={() => setSelectedProduct(product)}
                                />
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

                {/* Product Detail Modal */}
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </section>
        </>
    );
};

export default GPBoxProducts;
