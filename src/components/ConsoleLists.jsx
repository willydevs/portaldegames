import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './ui/Button';

const GameCard = ({ title, image, oldPrice, price, video, onPlay }) => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col w-[240px] md:w-[280px] flex-shrink-0 snap-center group">
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 group/image">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x530/e2e8f0/1e293b?text=No+Image';
                }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity ${video ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

            {video && (
                <button
                    onClick={() => onPlay(video)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover/image:opacity-100 transition-all duration-300 bg-black/40 hover:bg-black/50"
                >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50 hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </button>
            )}
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

const GameRow = ({ title, games, onPlayVideo }) => {
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

    if (!games || games.length === 0) return null;

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
                    <GameCard key={idx} {...game} onPlay={onPlayVideo} />
                ))}
            </div>
        </div>
    );
};

const ConsoleLists = ({ showViewAllLink = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [videoModal, setVideoModal] = useState({ isOpen: false, videoUrl: '' });
    const [gamesData, setGamesData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [visibleRows, setVisibleRows] = useState(3);

    const openVideo = (url) => setVideoModal({ isOpen: true, videoUrl: url });
    const closeVideo = () => setVideoModal({ isOpen: false, videoUrl: '' });

    // Full system configuration
    const systemsConfig = [
        // Modern Gen
        { id: 'ps5', title: 'PlayStation 5', file: 'ps5.json' },
        { id: 'ps4', title: 'PlayStation 4', file: 'ps4.json' },
        { id: 'xboxone', title: 'Xbox One / Series', file: 'xboxone.json' },
        { id: 'switch', title: 'Nintendo Switch', file: 'switch.json' },
        { id: 'windows', title: 'PC Windows', file: 'windows.json' },

        // Previous Gen
        { id: 'wiiu', title: 'Nintendo Wii U', file: 'wiiu.json' },
        { id: 'ps3', title: 'PlayStation 3', file: 'ps3.json' },
        { id: 'xbox360', title: 'Xbox 360', file: 'xbox360.json' },
        { id: 'wii', title: 'Nintendo Wii', file: 'wii.json' },

        // Classics 3D
        { id: 'ps2', title: 'PlayStation 2', file: 'ps2.json' },
        { id: 'xbox', title: 'Xbox Clássico', file: 'xbox.json' },
        { id: 'gamecube', title: 'Nintendo GameCube', file: 'gamecube.json' },
        { id: 'dreamcast', title: 'Sega Dreamcast', file: 'dreamcast.json' },
        { id: 'ps1', title: 'PlayStation 1', file: 'ps1.json' },
        { id: 'n64', title: 'Nintendo 64', file: 'n64.json' },
        { id: '3do', title: '3DO Interactive Multiplayer', file: '3do.json' },
        { id: 'saturn', title: 'Sega Saturn', file: 'saturn.json' },
        { id: 'jaguar', title: 'Atari Jaguar', file: 'jaguar.json' },

        // Handhelds
        { id: '3ds', title: 'Nintendo 3DS', file: '3ds.json' },
        { id: 'nds', title: 'Nintendo DS', file: 'nds.json' },
        { id: 'psp', title: 'PSP', file: 'psp.json' },
        { id: 'gba', title: 'Game Boy Advance', file: 'gba.json' },
        { id: 'gbc', title: 'Game Boy Color', file: 'gbc.json' },
        { id: 'gb', title: 'Game Boy', file: 'gb.json' },
        { id: 'gamegear', title: 'Game Gear', file: 'gamegear.json' },
        { id: 'lynx', title: 'Atari Lynx', file: 'lynx.json' },
        { id: 'ngpc', title: 'Neo Geo Pocket Color', file: 'ngpc.json' },
        { id: 'wswanc', title: 'WonderSwan Color', file: 'wswanc.json' },

        // 16-bit / 32-bit 2D
        { id: 'sega32x', title: 'Sega 32X', file: 'sega32x.json' },
        { id: 'segacd', title: 'Sega CD', file: 'segacd.json' },
        { id: 'megadrive', title: 'Mega Drive / Genesis', file: 'megadrive.json' },
        { id: 'snes', title: 'Super Nintendo', file: 'snes.json' },
        { id: 'neogeo', title: 'Neo Geo', file: 'neogeo.json' },
        { id: 'neogeocd', title: 'Neo Geo CD', file: 'neogeocd.json' },
        { id: 'pcengine', title: 'PC Engine', file: 'pcengine.json' },
        { id: 'pcenginecd', title: 'PC Engine CD', file: 'pcenginecd.json' },
        { id: 'supergrafx', title: 'SuperGrafx', file: 'supergrafx.json' },

        // 8-bit Era
        { id: 'mastersystem', title: 'Master System', file: 'mastersystem.json' },
        { id: 'nes', title: 'NES (Nintendinho)', file: 'nes.json' },

        // Classics / Atari
        { id: 'atari7800', title: 'Atari 7800', file: 'atari7800.json' },
        { id: 'atari5200', title: 'Atari 5200', file: 'atari5200.json' },
        { id: 'atari2600', title: 'Atari 2600', file: 'atari2600.json' },
        { id: 'coleovision', title: 'ColecoVision', file: 'colecovision.json' },
        { id: 'vectrex', title: 'Vectrex', file: 'vectrex.json' },
        { id: 'sg1000', title: 'SG-1000', file: 'sg1000.json' },
        { id: 'virtualboy', title: 'Virtual Boy', file: 'virtualboy.json' },

        // Arcade & Others
        { id: 'arcade', title: 'Arcade Classics', file: 'arcade.json' },
        { id: 'mame', title: 'MAME', file: 'mame.json' },
        { id: 'fbneo', title: 'Final Burn Neo', file: 'fbneo.json' },
        { id: 'atomiswave', title: 'Atomiswave', file: 'atomiswave.json' },
        { id: 'naomi', title: 'Sega Naomi', file: 'naomi.json' },
        { id: 'naomi2', title: 'Sega Naomi 2', file: 'naomi2.json' },
        { id: 'model2', title: 'Sega Model 2', file: 'model2.json' },
        { id: 'model3', title: 'Sega Model 3', file: 'model3.json' },
        { id: 'triforce', title: 'Triforce', file: 'triforce.json' },
        { id: 'lightgun', title: 'Lightgun Games', file: 'lightgun.json' },
        { id: 'pinballfx3', title: 'Pinball FX3', file: 'pinballfx3.json' },

        // Regional / Mods / Misc
        { id: 'mastersystembr', title: 'Master System (PT-BR)', file: 'mastersystembr.json' },
        { id: 'megadrivebr', title: 'Mega Drive (PT-BR)', file: 'megadrivebr.json' },
        { id: 'n64br', title: 'Nintendo 64 (PT-BR)', file: 'n64br.json' },
        { id: 'snesbr', title: 'Super Nintendo (PT-BR)', file: 'snesbr.json' },
        { id: 'msx2', title: 'MSX 2', file: 'msx2.json' },
        { id: 'lutro', title: 'Lutro', file: 'lutro.json' },
        { id: 'sufami', title: 'Sufami Turbo', file: 'sufami.json' },
        { id: 'psx', title: 'PSX (Classics)', file: 'psx.json' }
    ];

    useEffect(() => {
        const fetchAllSystems = async () => {
            setIsLoading(true);
            const newData = {};

            const fetchSystem = async (sys) => {
                try {
                    let response = await fetch(`/sistemas/${sys.file}`);
                    if (!response.ok) {
                        throw new Error(`Failed to load ${sys.file}`);
                    }
                    const data = await response.json();
                    return data;
                } catch (error) {
                    try {
                        const res2 = await fetch(`sistemas/${sys.file}`);
                        if (res2.ok) return await res2.json();
                    } catch (e) { }

                    console.warn(`Could not load data for ${sys.id}`, error);
                    return [];
                }
            };

            await Promise.all(systemsConfig.map(async (sys) => {
                const data = await fetchSystem(sys);
                newData[sys.id] = data;
            }));

            const processedData = {};
            Object.keys(newData).forEach(key => {
                const list = Array.isArray(newData[key]) ? newData[key] : [];
                processedData[key] = list.map(item => ({
                    title: item.Nome || item.title,
                    image: item.imagem || item.image || item.Image,
                    video: item.video || item.Video,
                    oldPrice: item.oldPrice || "49,90",
                    price: item.price || "14,90"
                }));
            });

            setGamesData(processedData);
            setIsLoading(false);
        };

        fetchAllSystems();
    }, []);

    const getFilteredGames = (games) => {
        if (!searchTerm) return games;
        return games.filter(game =>
            game.title && game.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const categoriesToRender = systemsConfig
        .map(sys => ({
            id: sys.id,
            title: sys.title,
            games: getFilteredGames(gamesData[sys.id] || [])
        }))
        .filter(cat => cat.games.length > 0)
        .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory);

    // Pagination logic
    const visibleCategories = categoriesToRender.slice(0, visibleRows);
    const hasMoreRows = categoriesToRender.length > visibleRows;

    const handleLoadMore = () => {
        setVisibleRows(prev => prev + 3);
    };

    return (
        <section className="py-12 bg-white dark:bg-slate-950 transition-colors duration-300" id="games-list">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Catálogo de Jogos</h2>
                        <p className="text-gray-600 dark:text-gray-400">Explore nossa biblioteca completa por console.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar jogo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setVisibleRows(3); // Reset pagination on filter change
                            }}
                            className="px-4 py-2 rounded-full border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                        >
                            <option value="all">Todos os Consoles</option>
                            {systemsConfig.map(sys => (
                                <option key={sys.id} value={sys.id}>{sys.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : visibleCategories.length > 0 ? (
                    <>
                        {visibleCategories.map((category) => (
                            <GameRow
                                key={category.id}
                                title={category.title}
                                games={category.games}
                                onPlayVideo={openVideo}
                            />
                        ))}

                        {/* Load More Button */}
                        {hasMoreRows && (
                            <div className="mt-12 text-center">
                                <Button
                                    onClick={handleLoadMore}
                                    className="rounded-full px-8 py-3 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all transform hover:scale-105"
                                >
                                    Carregar Mais Consoles
                                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum jogo encontrado para sua busca.</p>
                    </div>
                )}



                {/* Video Modal */}
                {videoModal.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={closeVideo}>
                        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={closeVideo}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <video
                                src={videoModal.videoUrl}
                                controls
                                autoPlay
                                className="w-full h-full"
                            >
                                Seu navegador não suporta a reprodução de vídeo.
                            </video>
                        </div>
                    </div>
                )}

                {showViewAllLink && (
                    <div className="mt-12 text-center">
                        <Link to="/jogos" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-lg hover:underline underline-offset-4 group transition-all">
                            Ver todos os jogos
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ConsoleLists;
