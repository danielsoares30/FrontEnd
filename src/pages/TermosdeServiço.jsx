// src/pages/TermsOfService.jsx
import React from 'react';
import '../assets/styles/TermosdeServiço.css';

const TermsOfService = () => {
    return (
        <div className="terms-of-service-container">
            <header className="terms-header">
                <h1>Termos de Serviço</h1>
                <p>Bem-vindo(a) ao **[Nome do Seu Site/Empresa]**! Ao acessar e usar este site, você concorda em cumprir e se vincular aos seguintes Termos de Serviço.</p>
            </header>
            
            <section className="terms-section">
                <h2>1. Uso do Site</h2>
                <p>O conteúdo das páginas deste site é para seu uso geral e informação. Ele está sujeito a alterações sem aviso prévio. O uso de qualquer informação ou material neste site é inteiramente por sua conta e risco.</p>
            </section>

            <section className="terms-section">
                <h2>2. Propriedade Intelectual</h2>
                <p>Este site contém material que é de nossa propriedade ou licenciado para nós, como design, layout, gráficos e código. A reprodução é proibida, exceto em conformidade com o aviso de direitos autorais.</p>
            </section>

            <section className="terms-section">
                <h2>3. Contas de Usuário</h2>
                <p>Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta. Você concorda em nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.</p>
            </section>
            
            <section className="terms-section">
                <h2>4. Conduta do Usuário</h2>
                <p>Você concorda em não utilizar o site para realizar atividades ilegais, publicar conteúdo ofensivo ou enviar spam. Qualquer tentativa de interferir no funcionamento do site também é proibida.</p>
            </section>

            <section className="terms-section">
                <h2>5. Limitação de Responsabilidade</h2>
                <p>O **[Nome do Seu Site/Empresa]** não garante a precisão ou adequação das informações contidas neste site. Na máxima extensão permitida por lei, não seremos responsáveis por quaisquer danos diretos ou indiretos decorrentes do uso ou da incapacidade de usar o nosso site.</p>
            </section>
            
            <section className="terms-section">
                <h2>6. Encerramento de Conta</h2>
                <p>Reservamos o direito de encerrar ou suspender sua conta e acesso ao site, a nosso exclusivo critério, por qualquer motivo, incluindo, sem limitação, a violação destes Termos de Serviço.</p>
            </section>

            <section className="terms-section">
                <h2>7. Alterações nos Termos</h2>
                <p>Reservamos o direito de revisar e alterar estes Termos de Serviço a qualquer momento. É sua responsabilidade verificar esta página periodicamente para se manter atualizado.</p>
            </section>

            <section className="terms-section">
                <h2>8. Contato</h2>
                <p>Se você tiver alguma dúvida sobre estes Termos de Serviço, por favor, entre em contato conosco através de **[Seu Endereço de E-mail ou Formulário de Contato]**.</p>
                <p>Estes termos são efetivos a partir de **09 de Setembro de 2025**.</p>
            </section>
        </div>
    );
};

export default TermsOfService;