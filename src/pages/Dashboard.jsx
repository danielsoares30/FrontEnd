// Ficheiro: src/pages/Dashboard.jsx

import React, { useEffect, useRef, useState } from 'react'; // <-- CORRIGIDO AQUI
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer'; // Import do Footer
import '../assets/styles/dashboard.css'; // Import do CSS
import WithdrawalModal from '../components/WithdrawalModal'; // **1. IMPORTAR O MODAL**
const Dashboard = () => {
  const chartRef = useRef(null);
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
    const availableBalance = "1.250,00"; 

  useEffect(() => {
    // ... (lógica do gráfico permanece a mesma)
    if (!chartRef.current) return;
    const existingChart = Chart.getChart(chartRef.current);
    if (existingChart) { existingChart.destroy(); }
    const chart = new Chart(chartRef.current, {
        type: 'line', data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], datasets: [{ label: 'Ganhos', data: [500, 800, 1200, 900, 1500, 2000], borderColor: '#3498DB', backgroundColor: 'rgba(52, 152, 219, 0.2)', fill: true, tension: 0.4, pointBackgroundColor: '#3498DB', pointBorderColor: '#fff', pointHoverRadius: 7, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#3498DB', }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false, }, }, scales: { x: { grid: { display: false, }, ticks: { color: '#9CA3AF', }, }, y: { grid: { color: '#374151', }, ticks: { color: '#9CA3AF', callback: function(value) { return 'R$ ' + value; } }, }, }, }
    });
    return () => chart.destroy();
  }, []);

  const CtaIcon = () => (
    <svg className="cta-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path clipRule="evenodd" fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" />
      <path clipRule="evenodd" fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" />
    </svg>
  );
  const handleCoWithdrawal = (amount) => {
        // **AQUI VOCÊ COLOCARIA A LÓGICA REAL DE ENVIO PARA API**
        alert(`Saque de R$ ${amount.toFixed(2).replace('.', ',')} solicitado com sucesso!`);
        setIsModalOpen(false); // Fecha o modal após a ação
    };

  return (
    // NOVO: Contêiner principal para controlar o layout
    <div className="dashboard-page-container">
      <main className="dashboard-content">
        {/* Cabeçalho de boas-vindas reintroduzido */}
       

        <div className="dashboard-grid">
          {/* Card Saldo */}
          <div className="dashboard-card card-saldo">
            <div className="card-header-main">
              <div className="card-header"><i className="fas fa-wallet"></i><h3>Saldo Disponível</h3></div>
              <button className="quick-action-button"
                                onClick={() => setIsModalOpen(true)}
                            ></button>
            </div>
            <span className="card-value">R$ 1.250,00</span>
            <div className="card-trend positive"><i className="fas fa-arrow-up"></i><span>5.2% vs. mês anterior</span></div>
          </div>

          {/* Card Ganhos */}
          <div className="dashboard-card card-ganhos">
            <div className="card-header"><i className="fas fa-chart-line"></i><h3>Ganhos (Últimos 30 dias)</h3></div>
            <span className="card-value">R$ 8.500,00</span>
            <div className="card-trend positive"><i className="fas fa-arrow-up"></i><span>12.8% vs. mês anterior</span></div>
          </div>

          {/* Card Nível */}
          <div className="dashboard-card card-nivel">
            <div className="card-header"><i className="fas fa-award"></i><h3>Nível Bronze</h3></div>
            <div className="progress-bar-container"><div className="progress-bar-fill" style={{width: '70%'}}></div></div>
            <div className="progress-bar-text"><span>700 / 1000 XP para o nível Prata</span></div>
          </div>

          {/* Card Perfil */}
          <div className="dashboard-card card-perfil">
            <div className="card-header"><i className="fas fa-user-circle"></i><h3>Meu Perfil</h3></div>
            <div className="perfil-info">
              <p><strong>Nome:</strong> {user?.nome || 'Agatha'}</p>
              <p><strong>Email:</strong> {user?.email || 'agatha@gmail.com'}</p>
            </div>
            <Link to="/dashboard/perfil" className="edit-profile-link">Editar Perfil <i className="fas fa-arrow-right"></i></Link>
          </div>

          {/* Card Atividades Recentes */}
          <div className="dashboard-card card-atividades">
            <div className="card-header"><i className="fas fa-history"></i><h3>Atividades Recentes</h3></div>
            <ul className="activity-list">
              <li>
                <div className="activity-icon icon-positive"><i className="fas fa-check"></i></div>
                <div className="activity-text"><span>Venda concluída</span><small>Projeto Web Design</small></div>
                <span className="activity-value positive">+ R$ 500,00</span>
              </li>
              <li>
                <div className="activity-icon icon-positive"><i className="fas fa-arrow-down"></i></div>
                <div className="activity-text"><span>Depósito recebido</span><small>Adiantamento de Cliente</small></div>
                <span className="activity-value positive">+ R$ 200,00</span>
              </li>
              <li>
                <div className="activity-icon icon-negative"><i className="fas fa-arrow-up"></i></div>
                <div className="activity-text"><span>Retirada para conta</span><small>Banco Inter</small></div>
                <span className="activity-value negative">- R$ 150,00</span>
              </li>
            </ul>
          </div>

          {/* Card Gráfico */}
          <div className="dashboard-card card-grafico">
            <div className="card-header"><i className="fas fa-chart-bar"></i><h3>Gráfico de Ganhos</h3></div>
            <div className="chart-container"><canvas ref={chartRef}></canvas></div>
          </div>

          {/* Card CTA */}
          <div className="dashboard-card cta-card">
            <CtaIcon />
            <h2 className="cta-title">Encontre seu próximo projeto de sucesso</h2>
            <p className="cta-subtitle">Milhares de oportunidades estão esperando por você. Dê o próximo passo!</p>
            <Link to="/dashboard/buscar-projetos" className="cta-button">Encontrar Projetos</Link>
          </div>
        </div>
      </main>

      {/* Footer integrado e posicionado corretamente */}
      <Footer />
       <WithdrawalModal 
                balance={availableBalance}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleCoWithdrawal}
            />
    </div>
  );
};

export default Dashboard;
