import React from 'react';
import Button from './ui/Button';

const CTASection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 z-0"></div>

            {/* Decorative shapes */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="absolute -right-20 top-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute -left-20 top-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                    Pronto para elevar seu nível de jogo?
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Junte-se a milhares de gamers que já descobriram a melhor forma de jogar. Acesso imediato aos nossos sistemas e muito mais.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="primary" size="lg" className="shadow-xl shadow-blue-600/20 w-full sm:w-auto scale-110">
                        Obter Acesso Completo Agora
                    </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                    Satisfação garantida ou seu dinheiro de volta em até 7 dias.
                </p>
            </div>
        </section>
    );
};

export default CTASection;
