import React from 'react';

const MetricCardReport = ({ icon, title, value, detail, detailColor }) => {
  // Define a cor do detalhe com base na prop (verde para positivo, vermelho para negativo)
  const detailStyle = {
    color: detailColor === 'green' ? '#2ecc71' : (detailColor === 'red' ? '#e74c3c' : 'inherit')
  };

  return (
    <div className="metric-card card">
      <div className="card-header">
        <i className={icon}></i>
        <h3>{title}</h3>
      </div>
      <span className="card-value">{value}</span>
      <p className="card-detail" style={detailStyle}>{detail}</p>
    </div>
  );
};

export default MetricCardReport;