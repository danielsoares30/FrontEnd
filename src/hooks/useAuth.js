// Ficheiro: src/hooks/useAuth.js
// Responsabilidade: Exportar APENAS o hook para consumir o contexto.

import { useContext } from 'react';
// Importa a definição do contexto do nosso novo ficheiro.
import { AuthContext } from '../contexts/AuthContextDefinition.js';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
