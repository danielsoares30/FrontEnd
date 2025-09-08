// Ficheiro: src/components/GhostNoResults.jsx
import React from 'react';

const GhostNoResults = () => (
    <div className="no-results-container">
        <div className="ghost">
            <div className="ghost-eyes">
                <span>•</span><span>•</span>
            </div>
            <div className="ghost-mouth"></div>
        </div>
        <h3>Oops! Nenhum projeto encontrado</h3>
        <p>Tente alterar ou remover alguns filtros.</p>
    </div>
);

export default GhostNoResults;