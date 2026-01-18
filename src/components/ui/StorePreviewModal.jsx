import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import UserProfileModal from './UserProfileModal';

const VideoStory = ({ video, onClick }) => {
    const isInstagram = video.type === 'instagram';
    const videoId = video.id || video; // Fallback for legacy strings

    let thumbSrc = video.cover;
    if (!thumbSrc) {
        if (isInstagram) {
            // Placeholder/Gradient for Instagram since getting public thumb is hard without API
            thumbSrc = null;
        } else {
            thumbSrc = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    }

    return (
        <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black group shrink-0 w-[120px] md:w-[150px] snap-center cursor-pointer shadow-lg transform transition-transform hover:scale-105" onClick={onClick}>
            {thumbSrc ? (
                <img
                    src={thumbSrc}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
            ) : (
                // Gradient fallback for Instagram
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
                </div>
            )}
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
            {!isInstagram && (
                <div className="absolute top-2 left-0 w-full flex justify-center">
                    <span className="text-[10px] font-bold text-white shadow-black drop-shadow-md">0:15</span>
                </div>
            )}
        </div>
    );
};

const StorePreviewModal = ({ isOpen, onClose, store }) => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Reviews State
    const [reviews, setReviews] = useState([]); // Full list for history
    const [visibleCount, setVisibleCount] = useState(3);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    // Local User Comments State
    const [userComments, setUserComments] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [userName, setUserName] = useState('');
    const [userText, setUserText] = useState('');
    const [userSentiment, setUserSentiment] = useState('positivo');
    const [activeFilter, setActiveFilter] = useState('todos'); // 'todos', 'positivo', 'neutro', 'negativo'

    useEffect(() => {
        // Load user comments from LocalStorage on mount
        const saved = localStorage.getItem('portal_game_user_comments');
        if (saved) {
            try {
                setUserComments(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse user comments", e);
            }
        }
    }, []);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!userName.trim() || !userText.trim()) return;

        const newComment = {
            name: userName,
            text: userText,
            timestamp: new Date().toLocaleDateString(),
            classificação: 'Aguardando',
            originalSentiment: userSentiment
        };

        const updated = [newComment, ...userComments];
        setUserComments(updated);
        localStorage.setItem('portal_game_user_comments', JSON.stringify(updated));

        setUserName('');
        setUserText('');
        setUserSentiment('positivo');
        setShowCommentForm(false);
    };



    useEffect(() => {
        if (isOpen) {
            setReviewsLoading(true);
            fetch('/avaliacoes_classificado.json')
                .then(res => res.json())
                .then(data => {
                    // Shuffle reviews deterministically based on store name
                    const shuffled = [...data].sort((a, b) => {
                        const seed = store?.name?.length || 0;
                        const aVal = a.Nome.charCodeAt(0) + seed;
                        const bVal = b.Nome.charCodeAt(0) + seed;
                        return (aVal % 3) - (bVal % 3); // Simple pseudo-random shuffle
                    });

                    // Improved Shuffle using simple random sort for more variety if trusted
                    // trying a consistent shuffle based on store name hash
                    let currentIndex = data.length;
                    const seedStr = store?.name || 'default';
                    let seed = 0;
                    for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i);

                    const seededRandom = () => {
                        const x = Math.sin(seed++) * 10000;
                        return x - Math.floor(x);
                    };

                    const deterministicallyShuffled = [...data];
                    while (currentIndex != 0) {
                        let randomIndex = Math.floor(seededRandom() * currentIndex);
                        currentIndex--;
                        [deterministicallyShuffled[currentIndex], deterministicallyShuffled[randomIndex]] = [
                            deterministicallyShuffled[randomIndex], deterministicallyShuffled[currentIndex]];
                    }

                    setReviews(deterministicallyShuffled);
                    setReviewsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to load reviews:", err);
                    setReviewsLoading(false);
                });
        }
    }, [isOpen, store?.name]);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 3);
    };

    const handleUserClick = (userName) => {
        const userReviews = reviews.filter(r => r.Nome === userName);
        setSelectedUser({ name: userName, reviews: userReviews });
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
            : 'U';
    };

    const getSentimentColor = (classification) => {
        switch (classification?.toLowerCase()) {
            case 'positivo': return 'text-green-600 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
            case 'negativo': return 'text-red-600 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
            case 'aguardando': return 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
            default: return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
        }
    };

    // Data Processing: Filter -> Deduplicate -> Paginate
    const getProcessedReviews = () => {
        // 1. Filter by Sentiment
        const filtered = reviews.filter(review => {
            if (activeFilter === 'todos') return true;
            return review.classificação?.toLowerCase() === activeFilter;
        });

        // 2. Deduplicate by Name
        const seen = new Set();
        const unique = filtered.filter(item => {
            if (seen.has(item.Nome)) return false;
            seen.add(item.Nome);
            return true;
        });

        return unique;
    };

    const processedReviews = getProcessedReviews();
    const visibleReviews = processedReviews.slice(0, visibleCount);

    useEffect(() => {
        setVisibleCount(3);
    }, [activeFilter]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen || !store) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ zIndex: 9999 }}>
            <UserProfileModal
                isOpen={!!selectedUser}
                onClose={() => setSelectedUser(null)}
                userName={selectedUser?.name}
                userReviews={selectedUser?.reviews || []}
            />
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
                        {store.videos && store.videos.map((video, idx) => (
                            <VideoStory key={idx} video={video} onClick={() => setSelectedVideo(video)} />
                        ))}
                    </div>

                    <div className="text-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{store.sales}</h3>
                        <p className="text-gray-500 text-sm">produtos entregues com sucesso</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mb-8">
                        <Button variant="primary" fullWidth size="lg" onClick={() => store.url && window.open(store.url, '_blank')}>Acessar Loja</Button>
                        <Button variant="outline" fullWidth size="lg" onClick={() => { navigate('/jogos'); onClose(); }}>Ver mais jogos</Button>
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
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <h4 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                Avaliações da Comunidade
                                {reviewsLoading && <div className="text-xs text-gray-400 animate-pulse font-normal">Carregando...</div>}
                            </h4>

                            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 p-1 rounded-lg border border-gray-100 dark:border-slate-700">
                                <button
                                    onClick={() => setActiveFilter('todos')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${activeFilter === 'todos' ? 'bg-white dark:bg-slate-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    Todos
                                </button>
                                <button
                                    onClick={() => setActiveFilter('positivo')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeFilter === 'positivo' ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-sm ring-1 ring-green-200 dark:ring-green-800' : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full bg-green-500 ${activeFilter !== 'positivo' && 'opacity-50'}`}></div>
                                    Positivos
                                </button>
                                <button
                                    onClick={() => setActiveFilter('neutro')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeFilter === 'neutro' ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 shadow-sm ring-1 ring-yellow-200 dark:ring-yellow-800' : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full bg-yellow-500 ${activeFilter !== 'neutro' && 'opacity-50'}`}></div>
                                    Neutros
                                </button>
                                <button
                                    onClick={() => setActiveFilter('negativo')}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${activeFilter === 'negativo' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 shadow-sm ring-1 ring-red-200 dark:ring-red-800' : 'text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'}`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full bg-red-500 ${activeFilter !== 'negativo' && 'opacity-50'}`}></div>
                                    Negativos
                                </button>
                            </div>
                        </div>

                        {/* Display list: User Comments + Unique Global Reviews */}
                        <div className="space-y-4">
                            {/* User Local Comments (Always Visible) */}
                            {userComments.map((comment, idx) => (
                                <div key={`local-${idx}`} className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/20 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                                {getInitials(comment.name)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm text-gray-900 dark:text-white">
                                                    {comment.name}
                                                    <span className="ml-2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">Você</span>
                                                </div>
                                                <div className="text-[10px] text-gray-400">Agora</div>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getSentimentColor(comment.classificação)}`}>
                                            {comment.classificação}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                        "{comment.text}"
                                    </p>
                                </div>
                            ))}

                            {/* Global Reviews (Filtered & Paginated) */}
                            {visibleReviews.map((review, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800 transition-all hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                                                onClick={() => handleUserClick(review.Nome)}
                                                title="Ver perfil"
                                            >
                                                {getInitials(review.Nome)}
                                            </div>
                                            <div>
                                                <div
                                                    className="font-bold text-sm text-gray-900 dark:text-white cursor-pointer hover:text-blue-500 hover:underline transition-colors"
                                                    onClick={() => handleUserClick(review.Nome)}
                                                >
                                                    {review.Nome}
                                                </div>
                                                <div className="text-[10px] text-gray-400">{review.data}</div>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${getSentimentColor(review.classificação)}`}>
                                            {review.classificação || 'Neutro'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                                        "{review.comentário}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        {reviews.length === 0 && userComments.length === 0 && !reviewsLoading && (
                            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm italic">
                                Nenhuma avaliação encontrada ainda. Seja o primeiro!
                            </div>
                        )}

                        {visibleCount < processedReviews.length && (
                            <div className="mt-4 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors uppercase tracking-wide"
                                >
                                    Carregar mais avaliações
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Local Comment Form */}
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/20 transition-all">
                        {!showCommentForm ? (
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Sua opinião importa!</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Comprou conosco? <span
                                            className="text-blue-600 font-bold cursor-pointer hover:underline"
                                            onClick={() => setShowCommentForm(true)}
                                            title="Escrever avaliação"
                                        >
                                            Envie sua avaliação
                                        </span> para aparecer aqui.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleCommentSubmit} className="space-y-3 animate-fade-in">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        Escrever Avaliação
                                    </h4>
                                    <button
                                        type="button"
                                        onClick={() => setShowCommentForm(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Conte sua experiência com a loja..."
                                        value={userText}
                                        onChange={(e) => setUserText(e.target.value)}
                                        rows="2"
                                        className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <Button variant="primary" size="sm" fullWidth className="text-xs" type="submit">
                                    Publicar Avaliação
                                </Button>
                            </form>
                        )}
                    </div>

                </div>
            </div>

            {/* Fullscreen Video Modal (Layer 2) */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-hidden"
                    onClick={() => setSelectedVideo(null)}
                >
                    <button
                        onClick={() => setSelectedVideo(null)}
                        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    <div
                        className="w-full max-w-lg aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedVideo?.type === 'instagram' ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.instagram.com/p/${selectedVideo.id}/embed/`}
                                title="Instagram Story"
                                frameBorder="0"
                                scrolling="no"
                                allowTransparency="true"
                                allow="encrypted-media"
                                className="absolute inset-0 bg-white"
                            ></iframe>
                        ) : (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo?.id || selectedVideo}?autoplay=1&rel=0&modestbranding=1&playlist=${selectedVideo?.id || selectedVideo}&loop=1`}
                                title="Story Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StorePreviewModal;
