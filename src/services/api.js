// Ficheiro: src/services/api.js

const API_BASE_URL = 'http://localhost:8080';

export const apiLogin = async (email, senha) => { // Recebe 'senha'
  const response = await fetch(`${API_BASE_URL}/login/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // A CORREÇÃO ESTÁ AQUI: envia o campo 'senha'
    body: JSON.stringify({ email, senha }), 
  });

  if (!response.ok) {
    throw new Error('Email ou senha inválidos.');
  }
  return response.json();
};

export const apiRegister = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Falha no registo.');
  }
  return response.json();
};
