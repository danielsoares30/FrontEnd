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
          <span className="logo-text">freellaner</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" end>
              <i className="fas fa-home"></i>
              <span>Início</span>
            </NavLink>
          </li>

          <li className="nav-section-title">Ações</li>
          
          <li>
            <NavLink to="/dashboard/buscar-projetos">
              <i className="fas fa-briefcase"></i>
              <span>Buscar Projetos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/encontrar-freelancers">
              <i className="fas fa-search-dollar"></i>
              <span>Encontrar Freelancer</span>
            </NavLink>
          </li>

          <li className="nav-section-title">Gestão</li>

          <li>
            <NavLink to="/dashboard/relatorios">
              <i className="fas fa-chart-pie"></i>
              <span>Relatórios</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/transacoes">
              <i className="fas fa-exchange-alt"></i>
              <span>Transações</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/perfil">
              <i className="fas fa-user-circle"></i>
              <span>Perfil</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/configuracoes">
              <i className="fas fa-cogs"></i>
              <span>Configurações</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;