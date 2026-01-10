import React from 'react';
import Button from './ui/Button';

// Importing partner images
import playboxImg from '../assets/images/empresas/playbox-reserva.webp';
import ragboxImg from '../assets/images/empresas/ragbox.png';
import fullstoreImg from '../assets/images/empresas/fullstoregg.png';
import gameflixImg from '../assets/images/empresas/gameflix-logo.png';

const PartnerCard = ({ title, image, link }) => (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
        <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <div className="p-4 flex-1 flex flex-col">
            <h4 className="font-bold text-gray-900 mb-2 truncate text-center">{title}</h4>
            <div className="mt-auto">
                <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button variant="outline" size="sm" fullWidth className="text-sm">
                        Acessar Site
                    </Button>
                </a>
            </div>
        </div>
    </div>
);

const Footer = () => {
    const partners = [
        { title: "Playbox", image: playboxImg, link: "https://sacplaybox.com.br" },
        { title: "Ragbox", image: ragboxImg, link: "https://ragbox.app.br" },
        { title: "Full Store GG", image: fullstoreImg, link: "https://fullstoregg.com.br" },
        { title: "GameFlix", image: gameflixImg, link: "https://gameflix.app.br" },
    ];

    return (
        <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-900 pt-16 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">

                {/* Partners Section */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Nossos Parceiros / Projetos</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {partners.map((partner, idx) => (
                            <PartnerCard key={idx} {...partner} />
                        ))}
                    </div>
                </div>

                {/* Security / Trust Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left transition-colors duration-300">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-500 shrink-0">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Downloads Seguros e Confiáveis</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-lg">
                                Nossa plataforma utiliza criptografia de ponta para garantir que cada arquivo esteja livre de ameaças. Baixe com tranquilidade.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <Button variant="primary" size="lg" className="shadow-lg shadow-green-900/10 bg-green-600 hover:bg-green-700">
                            Começar Download
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            100% Seguro & Livre de Vírus
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-200 dark:border-slate-900 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; 2026 Portal de Games. Todos os direitos reservados.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contato</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
