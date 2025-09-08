// Ficheiro: src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa o nosso sistema de autenticação
import { AuthProvider } from './contexts/AuthContext.jsx';


// Importa os componentes de layout e proteção
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Importa TODAS as páginas da aplicação
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Relatorios from './pages/Relatorios.jsx';
import Transacoes from './pages/Transacoes.jsx';
import Perfil from './pages/Perfil.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import BuscarProjetos from './pages/BuscarProjetos.jsx';
import EncontrarFreelancers from './pages/EncontrarFreelancer.jsx'



function App() {
  return (
    // A propriedade "basename" FOI REMOVIDA daqui.
    <BrowserRouter basename = "/freellaner-plataforma">
      <AuthProvider>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* --- ROTAS PRIVADAS / PROTEGIDAS --- */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} /> 
            <Route path="relatorios" element={<Relatorios />} />
            <Route path="transacoes" element={<Transacoes />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="configuracoes" element={<Configuracoes />} />

            <Route path="buscar-projetos" element={<BuscarProjetos />} />
            <Route path="encontrar-freelancers" element={<EncontrarFreelancers />} /> 
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
