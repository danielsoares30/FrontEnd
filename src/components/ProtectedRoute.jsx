import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth.js";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Se não estiver logado, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;