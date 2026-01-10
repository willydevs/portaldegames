import React, { useEffect } from 'react';
import Hero from '../Hero';
import GPBoxProducts from '../GPBoxProducts';
import ConsoleLists from '../ConsoleLists';
import SystemsMarquee from '../SystemsMarquee';
import FeaturesGrid from '../FeaturesGrid';
import CTASection from '../CTASection';
import PlayboxProducts from '../PlayboxProducts';

const HomePage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Hero />
            <GPBoxProducts />
            <ConsoleLists />
            <SystemsMarquee />
            <FeaturesGrid />
            <CTASection />
            <PlayboxProducts />
        </>
    );
};

export default HomePage;
