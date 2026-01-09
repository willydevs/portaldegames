import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
    <div className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>
);

const FeaturesGrid = () => {
    const features = [
        {
            title: "Downloads Seguros",
            description: "Todos os arquivos são verificados e hospedados em servidores de alta velocidade e criptografados.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        },
        {
            title: "Acesso Imediato",
            description: "Receba seu acesso automaticamente por e-mail logo após a confirmação do pagamento.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        },
        {
            title: "Compatibilidade Total",
            description: "Jogos testados e otimizados para rodar perfeitamente no seu console ou PC.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        },
        {
            title: "Organização Impecável",
            description: "Títulos categorizados com capas, sinopses e metadados completos para sua coleção.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        },
        {
            title: "Suporte Especializado",
            description: "Equipe pronta para ajudar com instalação, configuração e dúvidas gerais.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        },
        {
            title: "Atualizações",
            description: "Novos jogos e melhorias no sistema GPBOX adicionados frequentemente.",
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        }
    ];

    return (
        <section className="py-20 bg-white" id="benefits">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher o Portal?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Uma experiência pensada para gamers exigentes que buscam qualidade e segurança.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesGrid;
