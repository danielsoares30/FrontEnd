import React from 'react';
import { Link } from 'react-router-dom';

const ActionCardReport = ({ title, description, linkTo, linkText, fullWidth = false }) => {
  // Adiciona uma classe extra se o card for de largura total
  const cardClassName = `card ${fullWidth ? 'full-width-card' : ''}`;

  return (
    <div className={cardClassName}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <Link to={linkTo} className="action-link">{linkText}</Link>
    </div>
  );
};

export default ActionCardReport;