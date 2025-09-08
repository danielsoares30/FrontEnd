// Ficheiro: src/pages/LandingPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. IMPORTE TODAS AS SUAS IMAGENS AQUI
// Certifique-se de que os nomes dos ficheiros correspondem aos que estão na sua pasta src/assets/images/
import logoImage from '../assets/images/landingpage/logo.png';
import bannerImage from '../assets/images/landingpage/banner.png';
import contratarImage from '../assets/images/landingpage/contratar.jpg';
import trabalharImage from '../assets/images/landingpage/homem-no-computador.webp';
import iconUpload from '../assets/images/landingpage/icones/Upload-removebg-preview.png';
import iconInbox from '../assets/images/landingpage/icones/image-removebg-preview.png';
import iconCheck from '../assets/images/landingpage/icones/marca-de-verificacao.png';
import iconMoney from '../assets/images/landingpage/icones/money-bag.png';

// Importe o seu ficheiro de estilo da landing page
import '../assets/styles/landing.css'; 

// Componente interno para as tags de tecnologia
const TechTag = ({ iconSrc, name }) => (
  <span className="tag-linguagem">
    <img src={iconSrc} alt={`Logo ${name}`} className="linguagem-logo" />
    <span className="tag-texto">{name}</span>
  </span>
);

const LandingPage = () => {
  // Estado para controlar o tema (claro/escuro)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Efeito para aplicar a classe do tema no body e salvar a preferência
  useEffect(() => {
    const body = document.body;
    const theme = isDarkMode ? 'dark' : 'light';
    body.className = isDarkMode ? 'dark-mode' : '';
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  // Efeito para gerir a animação de scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <>
      <header id="cabeçalho">
        <img id="logo" src={logoImage} alt="Logo Freellaner" />
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#sobre">Sobre nós</a></li>
        </ul>
        <label className="switch">
          <input 
            type="checkbox" 
            id="theme-toggle-input" 
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <span className="slider"></span>
        </label>
        <button className="Login">
          <Link to="/login">Login</Link>
        </button>
      </header> 

      <main>
        <section id="banner" className="reveal-on-scroll">
          <div className="banner-content">
            <h2 className="titulo1">Contrate ou preste <br />serviços. Tudo em <br /> um só lugar</h2>
            <h5>Encontre freelancers talentosos ou <br /> ganhe dinheiro com as suas habilidades <br /> com uma única conta.</h5>
            <div className="banner-buttons">
              <button className="serviços">
                <Link to="/cadastro">Explorar Serviços</Link>
              </button>
              <button className="btnlogin">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
          <img className="banner-image" src={bannerImage} alt="Ilustração de trabalho freelancer" />
        </section>

        <section className="cards-section">
            <div id="container1" className="reveal-on-scroll">
                <h4 id="titulo2">Eu quero contratar</h4>
                <h2 id="dev1">Desenvolvedor</h2>
                <h5 id="sub2">Encontre freelancers <br /> talentosos para o seu <br /> projeto em poucos cliques.</h5>
                <img src={contratarImage} alt="Contratante" />
            </div>
            
            <div id="container2" className="reveal-on-scroll">
                <h4 id="titulo3">Eu quero trabalhar como</h4>
                <h2 id="dev2">Freelancer</h2>
                <h5 id="sub3">Ganhe renda extra ou até <br /> a sua principal renda como <br />freelancer de programação</h5>
                <img src={trabalharImage} alt="Freelancer" />
            </div>
        </section>

        <section className="informações reveal-on-scroll">
            <h2 className="funciona">Como funciona?</h2>
            <div className="info-cards-container">
                <div id="card1">
                    <img src={iconUpload} alt="Ícone de upload" />
                    <h5 className="uploadh5">Publique ou ofereça <br /> um serviço</h5>
                </div>
                <div id="card2">
                    <img src={iconInbox} alt="Ícone de caixa de entrada" />
                    <h5 className="inboxh5">Receba propostas <br /> ou pedidos</h5>
                </div>
                <div id="card3">
                    <img src={iconCheck} alt="Ícone de verificação" />
                    <h5 className="checkh5">Negocie e inicie <br />o trabalho</h5>
                </div>
                <div id="card4">
                    <img src={iconMoney} alt="Ícone de dinheiro" />
                    <h5 className="moneyh5">Pague e receba <br />com segurança</h5>
                </div>
            </div>
        </section>

        <section className="oportunidades-section">
            <h2 id="oportunidades" className="reveal-on-scroll">Oportunidades</h2>
            <div id="vagas" className="reveal-on-scroll">
                <h3>Desenvolvedor FullStack</h3>
                <h5 className="salario">R$6.000,00 - R$7.000,00</h5>
                <h5 className="local">Remoto</h5>
                <div className="container-linguagens">
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" name="HTML" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" name="CSS" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" name="JS" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" name="React" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" name="Git" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" name="SQL" />
                </div>
            </div>
             <div id="vaga2" className="reveal-on-scroll">
                <h3>Desenvolvedor FrontEnd</h3>
                <h5 className="salario">R$3.500,00 - R$4.000,00</h5>
                <h5 className="local">Remoto</h5>
                <div className="container-linguagens">
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" name="HTML" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" name="CSS" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" name="JS" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" name="React" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" name="Git" />
                </div>
                </div>
                <div id="vaga3" className="reveal-on-scroll">
                <h3>Desenvolvedor BackEnd</h3>
                <h5 className="salario">R$4.500,00 - R$5000,00</h5>
                <h5 className="local">Remoto</h5>
                <div className="container-linguagens">
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" name="SQL" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" name="Java" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" name="Spring" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" name="AWS" />
                    <TechTag iconSrc="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" name="Git" />
                </div>
            </div>
        </section>

        <section className="faq-section reveal-on-scroll">
            <h2 className="section-title">Você ainda tem dúvidas?</h2>
            
            <div className="faq-card">
                <h3 className="faq-question">❓ 1. Preciso de duas contas para contratar e trabalhar?</h3>
                <p className="faq-answer">Não. Com apenas uma conta, você pode tanto contratar freelancers quanto oferecer os seus serviços. Basta alternar entre as funções no seu painel.</p>
            </div>

            <div className="faq-card">
                <h3 className="faq-question">❓ 2. Como funciona o pagamento?</h3>
                <p className="faq-answer">O pagamento é processado com segurança pela plataforma. O cliente paga antecipadamente, o valor fica retido e só é liberado ao freelancer após a entrega e aprovação do serviço.</p>
            </div>

            <div className="faq-card">
                <h3 className="faq-question">❓ 3. É gratuito criar uma conta?</h3>
                <p className="faq-answer">Sim! Criar a sua conta e publicar serviços ou projetos é totalmente gratuito. Você só paga (ou recebe) quando um serviço for contratado.</p>
            </div>
        </section>

        <section className="cta-section reveal-on-scroll">
            <h2 className="pronto">Pronto para começar?</h2>
            <h4 className="subpronto">Junte-se a uma comunidade de freelancers e contratantes que confiam numa plataforma simples e segura.</h4>
            <button className="conta"><Link to="/cadastro">Crie a sua conta gratuitamente</Link></button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-col footer-col-logo">
              <img id="logo" src={logoImage} alt="Logo Freellaner" />
              <p className="logo-description">Conectando freelancers e clientes de forma simples e segura</p>
            </div>
            <div className="footer-col">
              <h4>Quem Somos?</h4>
              <nav><ul>
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Políticas de privacidade</a></li>
                <li><a href="#">Termos de Serviço</a></li>
              </ul></nav>
            </div>
            {/* Adicione as outras colunas do footer aqui */}
          </div>
          <div className="footer-divider"></div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()}. Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
