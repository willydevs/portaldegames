import React, { useState, useEffect } from 'react';
import Button from './Button';

const VideoStory = ({ videoId, cover }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black group shrink-0 w-[120px] md:w-[150px] snap-center cursor-pointer shadow-lg" onClick={() => setIsPlaying(true)}>
            {!isPlaying ? (
                <>
                    <img
                        src={cover || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-2 left-0 w-full flex justify-center">
                        <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">0:15</span>
                    </div>

                </>
            ) : (
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            )}
        </div>
    );
};

const CommentItem = ({ avatar, name, text, time }) => (
    <div className="flex gap-3 mb-4 last:mb-0">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
            <div className="flex items-center gap-2 mb-0.5">
                <span className="font-bold text-sm text-gray-900 dark:text-white">{name}</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs">&bull; {time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{text}</p>
            <div className="flex items-center gap-3 mt-1.5">
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Curtir
                </button>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs font-medium flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
            </div>
        </div>
    </div>
);


const StorePreviewModal = ({ isOpen, onClose, store }) => {
    if (!isOpen || !store) return null;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Dynamic Time Helper
    const getTimeAgo = (timestamp) => {
        if (!timestamp) return "Recentemente";
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (Number.isNaN(seconds)) return "Recentemente";

        if (seconds < 60) return "Agora mesmo";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min atrás`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} h atrás`;
        return Math.floor(hours / 24) + " dias atrás";
    };

    // State for auto-updating times
    const [_, setTick] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    // Initialize mock comments with persistent timestamps relative to a fixed start time
    const [mockComments] = useState(() => {
        let baseTime = localStorage.getItem('portal_mock_base_time');
        if (!baseTime) {
            baseTime = Date.now().toString();
            localStorage.setItem('portal_mock_base_time', baseTime);
        }
        const base = parseInt(baseTime, 10);

        return [
            {
                name: "Lucas Almeida",
                timestamp: base - 120000, // 2 mins before base
                text: "Ótimos preços e chaves entregues instantaneamente! Recomendo demais.",
                avatar: "https://i.pravatar.cc/150?u=lucas"
            },
            {
                name: "Mariana Costa",
                timestamp: base - 300000, // 5 mins before base
                text: "Facilidade total para comprar! Experiência muito boa e segura.",
                avatar: "https://i.pravatar.cc/150?u=mariana"
            },
            {
                name: "João Santos",
                timestamp: base - 600000, // 10 mins before base
                text: "Incrível variedade de jogos em um só lugar. Adorei a GPBOX!",
                avatar: "https://i.pravatar.cc/150?u=joao"
            }
        ];
    });

    const [userComments, setUserComments] = useState([]);
    const [userName, setUserName] = useState('');
    const [userText, setUserText] = useState('');

    useEffect(() => {
        const savedComments = localStorage.getItem('portal_user_comments');
        if (savedComments) {
            try {
                const parsed = JSON.parse(savedComments);
                // Migration: Ensure all comments have a timestamp
                const migrated = parsed.map(c => ({
                    ...c,
                    timestamp: c.timestamp || Date.now()
                }));
                setUserComments(migrated);
            } catch (e) {
                console.error("Failed to parse comments", e);
            }
        }
    }, []);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!userName.trim() || !userText.trim()) return;

        const newComment = {
            name: userName,
            text: userText,
            timestamp: Date.now(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random&color=fff`
        };

        const updatedComments = [newComment, ...userComments];
        setUserComments(updatedComments);
        localStorage.setItem('portal_user_comments', JSON.stringify(updatedComments));
        setUserText('');
    };

    const allComments = [...userComments, ...mockComments].map(c => ({
        ...c,
        time: getTimeAgo(c.timestamp)
    }));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ zIndex: 9999 }}>
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg md:max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">

                {/* Header */}
                <div className="p-6 pb-2 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full p-0.5">
                                <img src={store.logo} alt={store.name} className="w-full h-full object-contain rounded-full" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{store.name}</h2>
                                {store.verified && (
                                    <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-4-3.99-4-.485 0-.96.084-1.4.238C14.45 2.375 13.08 1.5 11.5 1.5c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.71-4 3.99 0 .485.084.96.238 1.4C1.375 9.55.5 10.92.5 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 4 3.99 4 .485 0 .96-.084 1.4-.238C8.55 22.625 9.92 23.5 11.5 23.5c1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.71 4-3.99 0-.485-.084-.96-.238-1.4C21.625 15.45 22.5 14.08 22.5 12.5zM9.04 17.5l-4.5-4.5 1.42-1.42 3.08 3.08 8.08-8.08 1.42 1.42-9.5 9.5z"></path>
                                    </svg>
                                )}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Vendido por <span className="text-blue-600 dark:text-blue-400 font-medium">Portal de Games</span>
                            </div>
                            <div className="text-xs font-bold text-green-600 dark:text-green-500 mt-1">
                                {store.sales}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pt-2">

                    {/* Stories Section */}
                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6 snap-x md:justify-center">
                        {store.videos && store.videos.map((videoId, idx) => (
                            <VideoStory key={idx} videoId={videoId} />
                        ))}
                    </div>

                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{store.sales}</h3>
                        <p className="text-gray-500 text-sm">produtos entregues com sucesso</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mb-8">
                        <Button variant="primary" fullWidth size="lg">Acessar Loja</Button>
                        <Button variant="outline" fullWidth size="lg">Ver mais jogos</Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-6 mb-8 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800 pb-8">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                            Entrega Imediata
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            Compra Segura
                        </div>
                    </div>


                    {/* Comments */}
                    <div className="mb-8">
                        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-4">Avaliações Recentes</h4>
                        {allComments.map((comment, idx) => (
                            <CommentItem key={idx} {...comment} />
                        ))}
                    </div>

                    {/* Add Comment Form */}
                    <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-gray-100 dark:border-slate-700/50">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            Deixe seu comentário
                        </h4>
                        <form onSubmit={handleCommentSubmit} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                required
                            />
                            <textarea
                                placeholder="O que você achou da loja?"
                                value={userText}
                                onChange={(e) => setUserText(e.target.value)}
                                rows="2"
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                                required
                            ></textarea>
                            <Button variant="primary" size="sm" fullWidth className="text-xs">
                                Enviar Comentário
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StorePreviewModal;
