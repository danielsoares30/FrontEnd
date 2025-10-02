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
import PoliticaPrivacidade from './pages/PoliticaPrivacidade.jsx';
import Relatorios from './pages/Relatorios.jsx';
import SobreNos from './pages/SobreNos.jsx';
import Transacoes from './pages/Transacoes.jsx';
import TermosDeServico from './pages/TermosdeServico.jsx'; // Nome do arquivo corrigido
import Perfil from './pages/Perfil.jsx';
import Configuracoes from './pages/Configuracoes.jsx';
import BuscarProjetos from './pages/BuscarProjetos.jsx';
import EncontrarFreelancers from './pages/EncontrarFreelancer.jsx';
import PaginaProposta from './pages/PaginaProposta.jsx'



function App() {
  return (
    <BrowserRouter basename="/freellaner-plataforma">
      <AuthProvider>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/termos-de-servico" element={<TermosDeServico />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          
          {/* --- ROTAS PRIVADAS / PROTEGIDAS (acessíveis apenas após o login) --- */}
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
            <Route path="pagina-propostas" element={<PaginaProposta />} />
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;