// Ficheiro: src/context/AuthContext.jsx
// Responsabilidade: Exportar APENAS o componente Provedor.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin, apiRegister } from '../services/api';
// Importa a definição do contexto do nosso novo ficheiro.
import { AuthContext } from './AuthContextDefinition.js';

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await apiLogin(email, senha);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await apiRegister(userData);
      alert('Registo efetuado com sucesso! Por favor, faça o login.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = { isLoggedIn: !!user, user, loading, error, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
