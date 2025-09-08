import React from 'react';

// Importando os componentes que acabamos de criar
import MetricCardReport from '../components/MetricCard.jsx';
import ActionCardReport from '../components/ActionCardReport';

// Importando o CSS da página
import '../assets/styles/relatorio.css';
import '../assets/styles/style.css'; 

const Relatorios = () => {
  return (
    <main className="dashboard-grid">
      <div className="metric-boxes">
        <MetricCardReport 
          icon="fas fa-dollar-sign"
          title="Receita Total"
          value="$12.500"
          detail="+5% desde o mês passado"
          detailColor="green"
        />
        <MetricCardReport 
          icon="fas fa-users"
          title="Novos Usuários"
          value="1.840"
          detail="+12% desde a semana passada"
          detailColor="green"
        />
        <MetricCardReport 
          icon="fas fa-shopping-cart"
          title="Vendas Diárias"
          value="250"
          detail="-2% desde ontem"
          detailColor="red"
        />
      </div>

      <div className="main-report-area">
        <ActionCardReport 
          title="Tendência de Vendas"
          description="Gráfico interativo mostrando as vendas ao longo do ano."
          linkTo="/relatorios/vendas" // Exemplo de rota
          linkText="Ver Gráfico"
          fullWidth={true}
        />
        <ActionCardReport 
          title="Análise de Produtos"
          description="Ranking dos produtos mais vendidos e margens de lucro."
          linkTo="/relatorios/produtos" // Exemplo de rota
          linkText="Ver Análise"
        />
        <ActionCardReport 
          title="Relatório de Marketing"
          description="ROI e performance das campanhas ativas."
          linkTo="/relatorios/marketing" // Exemplo de rota
          linkText="Ver Relatório"
        />
      </div>
    </main>
    
    // Novamente, o footer é omitido pois idealmente ele pertence ao componente Layout.
  );
};

export default Relatorios;