import React, { useState } from 'react';

const Testimonials = () => {
    // Helper to get initials
    const getInitials = (name) => {
        const names = name.split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`;
        }
        return names[0][0];
    };

    const testimonials = [
        {
            name: "Lucas Andrade",
            quote: "Gostei da ideia do portal. Dá pra comparar vários sistemas de jogos sem ficar pulando de site em site.",
            verified: true
        },
        {
            name: "Marina Torres",
            quote: "Bem organizado e fácil de entender. Achei legal ter tanto portais multijogos quanto jogos avulsos.",
            verified: false
        },
        {
            name: "Rafael Nogueira",
            quote: "Entrei sem saber qual sistema escolher e o portal ajudou bastante. Experiência simples e direta.",
            verified: true
        },
        {
            name: "Camila Rocha",
            quote: "Não sou gamer experiente e consegui navegar sem dificuldade. As informações são bem claras.",
            verified: false
        },
        {
            name: "Bruno Almeida",
            quote: "Boa proposta. Centralizar vários portais em um só lugar facilita muito.",
            verified: true
        },
        {
            name: "Eduardo Pires",
            quote: "Achei interessante poder conhecer diferentes sistemas antes de decidir onde jogar.",
            verified: false
        },
        {
            name: "Felipe Martins",
            quote: "O Portal de Games deixa tudo bem explicado. Dá pra entender quando você está indo para um site parceiro e quando é compra direta.",
            verified: true
        },
        {
            name: "Juliana Costa",
            quote: "Gostei da transparência. Não tenta empurrar nada, você escolhe o que faz mais sentido.",
            verified: false
        },
        {
            name: "André Figueiredo",
            quote: "Uso como referência pra conhecer novos portais de jogos. Cumpre bem a proposta.",
            verified: true
        },
        {
            name: "Thiago Ribeiro",
            quote: "Curti a ideia de um hub de jogos. Bem melhor do que sair procurando cada portal separadamente.",
            verified: true
        },
        {
            name: "Paulo Henrique",
            quote: "Portal simples, direto e sem enrolação. Entra, escolhe e joga.",
            verified: false
        },
        {
            name: "Renata Lopes",
            quote: "Boa opção tanto pra quem já joga quanto pra quem tá começando agora.",
            verified: true
        },
        {
            name: "Daniel Moreira",
            quote: "As informações são claras sobre como funciona cada portal. Isso passa mais segurança.",
            verified: true
        },
        {
            name: "Patrícia Azevedo",
            quote: "Gostei da forma como o site explica que cada sistema tem suas próprias regras. Transparente.",
            verified: false
        },
        {
            name: "Gustavo Lima",
            quote: "Não cria falsas expectativas. Mostra o que é o portal e pronto.",
            verified: true
        }
    ];

    const testimonials2 = [
        {
            name: "Lucas Ferreira",
            quote: "Achei fantástico! Resolve o problema de ter que configurar tudo do zero.",
            verified: true
        },
        {
            name: "Mariana Costa",
            quote: "Serviço de primeira qualidade, recomendo demais.",
            verified: false
        },
        {
            name: "Pedro Alves",
            quote: "Simplesmente o melhor hub de jogos que já vi.",
            verified: true
        },
        {
            name: "Carla Nunes",
            quote: "Nostalgia pura, me senti criança de novo jogando Mario.",
            verified: false
        },
        {
            name: "Rodrigo Santos",
            quote: "Muito fácil de usar, até quem não entende de emulador consegue.",
            verified: true
        },
        {
            name: "Ana Clara",
            quote: "Os jogos rodam super bem, sem travamentos.",
            verified: false
        },
        {
            name: "João Vitor",
            quote: "Suporte excelente, me ajudaram com todas as dúvidas.",
            verified: true
        },
        {
            name: "Fernanda Lima",
            quote: "Vale cada centavo, a biblioteca de jogos é imensa.",
            verified: true
        }
    ];

    const [isPaused, setIsPaused] = useState(false);

    const TestimonialCard = ({ testimonial }) => (
        <div className="w-[350px] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between shrink-0">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                            {getInitials(testimonial.name)}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                            {testimonial.verified && (
                                <svg className="w-5 h-5 text-blue-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="flex text-yellow-400 gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                    "{testimonial.quote}"
                </p>
            </div>
        </div>
    );

    return (
        <section className="py-24 bg-gray-50 dark:bg-slate-950 overflow-hidden" id="testimonials">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    O que dizem sobre o Portal
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A opinião de quem já utilizou nosso hub para encontrar seu próximo jogo favorito.
                </p>
            </div>

            <div
                className="relative w-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Container */}
                <div className="flex w-max">
                    {/* First wrapper */}
                    <div
                        className="flex gap-6 px-3 animate-marquee"
                        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                        {testimonials.map((testimonial, idx) => (
                            <TestimonialCard key={`t1-${idx}`} testimonial={testimonial} />
                        ))}
                    </div>

                    {/* Second wrapper (Duplicate for infinite scroll) */}
                    <div
                        className="flex gap-6 px-3 animate-marquee"
                        aria-hidden="true"
                        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                        {testimonials.map((testimonial, idx) => (
                            <TestimonialCard key={`t2-${idx}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Second Marquee Section (Reverse) */}
            <div
                className="relative w-full mt-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Container */}
                <div className="flex w-max">
                    {/* First wrapper */}
                    <div
                        className="flex gap-6 px-3 animate-marquee-reverse"
                        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                        {testimonials2.map((testimonial, idx) => (
                            <TestimonialCard key={`t3-${idx}`} testimonial={testimonial} />
                        ))}
                    </div>

                    {/* Second wrapper (Duplicate for infinite scroll) */}
                    <div
                        className="flex gap-6 px-3 animate-marquee-reverse"
                        aria-hidden="true"
                        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                    >
                        {testimonials2.map((testimonial, idx) => (
                            <TestimonialCard key={`t4-${idx}`} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
