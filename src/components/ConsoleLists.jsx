import React, { useRef, useEffect, useState } from 'react';
import Button from './ui/Button';

// Local images
const nfsImage = '/games/nfsmw.webp';

const GameCard = ({ title, image, oldPrice, price }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col min-w-[240px] md:min-w-[280px] snap-center group">
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className="text-gray-900 dark:text-white font-bold text-center mb-1 text-base line-clamp-2 min-h-[3rem] flex items-center justify-center">
            {title}
        </h3>

        <div className="flex flex-col items-center justify-center mb-3">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-gray-400 dark:text-gray-500 line-through text-sm font-medium">R$ {oldPrice}</span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {price}</span>
            </div>
            <div className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                VITALÍCIO
            </div>
        </div>

        <div className="text-center mb-3">
            <span className="text-green-600 dark:text-green-400 text-xs font-bold">Entrega em até 4h</span>
        </div>

        <div className="mt-auto">
            <Button variant="primary" size="sm" fullWidth className="rounded-full shadow-blue-500/30 font-bold">
                Baixar Jogo
            </Button>
        </div>
    </div>
);

const GameRow = ({ title, games }) => {
    const scrollRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const scrollAmount = 300; // Approx card width + gap

        const interval = setInterval(() => {
            // Only scroll if NOT hovered AND NOT paused
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
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const togglePause = () => setIsPaused(!isPaused);

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
        <div
            className="mb-12 last:mb-0 relative group/row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex items-center justify-between mb-6 px-4 md:px-0">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3">{title}</h3>

                {/* Navigation Arrows & Pause */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={scrollLeft}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none"
                        aria-label="Previous"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                        onClick={togglePause}
                        className={`p-2 rounded-full transition-colors focus:outline-none ${isPaused ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-gray-300'}`}
                        aria-label={isPaused ? "Play" : "Pause"}
                        title={isPaused ? "Resume Animation" : "Pause Animation"}
                    >
                        {isPaused ? (
                            // Play Icon
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        ) : (
                            // Pause Icon
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                    </button>

                    <button
                        onClick={scrollRight}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors focus:outline-none"
                        aria-label="Next"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className={`flex overflow-x-auto gap-6 pb-8 px-4 md:px-0 scrollbar-hide -mx-4 md:mx-0 select-none ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'}`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {games.map((game, idx) => (
                    <GameCard key={idx} {...game} />
                ))}
            </div>
        </div>
    );
};

const ConsoleLists = () => {
    // Configured data from user request
    const ps4Games = [
        { title: "Dark Souls Remastered", image: "https://m.media-amazon.com/images/I/716RNd1mPML._AC_UF1000,1000_QL80_.jpg", oldPrice: "179,90", price: "9,90" },
        { title: "Dark Souls 2", image: "https://m.media-amazon.com/images/I/71hIZMtJfWL._AC_UF1000,1000_QL80_.jpg", oldPrice: "149,90", price: "9,90" },
        { title: "Dark Souls 3", image: "https://m.media-amazon.com/images/I/81kHY1Irw0L._AC_UF1000,1000_QL80_.jpg", oldPrice: "249,90", price: "9,90" },
        { title: "Elden Ring", image: "https://m.media-amazon.com/images/I/71lS5rBEFmL._AC_UF1000,1000_QL80_.jpg", oldPrice: "299,90", price: "19,90" },
        { title: "Need for Speed MW", image: nfsImage, oldPrice: "89,90", price: "9,90" },
        { title: "Red Dead Redemption 2", image: "https://m.media-amazon.com/images/I/71XrxGqPosL._AC_UF1000,1000_QL80_.jpg", oldPrice: "248,90", price: "9,90" },
        { title: "Sekiro: Shadows Die Twice", image: "https://www.sekirothegame.com/content/dam/atvi/sekiro/buy/box-art/PS4_2D_MX.jpg", oldPrice: "274,50", price: "19,90" },
        { title: "Spider-Man Remastered", image: "https://m.media-amazon.com/images/I/815TEngwF7L.jpg", oldPrice: "249,50", price: "19,90" },
        { title: "The Last of Us Part I", image: "https://m.media-amazon.com/images/I/91zSahIYtIL.jpg", oldPrice: "349,90", price: "19,90" },
        { title: "Uncharted L.T. Collection", image: "https://m.media-amazon.com/images/I/813QeeXqZwL._AC_UF1000,1000_QL80_.jpg", oldPrice: "199,50", price: "9,90" },
        { title: "God of War", image: "https://m.media-amazon.com/images/I/913r59lGp-L.jpg", oldPrice: "99,50", price: "9,90" }
    ];

    const ps5Games = [
        { title: "Assassin's Creed Mirage", image: "https://m.media-amazon.com/images/I/81tSC34DQFL.jpg", oldPrice: "239,90", price: "19,90" },
        { title: "Dynasty Warriors Origins", image: "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/dynasty-warriors-origins-ps5-sony/bluewavesgame/22012026/cacae64af9e69afc1790f2c9841fd697.jpeg", oldPrice: "349,90", price: "19,90" },
        { title: "God of War Ragnarök", image: "https://m.media-amazon.com/images/I/8136lnf0n2L.jpg", oldPrice: "349,90", price: "19,90" },
        { title: "Silent Hill 2", image: "https://m.media-amazon.com/images/I/71E3B-85r1L.jpg", oldPrice: "349,50", price: "19,90" },
        { title: "The Witcher 3: Complete Edition", image: "https://m.media-amazon.com/images/I/81BHn3JO3ML._AC_UF1000,1000_QL80_.jpg", oldPrice: "199,90", price: "9,90" }
    ];

    const xboxGames = [
        { title: "Call of Duty: Black Ops 3", image: "https://m.media-amazon.com/images/I/81T23W11n6L.jpg", oldPrice: "299,00", price: "19,90" },
        { title: "Crysis 3 Remastered", image: "https://m.media-amazon.com/images/I/71E4xtlcajL._AC_UF1000,1000_QL80_.jpg", oldPrice: "149,50", price: "9,90" },
        { title: "Cyberpunk 2077", image: "https://m.media-amazon.com/images/I/819bg+506sL.jpg", oldPrice: "249,90", price: "19,90" },
        { title: "Dragon Ball: Sparking! Zero", image: "https://m.media-amazon.com/images/I/817bPOXbpqL._AC_UF1000,1000_QL80_.jpg", oldPrice: "349,90", price: "19,90" },
        { title: "Forza Horizon 5", image: "https://m.media-amazon.com/images/I/61RvJphIh0L._AC_UF1000,1000_QL80_.jpg", oldPrice: "249,00", price: "9,90" },
        { title: "GTA V", image: "https://m.media-amazon.com/images/I/71EyQaVZq0L._AC_UF1000,1000_QL80_.jpg", oldPrice: "149,90", price: "9,90" }
    ];

    return (
        <section className="py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300" id="games">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Catálogo de Jogos</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore nossa biblioteca organizada por plataforma. Milhares de títulos à sua disposição.
                    </p>
                </div>

                <div className="space-y-4">
                    <GameRow title="PlayStation 4" games={ps4Games} />
                    <GameRow title="PlayStation 5" games={ps5Games} />
                    <GameRow title="Xbox One / Series" games={xboxGames} />
                </div>
            </div>
        </section>
    );
};

export default ConsoleLists;
