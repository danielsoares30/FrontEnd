import React, { useState } from 'react';

const TransactionFilter = ({ onApplyFilters }) => {
  // Estado local para os campos do formulário
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Chama a função recebida do componente pai, passando os filtros
    onApplyFilters({ status, type });
  };

  return (
    <div className="filter-card card">
      <div className="card-header">
        <h3>Filtrar Transações</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="success">Concluído</option>
            <option value="pending">Pendente</option>
            <option value="error">Falha</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Todos</option>
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
        </div>
        <button type="submit" className="apply-filter-button">Aplicar Filtros</button>
      </form>
    </div>
  );
};

export default TransactionFilter;