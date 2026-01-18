import React from 'react';
import Button from './Button';

const StoreCard = ({ name, logo, type, verified, url }) => (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-slate-800 flex flex-col items-center p-6 text-center group h-full">
        <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4 border border-gray-100 dark:border-slate-700">
            <img src={logo} alt={name} className="w-full h-full object-contain" />
            {verified && (
                <div className="absolute -bottom-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1 shadow-sm">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    Verificada
                </div>
            )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-6">{type}</span>

        <div className="mt-auto w-full">
            <Button variant="outline" fullWidth onClick={() => url && window.open(url, '_blank')}>
                Acessar Loja
            </Button>
        </div>
    </div>
);

export default StoreCard;
