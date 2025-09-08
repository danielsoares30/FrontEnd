// Ficheiro: src/pages/CadastroPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// 1. IMPORTA A IMAGEM E O CSS
import loginIllustration from '../assets/images/login/ChatGPT Image 13 de ago. de 2025, 15_57_56.png';
import '../assets/styles/cadastro.css'; // Usamos o mesmo CSS da página de login

// Componentes internos para os ícones SVG
const GoogleIcon = () => ( <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg> );
const FacebookIcon = () => ( <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2"></path></svg> );

const CadastroPage = () => {
  const { register, loading, error } = useAuth();

  // O estado está correto, pois corresponde aos nomes dos atributos da classe Java
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    cpf: '',
    email: '',
    senha: ''
  });
  
  const [isDarkMode, ] = useState(() => localStorage.getItem('theme') !== 'light');
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
 

  // CORREÇÃO 1: A função handleChange foi corrigida
  const handleChange = (event) => {
    // Desestrutura 'name' e 'value' do input que disparou o evento
    const { name, value } = event.target;
    // Atualiza o estado usando o 'name' do input como chave
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // O formData já está no formato correto para ser enviado para o backend
    // Ex: { "nome": "...", "nascimento": "...", ... }
    await register(formData);
  };

  return (
    <div className="login-page">
      <div className="login-panel-left">
        <div className="panel-content">
          <h2>Conectando talentos, <br />realizando projetos.</h2>
          <img src={loginIllustration} alt="Ilustração de trabalho criativo" />
        </div>
      </div>

      <div className="login-panel-right">
        <div className="theme-toggle-container">
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Bem-vindo ao Freellaner</h1>
            <p className="subtitle">Crie sua conta para continuar</p>

            {/* CORREÇÃO 2: Os atributos 'name' e 'value' dos inputs foram alinhados com o estado 'formData' */}
            
            <div className="input-group">
              <label htmlFor="nome">Nome Completo</label>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} placeholder="O seu nome completo" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input type="date" id="nascimento" name="nascimento" value={formData.nascimento} onChange={handleChange} required />
            </div>
            
            <div className="input-group">
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="000.000.000-00" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="seu@email.com" required />
            </div>
            
            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="••••••••" required />
            </div>
            
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'A criar conta...' : 'Criar Conta'}
            </button>

            <p className="signup-link">
              Já tem uma conta? <Link to="/login">Clique Aqui</Link>
            </p>
            
            <div className="social-login-divider">ou crie com</div>
            <div className="social-login">
              <button type="button" className="social-btn">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button type="button" className="social-btn">
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;