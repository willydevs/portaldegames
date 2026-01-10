import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const InputField = ({ label, type = "text", placeholder, required }) => (
    <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const SelectField = ({ label, options, required }) => (
    <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none appearance-none">
                <option value="">Selecione uma opção</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
        </div>
    </div>
);

const DenunciaPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] bg-red-100 dark:bg-red-900/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
                <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-orange-100 dark:bg-orange-900/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Denunciar Conteúdo no Portal de Games
                    </h1>
                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-4">
                        <p>
                            As nossas políticas de conteúdo e de produtos são aplicáveis em qualquer lugar, e também seguimos processos para remover ou restringir o acesso a conteúdo com base nas leis locais. Esta página ajuda você a denunciar conteúdos que gostaria de remover dos nossos serviços de acordo com as nossas políticas ou com a legislação aplicável.
                        </p>
                        <p>
                            Você também pode consultar nosso centro de suporte para questões não jurídicas relacionadas aos nossos Termos de Serviço ou às políticas de conteúdo e produtos.
                        </p>
                        <p>
                            Entendemos que os padrões legais variam bastante de país para país. Um conteúdo que viole uma lei em uma determinada região pode ser legal em outra. Normalmente, removemos ou restringimos o acesso a esse conteúdo apenas na região onde ele é considerado ilegal. No entanto, quando o conteúdo viola as nossas políticas internas ou os Termos de Serviço do Portal de Games, nós geralmente removemos ou restringimos o acesso globalmente.
                        </p>
                        <p>
                            Você pode denunciar um conteúdo tanto por motivos jurídicos quanto por violação das nossas políticas internas, mas cada denúncia precisa ser feita separadamente. <strong>Importante:</strong> denunciar conteúdo por violação das nossas políticas não substitui a denúncia por motivos jurídicos e vice-versa.
                        </p>
                    </div>
                </div>

                <form className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-slate-800 pb-4">
                        Formulário de Denúncia de Direitos Autorais
                    </h3>

                    <InputField label="Seu Nome" required />
                    <InputField label="Seu E-mail para Contato" type="email" required />

                    <SelectField
                        label="Qual é a natureza da denúncia?"
                        required
                        options={[
                            "Uso não autorizado de imagem",
                            "Uso não autorizado de texto",
                            "Violação de marca registrada",
                            "Outro tipo de violação"
                        ]}
                    />

                    <InputField label="Link para o Conteúdo Infrator" placeholder="https://..." required />

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Descrição Detalhada da Violação <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none h-32 resize-y"
                            required
                        ></textarea>
                    </div>

                    <SelectField
                        label="Você é o detentor dos direitos autorais ou está denunciando em nome do detentor?"
                        required
                        options={[
                            "Sou o detentor dos direitos",
                            "Estou denunciando em nome do detentor",
                            "Outro"
                        ]}
                    />

                    <InputField label="Link do Registro da Marca (se aplicável)" />
                    <InputField label="Link do Site Oficial do Detentor (se aplicável)" />

                    <div className="mt-8">
                        <Button variant="primary" fullWidth size="lg" className="shadow-xl shadow-red-600/20 bg-red-600 hover:bg-red-700 border-red-600">
                            Enviar Denúncia
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DenunciaPage;
