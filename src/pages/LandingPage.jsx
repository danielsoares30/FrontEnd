import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'; // <-- A CORREÇÃO ESTÁ AQUI

// 1. IMPORTE TODAS AS SUAS IMAGENS AQUI
import logoImage from '../assets/images/landingpage/logo.png';
import bannerImage from '../assets/images/landingpage/banner.png';
import contratarImage from '../assets/images/landingpage/contratar.jpg';
import trabalharImage from '../assets/images/landingpage/homem-no-computador.webp';
import iconUpload from '../assets/images/landingpage/icones/Upload-removebg-preview.png';
import iconInbox from '../assets/images/landingpage/icones/image-removebg-preview.png';
import iconCheck from '../assets/images/landingpage/icones/marca-de-verificacao.png';
import iconMoney from '../assets/images/landingpage/icones/money-bag.png';

// Importe o seu ficheiro de estilo
import '../assets/styles/landing.css'; 

// Componente interno para as tags de tecnologia
const TechTag = ({ iconSrc, name }) => (
  <span className="tag-linguagem">
    <img src={iconSrc} alt={`Logo ${name}`} className="linguagem-logo" />
    <span className="tag-texto">{name}</span>
  </span>
);

// Componente para o Card com efeito 3D
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`choice-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s linear',
      }}
      animate={{
        transform: `perspective(1000px) rotateY(${coords.x}deg) rotateX(${-coords.y}deg) scale(1.05)`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="shine-effect" style={{
        opacity: isHovering ? 1 : 0,
        background: `radial-gradient(circle at ${coords.x * 5 + 50}% ${coords.y * 5 + 50}%, rgba(255, 255, 255, 0.15), transparent 40%)`,
        transition: 'opacity 0.2s',
      }}></div>
      {children}
    </motion.div>
  );
};


const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };


  return (
    <>
      <header id="cabeçalho" className={scrolled ? 'scrolled' : ''}>
        <Link to="/"><img id="logo" src={logoImage} alt="Logo Freellaner" /></Link>
        <nav>
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre nós</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <label className="switch">
            <input type="checkbox" id="theme-toggle-input" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
            <span className="slider"></span>
          </label>
          <button className="Login"><Link to="/login">Login</Link></button>
        </div>
      </header> 

      <main>
        <motion.section 
          id="banner"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="banner-content">
            <motion.h2 variants={itemVariants} className="titulo1">Contrate ou preste serviços. <span>Tudo em um só lugar</span></motion.h2>
            <motion.h5 variants={itemVariants}>Encontre freelancers talentosos ou ganhe dinheiro com as suas habilidades com uma única conta.</motion.h5>
            <motion.div variants={itemVariants} className="banner-buttons">
              <button className="serviços"><Link to="/cadastro">Explorar Serviços</Link></button>
              <button className="btnlogin"><Link to="/login">Login</Link></button>
            </motion.div>
          </div>
          <motion.img variants={itemVariants} className="banner-image" src={bannerImage} alt="Ilustração de trabalho freelancer" />
        </motion.section>

        <section className="cards-section">
          <TiltCard>
            <h4>Eu quero contratar</h4>
            <h2 className="dev-title">Desenvolvedor</h2>
            <h5>Encontre freelancers talentosos para o seu projeto em poucos cliques.</h5>
            <img src={contratarImage} alt="Contratante" />
          </TiltCard>
          
          <TiltCard>
            <h4>Eu quero trabalhar como</h4>
            <h2 className="dev-title">Freelancer</h2>
            <h5>Ganhe renda extra ou até a sua principal renda como freelancer de programação.</h5>
            <img src={trabalharImage} alt="Freelancer" />
          </TiltCard>
        </section>

        <motion.section 
          className="informações"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="section-title">Como funciona?</h2>
          <div className="info-cards-container">
            <motion.div variants={itemVariants} className="info-card">
              <img src={iconUpload} alt="Ícone de upload" />
              <h5 className="info-card-title">Publique ou ofereça um serviço</h5>
            </motion.div>
            <motion.div variants={itemVariants} className="info-card">
              <img src={iconInbox} alt="Ícone de caixa de entrada" />
              <h5 className="info-card-title">Receba propostas ou pedidos</h5>
            </motion.div>
            <motion.div variants={itemVariants} className="info-card">
              <img src={iconCheck} alt="Ícone de verificação" />
              <h5 className="info-card-title">Negocie e inicie o trabalho</h5>
            </motion.div>
            <motion.div variants={itemVariants} className="info-card">
              <img src={iconMoney} alt="Ícone de dinheiro" />
              <h5 className="info-card-title">Pague e receba com segurança</h5>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="oportunidades-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="section-title">Oportunidades Populares</h2>
          <motion.div variants={itemVariants} className="vaga-card">
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
          </motion.div>
          <motion.div variants={itemVariants} className="vaga-card">
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
          </motion.div>
           <motion.div variants={itemVariants} className="vaga-card">
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
          </motion.div>
        </motion.section>

        <motion.section 
          className="faq-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="section-title">Você ainda tem dúvidas?</h2>
          <motion.div variants={itemVariants} className="faq-card">
            <h3 className="faq-question">❓ Preciso de duas contas para contratar e trabalhar?</h3>
            <p className="faq-answer">Não. Com apenas uma conta, você pode tanto contratar freelancers quanto oferecer os seus serviços. Basta alternar entre as funções no seu painel.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="faq-card">
            <h3 className="faq-question">❓ Como funciona o pagamento?</h3>
            <p className="faq-answer">O pagamento é processado com segurança pela plataforma. O cliente paga antecipadamente, o valor fica retido e só é liberado ao freelancer após a entrega e aprovação do serviço.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="faq-card">
            <h3 className="faq-question">❓ Como funciona o pagamento?</h3>
            <p className="faq-answer">O pagamento é processado com segurança pela plataforma. O cliente paga antecipadamente, o valor fica retido e só é liberado ao freelancer após a entrega e aprovação do serviço.</p>
          </motion.div>
        </motion.section>

        <motion.section 
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="cta-title">Pronto para começar?</motion.h2>
          <motion.h4 variants={itemVariants} className="cta-subtitle">Junte-se a uma comunidade de freelancers e contratantes que confiam numa plataforma simples e segura.</motion.h4>
          <motion.div variants={itemVariants}>
            <button className="cta-button"><Link to="/cadastro">Crie sua conta gratuitamente</Link></button>
          </motion.div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-col footer-col-logo">
              <img id="logo-footer" src={logoImage} alt="Logo Freellaner" />
              <p className="logo-description">Conectando freelancers e clientes de forma simples e segura</p>
            </div>
            <div className="footer-col">
              <h4>Empresa</h4>
              <nav><ul>
                <li><a href="#">Sobre nós</a></li>
                <li><a href="#">Políticas de privacidade</a></li>
                <li><a href="#">Termos de Serviço</a></li>
              </ul></nav>
            </div>
             <div className="footer-col">
              <h4>Suporte</h4>
              <nav><ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Fale Conosco</a></li>
              </ul></nav>
            </div>
          </div>
          <div className="pacman-divider-container">
            <div className="pacman"></div>
            <div className="pacman-dots"></div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Freellaner. Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;