import React, { useState, useMemo } from 'react';

// Importando os componentes que vamos criar
import TransactionTable from '../components/TransactionTable';
import TransactionFilter from '../components/TransactionFilter';

// Importando o CSS da página
import '../assets/styles/transacoes.css';
import '../assets/styles/style.css'; 

// Dados de exemplo (em uma aplicação real, isso viria de uma API)
const allTransactionsData = [
  { id: '#20250816-001', date: '16/08/2025', description: 'Pagamento de Serviço', value: 50.00, type: 'credit', status: 'success' },
  { id: '#20250815-002', date: '15/08/2025', description: 'Transferência Bancária', value: -150.75, type: 'debit', status: 'pending' },
  { id: '#20250815-001', date: '15/08/2025', description: 'Compra Online', value: -25.99, type: 'debit', status: 'success' },
  { id: '#20250814-003', date: '14/08/2025', description: 'Reembolso', value: 10.50, type: 'credit', status: 'success' },
  { id: '#20250814-002', date: '14/08/2025', description: 'Assinatura de Software', value: -9.99, type: 'debit', status: 'error' },
  { id: '#20250813-001', date: '13/08/2025', description: 'Venda de Produto', value: 350.00, type: 'credit', status: 'success' },
];

const Transacoes = () => {
  // Estado para armazenar os filtros selecionados pelo usuário
  const [filters, setFilters] = useState({
    status: '', // success, pending, error
    type: ''    // credit, debit
  });

  // A função que será passada para o componente de filtro
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };
  
  // useMemo otimiza a performance, recalculando a lista filtrada apenas quando os dados ou os filtros mudam.
  const filteredTransactions = useMemo(() => {
    return allTransactionsData.filter(transaction => {
      const statusMatch = filters.status ? transaction.status === filters.status : true;
      const typeMatch = filters.type ? transaction.type === filters.type : true;
      return statusMatch && typeMatch;
    });
  }, [filters]);

  return (
    <main className="container">
      <div className="transaction-grid">
        {/* Passamos a lista JÁ FILTRADA para a tabela */}
        <TransactionTable transactions={filteredTransactions} />
        
        {/* Passamos a FUNÇÃO para o formulário de filtro */}
        <TransactionFilter onApplyFilters={handleApplyFilters} />
      </div>
    </main>
  );
};

export default Transacoes;