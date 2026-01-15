import React, { useEffect } from 'react';
import Hero from '../Hero';
import GPBoxProducts from '../GPBoxProducts';
import ConsoleLists from '../ConsoleLists';
import SystemsMarquee from '../SystemsMarquee';
import FeaturesGrid from '../FeaturesGrid';
import Testimonials from '../Testimonials';
import PlayboxProducts from '../PlayboxProducts';
import RagboxProducts from '../RagboxProducts';
import SEO from '../utils/SEO';

const HomePage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SEO
                title="GPBox e Ragbox - A Melhor Solução em Multijogos"
                description="Descubra o GPBox e Ragbox, sistemas completos de emulação. Jogos retrô, alta performance e entrega imediata. Transforme seu PC ou TV em um arcade!"
                keywords="gpbox, ragbox, multijogos, jogos retrô, emulação, ps2, ps1, super nintendo, arcade"
            />
            <Hero />
            <GPBoxProducts />
            <ConsoleLists showViewAllLink={true} />
            <SystemsMarquee />
            <FeaturesGrid />
            <Testimonials />
            {/* <PlayboxProducts /> */}
            <RagboxProducts />
        </>
    );
};

export default HomePage;
