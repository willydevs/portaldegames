import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import emailjs from '@emailjs/browser';

const InputField = ({ label, type = "text", placeholder, required, name, value, onChange }) => (
    <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

const SelectField = ({ label, options, required, name, value, onChange }) => (
    <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none appearance-none"
            >
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

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        from_name: '',
        reply_to: '',
        nature_type: '',
        infringing_link: '',
        message: '',
        rights_holder_status: '',
        trademark_link: '',
        official_site_link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        const serviceId = 'service_4zz2jxd';
        const templateId = 'template_lt72c6q';
        const publicKey = '-2I_xWwgjXncVaevP';

        const templateParams = {
            from_name: formData.from_name,
            reply_to: formData.reply_to,
            nature_type: formData.nature_type,
            infringing_link: formData.infringing_link,
            message: formData.message,
            rights_holder_status: formData.rights_holder_status,
            trademark_link: formData.trademark_link,
            official_site_link: formData.official_site_link
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setStatus({ type: 'success', message: 'Denúncia recebida. Analisaremos as informações enviadas.' });
                setFormData({
                    from_name: '',
                    reply_to: '',
                    nature_type: '',
                    infringing_link: '',
                    message: '',
                    rights_holder_status: '',
                    trademark_link: '',
                    official_site_link: ''
                });
            }, (err) => {
                console.log('FAILED...', err);
                setStatus({ type: 'error', message: 'Falha ao enviar denúncia. Tente novamente.' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

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

                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-8 md:p-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-slate-800 pb-4">
                        Formulário de Denúncia de Direitos Autorais
                    </h3>

                    <InputField
                        label="Seu Nome"
                        required
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Seu E-mail para Contato"
                        type="email"
                        required
                        name="reply_to"
                        value={formData.reply_to}
                        onChange={handleChange}
                    />

                    <SelectField
                        label="Qual é a natureza da denúncia?"
                        required
                        name="nature_type"
                        value={formData.nature_type}
                        onChange={handleChange}
                        options={[
                            "Uso não autorizado de imagem",
                            "Uso não autorizado de texto",
                            "Violação de marca registrada",
                            "Outro tipo de violação"
                        ]}
                    />

                    <InputField
                        label="Link para o Conteúdo Infrator"
                        placeholder="https://..."
                        required
                        name="infringing_link"
                        value={formData.infringing_link}
                        onChange={handleChange}
                    />

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Descrição Detalhada da Violação <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors outline-none h-32 resize-y"
                            required
                        ></textarea>
                    </div>

                    <SelectField
                        label="Você é o detentor dos direitos autorais ou está denunciando em nome do detentor?"
                        required
                        name="rights_holder_status"
                        value={formData.rights_holder_status}
                        onChange={handleChange}
                        options={[
                            "Sou o detentor dos direitos",
                            "Estou denunciando em nome do detentor",
                            "Outro"
                        ]}
                    />

                    <InputField
                        label="Link do Registro da Marca (se aplicável)"
                        name="trademark_link"
                        value={formData.trademark_link}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Link do Site Oficial do Detentor (se aplicável)"
                        name="official_site_link"
                        value={formData.official_site_link}
                        onChange={handleChange}
                    />

                    {status.message && (
                        <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === 'success'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <div className="mt-8">
                        <Button
                            variant="primary"
                            fullWidth
                            size="lg"
                            className="shadow-xl shadow-red-600/20 bg-red-600 hover:bg-red-700 border-red-600"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Denúncia'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default DenunciaPage;
