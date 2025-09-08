// src/pages/PrivacyPolicy.jsx
import React from 'react';
import '../assets/styles/PoliticaPrivacidade.css';

const PoliticaPrivacidade = () => {
    return (
        <div className="privacy-policy-container">
            <header className="policy-header">
                <h1>Política de Privacidade</h1>
                <p>A sua privacidade é importante para nós. É política da Freellaner respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar.</p>
            </header>
            
            <section className="policy-section">
                <h2>1. Coleta de Informações</h2>
                <p>Coletamos informações por meios justos e legais, com o seu conhecimento e consentimento. As informações que coletamos podem incluir:</p>
                <ul>
                    <li><strong>Informações de Identificação Pessoal</strong>: Nome, endereço de e-mail, número de telefone e outras informações que você nos fornece voluntariamente ao se registrar ou preencher formulários.</li>
                    <li><strong>Dados de Uso</strong>: Informações sobre como você interage com nosso site, como o tipo de navegador, sistema operacional, páginas que você visitou e o tempo gasto em cada uma delas.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>2. Uso das Informações</h2>
                <p>As informações que coletamos são usadas para:</p>
                <ul>
                    <li>Fornecer, operar e manter nosso site.</li>
                    <li>Melhorar, personalizar e expandir nossos serviços.</li>
                    <li>Entender e analisar como você usa nosso site.</li>
                    <li>Desenvolver novos produtos, serviços, recursos e funcionalidades.</li>
                    <li>Comunicar-nos com você para atendimento ao cliente, fornecer atualizações e para fins de marketing.</li>
                    <li>Enviar e-mails.</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>3. Proteção dos Dados</h2>
                <p>Protegemos os dados que armazenamos, tomando precauções de segurança para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados. Lembre-se, porém, que nenhum método de transmissão pela Internet é 100% seguro.</p>
            </section>

            <section className="policy-section">
                <h2>4. Cookies</h2>
                <p>Assim como a maioria dos sites profissionais, este site usa **cookies**. Usamos cookies para melhorar sua experiência e para entender como nosso site está sendo utilizado. Você pode recusar o uso de cookies nas configurações do seu navegador, mas isso pode afetar a funcionalidade de algumas partes do site.</p>
            </section>
            
            <section className="policy-section">
                <h2>5. Links para Outros Sites</h2>
                <p>Nosso site pode ter links para sites externos que não são operados por nós. Não temos controle sobre o conteúdo e as práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
            </section>
            
            <section className="policy-section">
                <h2>6. Consentimento</h2>
                <p>Ao usar nosso site, você consente com nossa Política de Privacidade e concorda com seus termos.</p>
                <p>Esta política é efetiva a partir de **08 de Setembro de 2025**. Reservamo-nos o direito de atualizá-la a qualquer momento.</p>
            </section>
        </div>
    );
};

export default PoliticaPrivacidade;