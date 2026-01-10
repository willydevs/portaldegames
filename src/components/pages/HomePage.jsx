import React, { useEffect } from 'react';
import Hero from '../Hero';
import GPBoxProducts from '../GPBoxProducts';
import ConsoleLists from '../ConsoleLists';
import SystemsMarquee from '../SystemsMarquee';
import FeaturesGrid from '../FeaturesGrid';
import Testimonials from '../Testimonials';
import PlayboxProducts from '../PlayboxProducts';
import RagboxProducts from '../RagboxProducts';

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
            <Testimonials />
            {/* <PlayboxProducts /> */}
            <RagboxProducts />
        </>
    );
};

export default HomePage;
