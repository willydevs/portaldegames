import React from 'react';
import Button from './ui/Button';

const ProductCard = ({ title, oldPrice, price, description, features, recommended, isBestSeller, image }) => (
    <div className={`relative bg-white rounded-2xl p-6 md:p-8 flex flex-col h-full border transition-all duration-300 ${isBestSeller ? 'border-primary shadow-lg ring-1 ring-primary transform scale-105 z-10' : 'border-gray-100 shadow-soft hover:shadow-card hover:-translate-y-1'}`}>
        {isBestSeller && (
            <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider z-20">
                Mais Vendido
            </div>
        )}

        {/* Product Image */}
        <div className="w-full aspect-[4/5] mb-6 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
            <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tight">{title}</h3>

        <div className="mb-4">
            <span className="text-gray-400 line-through text-sm font-medium mr-2">R$ {oldPrice}</span>
            <span className="text-3xl font-bold text-primary">R$ {price}</span>
            <span className="ml-2 inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Vitalício</span>
        </div>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-grow">
            {description}
        </p>

        <ul className="space-y-3 mb-8">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                    <svg className="w-5 h-5 text-primary mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    {feature}
                </li>
            ))}
        </ul>

        <Button variant={isBestSeller ? 'primary' : 'outline'} fullWidth className={isBestSeller ? 'shadow-lg shadow-blue-600/20' : ''}>
            Comprar Agora
        </Button>
    </div>
);

const GPBoxProducts = () => {
    const products = [
        {
            title: "Standard",
            oldPrice: "67,00",
            price: "50,00",
            image: "/products/standard.webp",
            description: "Base completa do sistema: este é o ponto de partida para quem quer jogar sem complicação. Milhares de jogos clássicos, ocupando cerca de 70 GB.",
            features: [
                "Ideal para computadores simples",
                "Reviva grandes títulos clássicos"
            ]
        },
        {
            title: "Pack Adicional",
            oldPrice: "67,00",
            price: "40,00",
            image: "/products/adicional.jpg",
            description: "Expanda o sistema com novos consoles e plataformas. Adiciona suporte a PSP, PS2, PS3, PS4, PS5, Xbox 360, Wii U, Switch e outros.",
            features: [
                "Requer o pack STANDARD instalado",
                "Consoles modernos e emuladores avançados"
            ]
        },
        {
            title: "Atualizações",
            oldPrice: "60,00",
            price: "40,00",
            image: "/products/update.webp",
            description: "Conteúdo adicional distribuído ao longo do tempo, somando mais de 20 TB de arquivos entre jogos, melhorias e novos títulos.",
            features: [
                "Mantenha o sistema renovado",
                "Turbine sua coleção"
            ]
        },
        {
            title: "Pack PC Completo",
            oldPrice: "184,00",
            price: "100,00",
            image: "/products/pc-completo.webp",
            description: "Tudo que nossa plataforma tem de melhor em um único pacote por um preço especial.",
            features: [
                "1x Standard",
                "1x Pack Adicional",
                "1x Pack de Atualizações",
                "Economia máxima"
            ],
            isBestSeller: true
        },
        {
            title: "Pack Completo",
            oldPrice: "214,00",
            price: "120,00",
            image: "/products/pack-completo.webp",
            description: "Versão definitiva. Inclui todo o conteúdo de PC mais a versão Mobile para Android.",
            features: [
                "1x Standard, Adicional e Atualizações",
                "1x GPBOX Mobile",
                "Jogue no PC e Android"
            ]
        },
        {
            title: "Premium Mobile",
            oldPrice: "50,00",
            price: "30,00",
            image: "/products/android.webp",
            description: "Celular / TV Box Android. Execute jogos clássicos diretamente em dispositivos Android 7.0.3 ou superior.",
            features: [
                "Leve e Otimizado",
                "Compatível com TV Box"
            ]
        }
    ];

    return (
        <section className="py-20 bg-gray-50" id="products">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Escolha seu Plano GPBOX</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Transforme seu PC ou celular em uma central de jogos definitiva.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 items-stretch">
                    {products.map((product, idx) => (
                        <ProductCard key={idx} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GPBoxProducts;
