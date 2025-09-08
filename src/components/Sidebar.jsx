// Ficheiro: src/components/Sidebar.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoImage from '../assets/images/logo.png'; // Certifique-se de que a sua logo está neste caminho

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Link to="/dashboard" className="logo-container">
          <img src={logoImage} alt="Logo Freellaner" className="logo-image" />
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {/* Links de Gestão Pessoal */}
          <li><NavLink to="/dashboard" end><i className="fas fa-home"></i>Início</NavLink></li>
          
          {/* --- NOVOS LINKS ADICIONADOS AQUI --- */}
          <li className="nav-divider">Ações</li>
          <li><NavLink to="/dashboard/buscar-projetos"><i className="fas fa-briefcase"></i>Buscar Projetos</NavLink></li>
          <li><NavLink to="/dashboard/encontrar-freelancers"><i className="fas fa-search-dollar"></i>Encontrar Freelancer</NavLink></li>
          
          {/* Links de Relatórios e Configurações */}
          <li className="nav-divider">Gestão</li>
          <li><NavLink to="/dashboard/relatorios"><i className="fas fa-chart-pie"></i>Relatórios</NavLink></li>
          <li><NavLink to="/dashboard/transacoes"><i className="fas fa-exchange-alt"></i>Transações</NavLink></li>
          <li><NavLink to="/dashboard/perfil"><i className="fas fa-user-circle"></i>Perfil</NavLink></li>
          <li><NavLink to="/dashboard/configuracoes"><i className="fas fa-cogs"></i>Configurações</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
