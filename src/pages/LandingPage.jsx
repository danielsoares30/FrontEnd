import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Imagens principais (você pode mantê-las ou substituir por links também)
import logoImage from '../assets/images/landingpage/logo.png';
import bannerImage from '../assets/images/landingpage/banner.png';
import contratarImage from '../assets/images/landingpage/contratar.jpg';
import trabalharImage from '../assets/images/landingpage/homem-no-computador.webp';

// Ícones para a seção 'Como Funciona'
import iconUpload from '../assets/images/landingpage/icones/Upload-removebg-preview.png';
import iconInbox from '../assets/images/landingpage/icones/image-removebg-preview.png';
import iconCheck from '../assets/images/landingpage/icones/marca-de-verificacao.png';
import iconMoney from '../assets/images/landingpage/icones/money-bag.png';

// Ícones para a seção de depoimentos (AGORA COM LINKS)
const depoimento1 = 'https://i.ibb.co/bF9Fh3D/ana.jpg';
const depoimento2 = 'https://i.ibb.co/pW1Q6g6/carlos.jpg';
const depoimento3 = 'https://i.ibb.co/d7z1y1J/julia.jpg';

// Importe o seu ficheiro de estilo
import '../assets/styles/landing.css'; 

// Ícones em formato SVG (NOVOS COMPONENTES)
const FlexibilidadeIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM17.2071 9.79289C17.5976 9.40237 17.5976 8.76921 17.2071 8.37868C16.8166 7.98816 16.1834 7.98816 15.7929 8.37868L12 12.1716L12 6C12 5.44772 11.5523 5 11 5C10.4477 5 10 5.44772 10 6L10 12.1716L6.20711 8.37868C5.81658 7.98816 5.18342 7.98816 4.79289 8.37868C4.40237 8.76921 4.40237 9.40237 4.79289 9.79289L10.5858 15.5858C10.9763 15.9763 11.6095 15.9763 12 15.5858L17.2071 9.79289ZM12 18.0001L15 15.0001H9L12 18.0001Z" fill="currentColor"/>
    </svg>
);

const SegurancaIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5V11C3 16.5 6.8 20.2 12 23C17.2 20.2 21 16.5 21 11V5L12 1ZM12 11.22C12 14 10.32 15.34 8.75 16.27C7.18 17.2 5.6 18.13 5 18.42V7.48L12 3.5L19 7.48V18.42C18.4 18.13 16.82 17.2 15.25 16.27C13.68 15.34 12 14 12 11.22Z" fill="currentColor"/>
    </svg>
);

const ComunidadeIcon = () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 13C10.66 13 9.39 12.39 8.5 11.5L7 13C8.16 14.28 9.93 15 12 15C14.07 15 15.84 14.28 17 13L15.5 11.5C14.61 12.39 13.34 13 12 13ZM12 8.5C10.62 8.5 9.5 9.62 9.5 11C9.5 12.38 10.62 13.5 12 13.5C13.38 13.5 14.5 12.38 14.5 11C14.5 9.62 13.38 8.5 12 8.5Z" fill="currentColor"/>
    </svg>
);


// Componente para a Section (novo)
const Section = ({ id, title, children, hasBackground }) => (
  <motion.section
    id={id}
    className={`section-container ${hasBackground ? 'has-background' : ''}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }}
  >
    {title && <h2 className="section-title">{title}</h2>}
    {children}
  </motion.section>
);

// Componente para a TechTag
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
        transform: `perspective(1000px) rotateY(${coords.x}deg) rotateX(${-coords.y}deg) scale(${isHovering ? 1.05 : 1})`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className="shine-effect"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${coords.x * 5 + 50}% ${coords.y * 5 + 50}%, rgba(255, 255, 255, 0.15), transparent 40%)`,
          transition: 'opacity 0.2s',
        }}
      ></div>
      {children}
    </motion.div>
  );
};

// Componente para o Card de Vaga (novo)
const JobCard = ({ title, salary, location, techIcons }) => (
  <motion.div className="vaga-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
    <h3>{title}</h3>
    <h5 className="salario">{salary}</h5>
    <h5 className="local">{location}</h5>
    <div className="container-linguagens">
      {techIcons.map((tech, index) => (
        <TechTag key={index} iconSrc={tech.iconSrc} name={tech.name} />
      ))}
    </div>
  </motion.div>
);

// Componente para o Card de Depoimento
const TestimonialCard = ({ quote, name, role, avatar }) => (
  <motion.div
    className="testimonial-card"
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">
      <img src={avatar} alt={`Avatar de ${name}`} className="testimonial-avatar" />
      <div>
        <h6 className="testimonial-name">{name}</h6>
        <span className="testimonial-role">{role}</span>
      </div>
    </div>
  </motion.div>
);

// Componente para o Card de Feature (CORRIGIDO PARA USAR SVG)
const FeatureCard = ({ icon: IconComponent, title, description }) => (
  <motion.div
    className="feature-card"
    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
  >
    <div className="feature-icon-wrapper">
      <IconComponent />
    </div>
    <h4 className="feature-title">{title}</h4>
    <p className="feature-description">{description}</p>
  </motion.div>
);

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
      staggerChildren: 0.2, // Atraso de 0.2s entre cada item
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Inicia 30px abaixo e invisível
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

  return (
    <>
      <header id="cabeçalho" className={scrolled ? 'scrolled' : ''}>
        <Link to="/">
          <img id="logo" src={logoImage} alt="Logo Freellaner" />
        </Link>
        <nav>
          <ul>
            <li><a href="#sobre">Sobre nós</a></li>
            <li><a href="#faq">FAQ</a></li>
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
            <motion.h2 variants={itemVariants} className="titulo1">
              Contrate ou preste serviços. <span className="gradient-text">Tudo em um só lugar</span>
            </motion.h2>
            <motion.h5 variants={itemVariants}>
              Encontre freelancers talentosos ou ganhe dinheiro com suas habilidades com uma única conta.
            </motion.h5>
            <motion.div variants={itemVariants} className="banner-buttons">
              <button className="serviços"><Link to="/cadastro">Explorar Serviços</Link></button>
              <button className="btnlogin"><Link to="/login">Login</Link></button>
            </motion.div>
          </div>
          <motion.img variants={itemVariants} className="banner-image" src={bannerImage} alt="Ilustração de trabalho freelancer" />
        </motion.section>

        <Section id="sobre" title="Junte-se à nossa comunidade" hasBackground>
          <div className="cards-section">
            <TiltCard>
              <div className="card-info">
                <h4>Eu quero contratar</h4>
                <h2 className="dev-title">Desenvolvedor</h2>
                <h5>Encontre freelancers talentosos para o seu projeto em poucos cliques.</h5>
              </div>
              <img src={contratarImage} alt="Contratante" />
            </TiltCard>
            <TiltCard>
              <div className="card-info">
                <h4>Eu quero trabalhar como</h4>
                <h2 className="dev-title">Freelancer</h2>
                <h5>Ganhe renda extra ou até a sua principal renda como freelancer de programação.</h5>
              </div>
              <img src={trabalharImage} alt="Freelancer" />
            </TiltCard>
          </div>
        </Section>
        
        <Section id="features" title="Por que nos escolher?">
          <motion.div className="features-container" variants={containerVariants}>
            <FeatureCard
              icon={FlexibilidadeIcon}
              title="Flexibilidade Total"
              description="Escolha projetos que se encaixam na sua agenda e trabalhe de onde quiser. Para contratantes, adapte o serviço às suas necessidades."
            />
            <FeatureCard
              icon={SegurancaIcon}
              title="Segurança Garantida"
              description="Nossa plataforma processa os pagamentos com segurança, garantindo que o freelancer receba e o cliente tenha o serviço entregue."
            />
            <FeatureCard
              icon={ComunidadeIcon}
              title="Comunidade Ativa"
              description="Junte-se a uma rede de profissionais e clientes. Encontre oportunidades, colabore e receba suporte da nossa comunidade."
            />
          </motion.div>
        </Section>

        <Section id="como-funciona" title="Como funciona?">
          <motion.div className="info-cards-container" variants={containerVariants}>
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
          </motion.div>
        </Section>

        <Section id="oportunidades" title="Oportunidades Populares">
          <motion.div className="oportunidades-container" variants={containerVariants}>
            <JobCard
              title="Desenvolvedor FullStack"
              salary="R$6.000,00 - R$7.000,00"
              location="Remoto"
              techIcons={[
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "CSS" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JS" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", name: "React" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", name: "Git" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", name: "SQL" },
              ]}
            />
            <JobCard
              title="Desenvolvedor FrontEnd"
              salary="R$3.500,00 - R$4.000,00"
              location="Remoto"
              techIcons={[
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "CSS" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JS" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", name: "React" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", name: "Git" },
              ]}
            />
            <JobCard
              title="Desenvolvedor Back-End"
              salary="R$5.000,00 - R$6.500,00"
              location="Remoto"
              techIcons={[
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", name: "Node.js" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg", name: "Express" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", name: "MongoDB" },
                { iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", name: "Python" },
              ]}
            />
          </motion.div>
        </Section>
        
        <Section id="depoimentos" title="O que dizem sobre nós?" hasBackground>
          <motion.div className="testimonials-container" variants={containerVariants}>
            <TestimonialCard
              quote="Encontrei o freelancer perfeito para o meu projeto em apenas 2 dias. A plataforma é intuitiva e o pagamento seguro me deixou tranquilo."
              name="Ana Pimentel"
              role="Fundadora da TechSolve"
              avatar={depoimento1}
            />
            <TestimonialCard
              quote="Consegui meu primeiro projeto como freelancer e a experiência foi incrível. A comunicação com o cliente foi fácil e recebi o pagamento no prazo."
              name="Carlos Rocha"
              role="Desenvolvedor Freelancer"
              avatar={depoimento2}
            />
            <TestimonialCard
              quote="Precisava de um site rápido e com um design único. A Freellaner conectou-me a uma designer que superou minhas expectativas. Recomendo!"
              name="Julia Santos"
              role="Empreendedora"
              avatar={depoimento3}
            />
          </motion.div>
        </Section>

        <Section id="faq" title="Você ainda tem dúvidas?">
          <motion.div className="faq-container" variants={containerVariants}>
            <motion.div variants={itemVariants} className="faq-card">
              <h3 className="faq-question">❓ Preciso de duas contas para contratar e trabalhar?</h3>
              <p className="faq-answer">
                Não. Com apenas uma conta, você pode tanto contratar freelancers quanto oferecer os seus serviços. Basta alternar entre as funções no seu painel.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="faq-card">
              <h3 className="faq-question">❓ Como funciona o pagamento?</h3>
              <p className="faq-answer">
                O pagamento é processado com segurança pela plataforma. O cliente paga antecipadamente, o valor fica retido e só é liberado ao freelancer após a entrega e aprovação do serviço.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="faq-card">
              <h3 className="faq-question">❓ A plataforma cobra alguma taxa?</h3>
              <p className="faq-answer">
                Sim, a plataforma cobra uma pequena taxa de serviço para garantir a segurança das transações, oferecer suporte e manter o serviço funcionando. A taxa é aplicada apenas sobre o valor do serviço concluído.
              </p>
            </motion.div>
          </motion.div>
        </Section>

        <Section id="cta" title="">
          <div className="cta-content">
            <h2 className="cta-title">Pronto para começar?</h2>
            <h4 className="cta-subtitle">
              Junte-se a uma comunidade de freelancers e contratantes que confiam numa plataforma simples e segura.
            </h4>
            <div className="cta-button-wrapper">
              <Link to="/cadastro">
                <button className="cta-button">Crie sua conta gratuitamente</button>
              </Link>
            </div>
          </div>
        </Section>
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
              <nav>
                <ul>
                  <li><a href="#">Sobre nós</a></li>
                  <li><a href="#">Políticas de privacidade</a></li>
                  <li><a href="#">Termos de Serviço</a></li>
                </ul>
              </nav>
            </div>
            <div className="footer-col">
              <h4>Suporte</h4>
              <nav>
                <ul>
                  <li><a href="#">Central de Ajuda</a></li>
                  <li><a href="#">Fale Conosco</a></li>
                </ul>
              </nav>
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