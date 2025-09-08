// Ficheiro: src/components/Header.jsx

import React from 'react';

// 1. O Header agora recebe 'userName' como uma propriedade (prop)
const Header = ({ nome_completo, onToggleTheme, theme }) => {

  return (
    <header className="main-header">
      <div className="header-left">
        {/* 2. EXIBE O NOME DO UTILIZADOR COM O EMOJI */}
        <h2>Olá, {nome_completo}! 👋</h2>
        <p>Bem-vindo de volta ao seu painel.</p>
      </div>
      <div className="header-right">
        <button className="theme-toggle-button" onClick={onToggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;