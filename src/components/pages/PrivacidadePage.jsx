import React, { useEffect } from 'react';

const PrivacidadePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Política de Privacidade</h1>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>Última atualização: Janeiro 2026</p>

                <h3>1. Coleta de Informações</h3>
                <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail e dados de pagamento ao realizar uma compra. Também podemos coletar dados de navegação anonimizados para melhorar nossos serviços.</p>

                <h3>2. Uso das Informações</h3>
                <p>Usamos as informações coletadas para processar transações, enviar atualizações sobre seus pedidos e fornecer suporte ao cliente. Não vendemos seus dados pessoais a terceiros.</p>

                <h3>3. Segurança de Dados</h3>
                <p>Implementamos medidas de segurança robustas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>

                <h3>4. Cookies</h3>
                <p>Utilizamos cookies para melhorar a experiência do usuário, lembrar preferências e analisar o tráfego do site. Você pode gerenciar suas preferências de cookies nas configurações do navegador.</p>

                <h3>5. Seus Direitos</h3>
                <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais armazenadas conosco. Entre em contato conosco para exercer esses direitos.</p>
            </div>
        </div>
    );
};

export default PrivacidadePage;
