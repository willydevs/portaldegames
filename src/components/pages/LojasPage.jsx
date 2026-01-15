
import React, { useEffect } from 'react';
import StoreCard from '../ui/StoreCard';
import GPBoxProducts from '../GPBoxProducts';
import RagboxProducts from '../RagboxProducts';
import PlayboxProducts from '../PlayboxProducts';
import GGBoxProducts from '../GGBoxProducts';
import SEO from '../utils/SEO';

// Import local images for store cards
import gpboxLogo from '../../assets/images/logo.png'; // Using main logo for GPBox
import ragboxLogo from '../../assets/images/empresas/ragbox.png';
import playboxLogo from '../../assets/images/empresas/playbox-reserva.webp';
import ggboxLogo from '../../assets/images/empresas/logo-ggbox-colored.png';
import fullstoreImg from '../../assets/images/empresas/fullstoregg.png';
import gameflixImg from '../../assets/images/empresas/gameflix-logo.png';

const LojasPage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stores = [
        {
            name: "GPBOX",
            description: "A melhor solução em multijogos para PC. Alta performance e centenas de sistemas configurados.",
            logo: gpboxLogo,
            link: "#gpbox",
            color: "blue"
        },
        {
            name: "RAGBOX",
            description: "Sistemas portáteis e para TV Box. Jogue seus clássicos favoritos em qualquer lugar.",
            logo: ragboxLogo,
            link: "#ragbox",
            color: "red"
        },
        {
            name: "PLAYBOX",
            description: "A evolução dos games. Sistemas completos com interface premium e suporte dedicado.",
            logo: playboxLogo,
            link: "#playbox",
            color: "purple"
        },
        {
            name: "GGBOX",
            description: "Sistemas para quem exige o máximo. Curadoria especial e performance extrema.",
            logo: ggboxLogo,
            link: "#ggbox",
            color: "orange"
        }
    ];

    const otherStores = [
        { name: "Full Store GG", logo: fullstoreImg, type: "Mobile / PC", verified: true },
        { name: "GameFlix", logo: gameflixImg, type: "Retro / PC", verified: true },
    ];

    return (
        <div className="pt-24 pb-20 bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <SEO
                title="Nossas Lojas - GPBox, Ragbox e Mais"
                description="Conheça todas as nossas lojas parceiras: GPBox, Ragbox e Playbox. Encontre a solução de emulação perfeita para você."
                keywords="comprar gpbox, comprar ragbox, loja multijogos, emuladores pc, sistema de jogos"
                url="/lojas"
            />
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Nossas Lojas</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore o ecossistema completo de soluções em games. Cada loja com sua especialidade, todas com a qualidade que você confia.
                    </p>
                </div>
            </div>

            {/* GPBox Section (Reused) */}
            <GPBoxProducts />

            {/* Ragbox Section (New) */}
            <RagboxProducts />

            {/* GGBox Section (New) */}
            <GGBoxProducts />

            {/* Playbox Section (Reused) */}
            <PlayboxProducts />

            {/* Other Stores Grid */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Outras Lojas Aprovadas</h2>
                        <p className="text-gray-600 dark:text-gray-400">Explore mais opções de parceiros oficiais.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                        {otherStores.map((store, idx) => (
                            <div key={idx} className="h-full w-full sm:w-[300px]">
                                <StoreCard {...store} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LojasPage;
