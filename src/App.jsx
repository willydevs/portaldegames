import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GPBoxProducts from './components/GPBoxProducts';
import ConsoleLists from './components/ConsoleLists';
import SystemsMarquee from './components/SystemsMarquee';
import FeaturesGrid from './components/FeaturesGrid';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import MouseGlow from './components/ui/MouseGlow';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-primary relative group">
      <MouseGlow />
      <Navbar />

      <main>
        <Hero />
        <GPBoxProducts />
        <ConsoleLists />
        <SystemsMarquee />
        <FeaturesGrid />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
