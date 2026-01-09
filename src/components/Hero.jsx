import React from 'react';
import Button from './ui/Button';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Blue Orb - Top Right */}
                <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow"></div>
                {/* Red Orb - Bottom Left */}
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-primary text-sm font-semibold mb-4 animate-fade-in-up">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                        <span>A Revolução dos Games Chegou</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight drop-shadow-sm">
                        Portal de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Games</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Sua fonte oficial do <span className="font-bold text-gray-800">GPBOX</span> e dos melhores lançamentos para PS4, PS5 e Xbox.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Button variant="primary" size="lg" className="shadow-blue-500/25 w-full sm:w-auto">
                            Explorar Catálogo
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            Conhecer o GPBOX
                        </Button>
                    </div>

                    <div className="pt-12 text-sm text-gray-400 font-medium flex items-center justify-center gap-8">
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Entrega Imediata
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Compra Segura
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
