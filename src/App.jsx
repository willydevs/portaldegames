import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MouseGlow from './components/ui/MouseGlow';
import HomePage from './components/pages/HomePage';
import LojasPage from './components/pages/LojasPage';
import ScrollToLocation from './components/utils/ScrollToLocation';
import TermosPage from './components/pages/TermosPage';
import PrivacidadePage from './components/pages/PrivacidadePage';
import SobrePage from './components/pages/SobrePage';
import AjudaPage from './components/pages/AjudaPage';
import AbrirChamadoPage from './components/pages/AbrirChamadoPage';

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
    <Router>
      <ScrollToLocation />
      <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-100 selection:text-primary relative transition-colors duration-300">
        <MouseGlow />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lojas" element={<LojasPage />} />
            <Route path="/termos" element={<TermosPage />} />
            <Route path="/privacidade" element={<PrivacidadePage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/ajuda" element={<AjudaPage />} />
            <Route path="/ajuda/novo-chamado" element={<AbrirChamadoPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
