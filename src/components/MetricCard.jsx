import React from 'react';

/**
 * Componente reutilizável para exibir um card de métrica.
 * @param {object} props - As propriedades do componente.
 * @param {string} props.icon - A classe do ícone do Font Awesome (ex: 'fas fa-dollar-sign').
 * @param {string} props.title - O título do card (ex: 'Receita Total').
 * @param {string} props.value - O valor principal a ser exibido (ex: '$12.500').
 * @param {string} props.detail - O texto de detalhe exibido abaixo do valor.
 * @param {('green'|'red')} [props.detailColor] - A cor do texto de detalhe (opcional).
 */
const MetricCard = ({ icon, title, value, detail, detailColor }) => {
  // Objeto de estilo para aplicar a cor dinamicamente
  const detailStyle = {
    // Se a cor for 'green', usa um tom de verde. Se for 'red', um de vermelho.
    // Caso contrário, usa a cor padrão do CSS.
    color: detailColor === 'green' ? '#2ecc71' : (detailColor === 'red' ? '#e74c3c' : 'inherit')
  };

  return (
    // Lembre-se que "class" do HTML vira "className" no JSX
    <div className="metric-card card">
      <div className="card-header">
        {/* O ícone é definido pela propriedade 'icon' */}
        <i className={icon}></i>
        {/* O título é definido pela propriedade 'title' */}
        <h3>{title}</h3>
      </div>
      {/* O valor é definido pela propriedade 'value' */}
      <span className="card-value">{value}</span>
      {/* O detalhe é definido pela propriedade 'detail' e o estilo pela 'detailColor' */}
      <p className="card-detail" style={detailStyle}>
        {detail}
      </p>
    </div>
  );
};

export default MetricCard;