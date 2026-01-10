import React, { useEffect } from 'react';

const TermosPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Termos de Uso</h1>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                <p>Última atualização: Janeiro 2026</p>

                <h3>1. Aceitação dos Termos</h3>
                <p>Ao acessar e usar o Portal de Games, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.</p>

                <h3>2. Uso do Serviço</h3>
                <p>Nossos serviços são destinados apenas para uso pessoal e não comercial. Você concorda em não distribuir, modificar, transmitir, reutilizar ou usar o conteúdo do site para fins públicos ou comerciais sem nossa permissão por escrito.</p>

                <h3>3. Propriedade Intelectual</h3>
                <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logotipos e códigos, é propriedade do Portal de Games ou de seus licenciadores e está protegido por leis de direitos autorais.</p>
                <div className="mt-2">
                    <a href="/denuncia" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Fazer uma denúncia</a>
                </div>

                <h3>4. Limitação de Responsabilidade</h3>
                <p>O Portal de Games não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar nossos serviços.</p>

                <h3>5. Alterações nos Termos</h3>
                <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. Recomendamos que você revise esta página periodicamente para quaisquer alterações.</p>

                <h3>6. Licença GNU GPL e Software Livre</h3>
                <p>
                    Nossos produtos podem incluir softwares licenciados sob a Licença Pública Geral GNU (GPL). O Portal de Games respeita e adere aos termos desta licença.
                    Informamos que:
                </p>
                <ul className="list-disc pl-5">
                    <li>O valor cobrado refere-se exclusivamente aos serviços de curadoria, configuração, otimização, suporte técnico e hardware (quando aplicável).</li>
                    <li>Não vendemos os softwares licenciados sob a GPL em si, que são de distribuição gratuita.</li>
                    <li>O código-fonte dos softwares GPL utilizados está disponível mediante solicitação ou nos repositórios oficiais dos respectivos projetos.</li>
                </ul>
                <p className="mt-4">Links oficiais dos projetos:</p>
                <ul className="list-disc pl-5">
                    <li><a href="https://github.com/batocera-linux/batocera.linux" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Batocera.linux (GitHub)</a></li>
                    <li><a href="https://github.com/libretro/RetroArch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">RetroArch (GitHub)</a></li>
                </ul>
            </div>
        </div>
    );
};

export default TermosPage;
