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
import PlayboxProducts from './components/PlayboxProducts';

function App() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-100 selection:text-primary relative transition-colors duration-300">
      <MouseGlow />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <GPBoxProducts />
        <ConsoleLists />
        <SystemsMarquee />
        <FeaturesGrid />
        <CTASection />
        <PlayboxProducts />
      </main>

      <Footer />
    </div>
  );
};

export default App;
