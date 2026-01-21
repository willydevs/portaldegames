import React from 'react';

const ProductCard = ({ product, onClick }) => {
    const { name, priceFrom, priceTo, badge, shortDescription, highlight, image } = product;
    const discount = Math.round(((priceFrom - priceTo) / priceFrom) * 100);

    return (
        <div
            onClick={() => onClick(product)}
            className={`
        relative group cursor-pointer rounded-2xl p-1 transition-all duration-300 hover:-translate-y-2
        ${highlight
                    ? 'bg-gradient-to-b from-yellow-500/20 to-orange-500/20 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)] border border-yellow-500/30'
                    : 'bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-white/10 hover:border-white/20 hover:shadow-xl'
                }
        backdrop-blur-sm
      `}
        >
            <div className="relative h-full flex flex-col rounded-xl bg-white/50 dark:bg-slate-900/50 p-5 overflow-hidden">
                {/* Badge */}
                <div className="absolute top-0 right-0 z-10">
                    <div className={`
             px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-bl-xl
             ${highlight ? 'bg-yellow-500 text-yellow-950' : 'bg-blue-600 text-white'}
           `}>
                        {badge}
                    </div>
                </div>

                {/* Image Placeholder if no real image yet */}
                <div className="h-40 mb-4 flex items-center justify-center bg-black/20 rounded-lg overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    {/* We will use a placeholder gradient or the actual image if available */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${highlight ? 'from-yellow-900/40 to-orange-900/40' : 'from-blue-900/40 to-purple-900/40'}`}></div>
                    <span className="relative z-10 text-4xl opacity-50 select-none">🎮</span>
                    {/* If you have images, uncomment below:
             <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover" /> 
             */}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                        {name}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                        {shortDescription}
                    </p>

                    {/* Price */}
                    <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-gray-400 line-through">R$ {priceFrom.toFixed(2).replace('.', ',')}</span>
                            <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
                                -{discount}% OFF
                            </span>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 dark:text-gray-400">por apenas</span>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    R$ {priceTo.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                            <button className={`
                  px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                  ${highlight
                                    ? 'bg-yellow-500 hover:bg-yellow-400 text-yellow-950'
                                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }
                `}>
                                Ver Detalhes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
