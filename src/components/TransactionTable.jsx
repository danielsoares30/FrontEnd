import React from 'react';

// Componente para uma única linha da tabela, para deixar o código mais limpo
const TransactionRow = ({ transaction }) => {
  const valueClass = transaction.type === 'credit' ? 'value-credit' : 'value-debit';
  const statusClass = `status-badge ${transaction.status}`;
  const statusText = {
    success: 'Concluído',
    pending: 'Pendente',
    error: 'Falha'
  }[transaction.status];
  const formattedValue = `${transaction.type === 'credit' ? '+' : '-'}$${Math.abs(transaction.value).toFixed(2)}`;

  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td className={valueClass}>{formattedValue}</td>
      <td><span className={statusClass}>{statusText}</span></td>
    </tr>
  );
};

const TransactionTable = ({ transactions }) => {
  return (
    <div className="transaction-table card">
      <div className="card-header">
        <h3>Transações Recentes</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID da Transação</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Usamos .map() para transformar o array de dados em linhas da tabela */}
          {transactions.map(transaction => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;