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

const AbrirChamadoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [agreed, setAgreed] = useState(false);

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-20 transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[800px] h-[800px] bg-blue-100 dark:bg-blue-900/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
                <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-purple-100 dark:bg-purple-900/10 rounded-full mix-blend-multiply filter blur-[120px] opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Abrir Chamado
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Comprei Produto Digital
                    </p>
                </div>

                <form className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 md:p-10">

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-2">
                        Seus dados de compra
                    </h3>

                    <InputField label="Nome Completo" required />
                    <InputField label="E-mail usado na compra" type="email" required />
                    <InputField label="Telefone usado na compra" type="tel" required />
                    <InputField label="CPF/CNPJ usado para a compra" required />

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-6 border-b border-gray-100 dark:border-slate-800 pb-2">
                        Sobre sua compra
                    </h3>

                    <InputField label="Qual número do pedido da compra?" required placeholder="Ex: 00334003" />
                    <p className="text-xs text- gray-500 dark:text-gray-500 -mt-4 mb-6 ml-1">0 de 10 máx. de caracteres</p>

                    <InputField label="Qual o nome do produto que você comprou?" required />

                    <SelectField
                        label="Qual opção descreve melhor seu problema?"
                        required
                        options={[
                            "Não recebi o acesso do produto",
                            "Preciso de ajuda com o cancelamento",
                            "Outros"
                        ]}
                    />

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Como podemos lhe ajudar? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none h-32 resize-y"
                            required
                        ></textarea>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Nos conte mais detalhes sobre sua compra e o que você precisa.</p>
                    </div>

                    <div className="mb-8">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                <strong>Consentir *</strong><br />
                                Eu concordo com a Política de Privacidade e que entendo que o Portal de Games não é o vendedor do produto (apenas plataforma de tecnologia/intermediação).
                            </span>
                        </label>
                    </div>

                    <Button variant="primary" fullWidth size="lg" className="shadow-xl shadow-blue-600/20" disabled={!agreed}>
                        Enviar Solicitação
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default AbrirChamadoPage;
