import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300">
            <button
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${isOpen ? 'text-primary' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-900 dark:text-white font-semibold text-lg">{question}</span>
                </div>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const AjudaPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const faqData = [
        {
            question: "Não estou conseguindo entrar em contato com o vendedor, o que fazer?",
            answer: (
                <>
                    <p className="mb-2">Caso não esteja conseguindo entrar em contato com o vendedor porque o mesmo não responde ou não forneceu os seus dados, fale com o suporte do Portal de Games para que possamos verificar o ocorrido e, assim, você ser atendido o mais breve possível.</p>
                    <p>Para isso, basta clicar no botão no final desta página para abrir um chamado.</p>
                </>
            )
        },
        {
            question: "Paguei o boleto e minha compra ainda não foi confirmada, como proceder?",
            answer: (
                <>
                    <p className="mb-2">Quando você faz uma compra por boleto, avisaremos você por e-mail sobre a confirmação do pagamento. O prazo de compensação bancária é de até 3 dias úteis.</p>
                    <p>Caso não tenha recebido este e-mail dentro do prazo, fale conosco abrindo um chamado abaixo.</p>
                </>
            )
        },
        {
            question: "Meu produto ainda não foi entregue, o que fazer?",
            answer: (
                <>
                    <p className="mb-2">Entre em contato diretamente com o suporte ao cliente do site em que você fez a compra (verifique seu e-mail de confirmação).</p>
                    <p>Caso não consiga contato ou não tenha recebido, clique no botão no fim da página e selecione "Abrir um Chamado".</p>
                </>
            )
        },
        {
            question: "Quero cancelar, trocar ou devolver meu pedido, o que devo fazer?",
            answer: (
                <>
                    <p className="mb-2">Questões relacionadas a cancelamentos, trocas ou devoluções devem ser tratadas diretamente com o vendedor ou suporte do produto.</p>
                    <p className="mb-2">O Portal de Games fornece a tecnologia e o hub para os vendedores. Nós podemos te ajudar caso você tenha algum problema com o pagamento ou se o vendedor não responder.</p>
                    <p>Você pode solicitar o reembolso abrindo um chamado através do botão abaixo, dessa forma realizaremos a intermediação.</p>
                </>
            )
        },
        {
            question: "Quanto tempo leva para o reembolso acusar na conta?",
            answer: (
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Cartão de crédito:</strong> Dependendo da operadora pode levar até 15 dias (ou vir na próxima fatura).</li>
                    <li><strong>Pix:</strong> Prazo máximo até 6 dias.</li>
                    <li><strong>Boleto:</strong> Prazo máximo 3 dias úteis (geralmente solicitaremos seus dados bancários).</li>
                </ul>
            )
        }
    ];

    return (
        <div className="relative min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16 transition-colors duration-300">
            {/* Abstract Background Elements (Smoky Effect Reuse) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-blue-100 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
                <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Suporte</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                        Central de Ajuda
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Tire suas dúvidas e resolva problemas com suas compras.
                    </p>
                </div>

                <div className="space-y-4 mb-16">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>

                {/* CTA Box */}
                <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        Não encontrou sua dúvida?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                        Se você teve algum problema com o pagamento, entrega ou precisa de suporte especializado, abra um chamado agora mesmo.
                    </p>
                    <Link to="/ajuda/novo-chamado">
                        <Button variant="primary" size="lg" className="shadow-blue-500/20">
                            Abrir um Chamado
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AjudaPage;
