import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SobrePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                    Sobre o Portal de Games
                </h1>

                <div className="space-y-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                    <p>
                        O <strong>Portal de Games</strong> foi criado para organizar e facilitar o acesso a diferentes experiências de jogos em um único ambiente.
                    </p>
                    <p>
                        Aqui, reunimos sites multijogos parceiros e também a oferta de alguns jogos avulsos, permitindo que cada usuário escolha a opção que melhor se encaixa no seu perfil, de forma simples, transparente e segura.
                    </p>
                    <p>
                        Atuamos como um postal de divulgação, organização e acesso, conectando jogadores a sistemas e plataformas independentes, cada um com suas próprias características, regras e catálogos.
                    </p>
                    <p>
                        Nosso compromisso é com a clareza das informações, o respeito ao usuário e a boa experiência, para que você saiba exatamente onde está entrando e o que está adquirindo.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                        🔒 Transparência e responsabilidade
                    </h2>
                    <p>
                        Cada portal ou sistema apresentado possui sua própria operação, políticas e condições de uso. <br />
                        O Portal de Games não interfere no funcionamento interno das plataformas parceiras, mas se preocupa em selecionar e apresentar opções confiáveis, sempre deixando claro quando o acesso ocorre em ambiente externo.
                    </p>
                    <p>
                        Sempre que houver venda direta de jogos pelo Portal de Games, isso será informado de forma objetiva, com as condições claramente apresentadas antes da finalização.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                        🤝 Uma experiência pensada para você
                    </h2>
                    <p>
                        Sabemos que nem todo jogador é especialista — e está tudo bem.
                    </p>
                    <p>
                        Por isso, buscamos manter uma comunicação acessível, sem termos complicados, e oferecer um ambiente onde você possa explorar, comparar e escolher com tranquilidade.
                    </p>
                    <p>
                        Seja você iniciante ou experiente, nosso papel é facilitar o caminho, não complicar.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">
                        📬 Precisa de ajuda?
                    </h2>
                    <p>
                        Caso tenha dúvidas sobre algum portal, jogo ou funcionamento do site, nossa equipe está disponível para orientar e esclarecer sempre que possível.
                    </p>
                    <p>
                        Estamos aqui para ajudar você a jogar com mais confiança.
                    </p>
                    <div className="mt-6">
                        <Link to="/ajuda" className="text-primary font-bold hover:underline">
                            Precisa de ajuda? Entre em contato
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SobrePage;
