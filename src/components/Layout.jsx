// Ficheiro: src/components/Layout.jsx

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import { useAuth } from '../hooks/useAuth.js'; 
import '../assets/styles/style.css'; 

const Layout = () => {
  const { user } = useAuth(); // Pega os dados do utilizador

  // Para depuração: Veja no console o que está dentro do objeto 'user'
  useEffect(() => {
    console.log("Utilizador no Layout:", user);
  }, [user]);

  // Lógica de tema
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header 
          // A CORREÇÃO: Usamos "optional chaining" (?.) para evitar erros
          // se 'user' for nulo ou se 'nome_completo' não existir.
          nome_completo={user?.nome || 'Utilizador'}
          onToggleTheme={toggleTheme}
          theme={theme}
        />
        <main className="container">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;
