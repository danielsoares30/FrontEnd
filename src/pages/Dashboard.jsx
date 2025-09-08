// Ficheiro: src/pages/Dashboard.jsx

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useAuth } from '../hooks/useAuth'; // 1. IMPORTA O HOOK para aceder ao utilizador
import '../assets/styles/dashboard.css';
import '../assets/styles/style.css';

const Dashboard = () => {
  const chartRef = useRef(null);
  // 2. OBTEMOS OS DADOS DO UTILIZADOR LOGADO
  const { user } = useAuth();

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = new Chart(chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          data: [500, 800, 1200, 900, 1500, 2000],
          borderColor: 'var(--cor-primaria)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'var(--cor-primaria)',
        }]
      },
      options: { /* ... opções do gráfico ... */ }
    });
    return () => chart.destroy();
  }, []);

  const CtaIcon = () => (
    <svg className="cta-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path clipRule="evenodd" fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" />
      <path clipRule="evenodd" fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" />
    </svg>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-card card-saldo">
        <div className="card-header"><i className="fas fa-wallet"></i><h3>Saldo</h3></div>
        <span className="card-value">R$ 1.250,00</span>
      </div>
      <div className="dashboard-card card-ganhos">
        <div className="card-header"><i className="fas fa-chart-line"></i><h3>Ganhos</h3></div>
        <span className="card-value">R$ 8.500,00</span>
      </div>
      <div className="dashboard-card card-nivel">
        <div className="card-header"><i className="fas fa-award"></i><h3>Nível</h3></div>
        <p>Você está no nível<strong className="card-value">Bronze</strong></p>
      </div>

      <div className="dashboard-card card-perfil">
        <div className="card-header"><i className="fas fa-user-circle"></i><h3>Meu Perfil</h3></div>
        {/* 3. USAMOS OS DADOS DO UTILIZADOR AQUI de forma segura */}
        <p><strong>Nome:</strong> {user?.nome || 'Carregando...'}</p>
        <p><strong>Email:</strong> {user?.email || 'Carregando...'}</p>
        <Link to="/dashboard/perfil" className="edit-profile-link">Editar Perfil →</Link>
      </div>

      <div className="dashboard-card card-atividades">
        <div className="card-header"><i className="fas fa-history"></i><h3>Atividades Recentes</h3></div>
        <ul className="activity-list">
          <li>Venda concluída - R$ 500,00</li>
          <li>Depósito recebido - R$ 200,00</li>
          <li>Retirada - R$ 150,00</li>
        </ul>
      </div>
      <div className="dashboard-card card-grafico">
        <div className="card-header"><i className="fas fa-chart-bar"></i><h3>Gráfico de Ganhos</h3></div>
        <div style={{ height: '250px' }}><canvas ref={chartRef}></canvas></div>
      </div>
      
      <div className="dashboard-card cta-card">
        <CtaIcon />
        <h2 className="cta-title">Aqui você pode conferir todos os seus projetos em andamento</h2>
        <p className="cta-subtitle">Falta muito pouco para dar início à sua experiência como freelancer!</p>
        <button className="cta-button">Encontrar Projetos</button>
      </div>
    </div>
  );
};

export default Dashboard;
