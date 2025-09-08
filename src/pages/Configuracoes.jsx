// Ficheiro: src/pages/Configuracoes.jsx

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Importa o nosso novo ficheiro de estilo
import '../assets/styles/configuracao.css';

// Componente interno reutilizável para o interruptor, agora com mais detalhes
const ToggleSwitch = ({ title, description, isChecked, onToggle }) => (
  <div className="setting-item">
    <div className="setting-item-text">
        <h4>{title}</h4>
        <p>{description}</p>
    </div>
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  </div>
);


const Configuracoes = () => {
  const { user } = useAuth();
  
  // Estado para os campos do formulário de informações da conta
  const [formData, setFormData] = useState({
    nome_completo: user?.nome || '',
    email: user?.email || '',
  });

  // Estado para as configurações de notificação
  const [notifications, setNotifications] = useState({
    email: true,
    system: false,
  });
  
  // Estado para as configurações de segurança
  const [security, setSecurity] = useState({
    twoFactor: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("A guardar informações:", formData);
    // TODO: Chamar API para atualizar os dados do utilizador
    alert("Informações salvas com sucesso!");
  };

  if (!user) {
    return <div>A carregar...</div>;
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Configurações</h2>
        <p>Gira as suas informações de conta, segurança e preferências de notificação.</p>
      </div>

      {/* --- Secção de Informações da Conta --- */}
      <div className="settings-card">
        <div className="settings-card-header">
            <h3>Informações da Conta</h3>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="nome_completo">Nome Completo</label>
            <input 
              type="text" 
              id="nome_completo" 
              name="nome_completo" 
              value={formData.nome_completo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              disabled // O e-mail geralmente não é editável
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">Salvar Alterações</button>
          </div>
        </form>
      </div>

      {/* --- Secção de Segurança --- */}
      <div className="settings-card">
          <div className="settings-card-header">
              <h3>Segurança</h3>
          </div>
        <ToggleSwitch 
          title="Autenticação de Dois Fatores (2FA)"
          description="Aumente a segurança da sua conta."
          isChecked={security.twoFactor}
          onToggle={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))}
        />
        <div className="btn-container">
            <button className="btn btn-secondary">Alterar Senha</button>
        </div>
      </div>
      
      {/* --- Secção de Notificações --- */}
      <div className="settings-card">
          <div className="settings-card-header">
              <h3>Notificações</h3>
          </div>
        <ToggleSwitch 
          title="Promoções e Novidades"
          description="Receber e-mails sobre novos recursos e ofertas."
          isChecked={notifications.email}
          onToggle={() => setNotifications(n => ({ ...n, email: !n.email }))}
        />
        <ToggleSwitch 
          title="Atividade da Conta"
          description="Receber notificações sobre atividades importantes no painel."
          isChecked={notifications.system}
          onToggle={() => setNotifications(n => ({ ...n, system: !n.system }))}
        />
      </div>

    </div>
  );
};

export default Configuracoes;
