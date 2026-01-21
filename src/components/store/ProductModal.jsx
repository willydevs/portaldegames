import React, { useEffect } from 'react';

const ProductModal = ({ product, onClose }) => {
    useEffect(() => {
        // Prevent scrolling body when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!product) return null;

    const { name, priceFrom, priceTo, badge, description, features, highlight, ctaLink } = product;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">

                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden absolute top-4 right-4 z-20 p-2 bg-black/20 rounded-full text-white backdrop-blur-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Left Side: Visuals */}
                <div className={`
          w-full md:w-2/5 relative min-h-[200px] md:min-h-full flex items-center justify-center p-8
          ${highlight ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20' : 'bg-gradient-to-br from-blue-900/20 to-purple-900/20'}
        `}>
                    {/* Close Button Desktop */}
                    <button
                        onClick={onClose}
                        className="hidden md:block absolute top-4 left-4 z-20 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        <span className="sr-only">Voltar</span>
                    </button>


                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">🎮</div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            {name}
                        </h2>
                        <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur border border-white/20 dark:text-white">
                            {badge}
                        </div>
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-3/5 p-8 flex flex-col max-h-[85vh] overflow-y-auto">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sobre este pacote</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="mb-8 flex-1">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">O que está incluído</h3>
                        <ul className="space-y-3">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                                    <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${highlight ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                                        ✓
                                    </span>
                                    <span className="text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Footer / CTA */}
                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <span className="block text-sm text-gray-400 line-through">De R$ {priceFrom.toFixed(2).replace('.', ',')}</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm text-gray-500">por</span>
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        R$ {priceTo.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>

                            <button className={`
                        w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0
                        ${highlight
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:brightness-110'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:brightness-110'
                                }
                    `}>
                                COMPRAR AGORA
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-4">
                            Pagamento seguro • Acesso imediato • Garantia de 7 dias
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
