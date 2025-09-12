// Ficheiro: src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.png'; // Verifique se o caminho do logo está correto
import '../assets/styles/footer.css'; // Vamos criar este arquivo de estilo a seguir

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Coluna 1: Logo e Social */}
          <div className="footer-column about">
            <Link to="/dashboard" className="footer-logo">
              <img src={logoImage} alt="Logo Freellaner" />
              <span>freellaner</span>
            </Link>
            <p className="footer-tagline">
              Conectando talentos a oportunidades, um projeto de cada vez.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Coluna 2: Links da Plataforma */}
          <div className="footer-column links">
            <h3>Plataforma</h3>
            <ul>
              <li><Link to="/dashboard/buscar-projetos">Encontrar Projetos</Link></li>
              <li><Link to="/dashboard/encontrar-freelancers">Encontrar Freelancers</Link></li>
              <li><Link to="#">Como Funciona</Link></li>
              <li><Link to="#">Sobre Nós</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Links de Suporte */}
          <div className="footer-column links">
            <h3>Suporte</h3>
            <ul>
              <li><Link to="#">Ajuda & FAQ</Link></li>
              <li><Link to="#">Fale Conosco</Link></li>
              <li><Link to="#">Termos de Serviço</Link></li>
              <li><Link to="#">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Newsletter */}
          <div className="footer-column newsletter">
            <h3>Fique por dentro</h3>
            <p>Receba as melhores vagas e novidades da plataforma.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Seu melhor e-mail" />
              <button type="submit">Inscrever</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} freellaner. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;