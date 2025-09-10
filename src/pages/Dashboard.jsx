// Ficheiro: src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiHome, FiBriefcase, FiMessageSquare, FiSettings, FiBell, FiChevronDown, 
    FiSearch, FiMenu, FiPlus, FiArrowRight, FiCheckCircle, FiClock
} from 'react-icons/fi';

import '../assets/styles/dashboard.css'; // O CSS também será totalmente substituído

// --- COMPONENTES DA UI REFINADOS ---

const Sidebar = ({ collapsed, setCollapsed }) => {
    const [active, setActive] = useState('Início');
    return (
        <motion.aside 
            className="sidebar" 
            initial={false}
            animate={{ width: collapsed ? 80 : 250 }}
        >
            <div className="sidebar-header" onClick={() => setCollapsed(!collapsed)}>
                <AnimatePresence>
                    {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Freellaner</motion.span>}
                </AnimatePresence>
                <FiMenu className="sidebar-toggle" />
            </div>
            <nav className="sidebar-nav">
                {['Início', 'Projetos', 'Mensagens', 'Configurações'].map(item => (
                    <a href="#" key={item} className={`nav-item ${active === item ? 'active' : ''}`} onClick={() => setActive(item)}>
                        {item === 'Início' && <FiHome />}
                        {item === 'Projetos' && <FiBriefcase />}
                        {item === 'Mensagens' && <FiMessageSquare />}
                        {item === 'Configurações' && <FiSettings />}
                        {!collapsed && <span className="nav-text">{item}</span>}
                        {active === item && <motion.div className="active-indicator" layoutId="activeIndicator" />}
                    </a>
                ))}
            </nav>
        </motion.aside>
    );
};

const Header = ({ user, greeting }) => {
    return (
        <header className="dashboard-header">
            <div className="welcome-section">
                <h1>{greeting}, {user?.nome || 'Agatha'}!</h1>
                <p>Você tem 2 mensagens não lidas e 1 tarefa pendente.</p>
            </div>
            <div className="header-actions-dashboard">
                <button className="action-button secondary"><FiMessageSquare /> Ver Mensagens</button>
                <button className="action-button primary"><FiPlus /> Novo Projeto</button>
            </div>
        </header>
    );
};

const ProjectCard = ({ project }) => {
    const progress = project.progress;
    return (
        <div className="project-card">
            <div className="project-header">
                <span className="project-client">{project.client}</span>
                <span className={`project-status status-${project.status.toLowerCase()}`}>{project.status}</span>
            </div>
            <h3 className="project-title">{project.title}</h3>
            <div className="progress-bar-container">
                <motion.div 
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
            <div className="project-footer">
                <span><FiClock /> {project.deadline}</span>
                <span>{progress}%</span>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL ---

const Dashboard = () => {
    const { user } = useAuth(); // Assume que useAuth retorna um objeto de usuário ou null/undefined enquanto carrega
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [greeting, setGreeting] = useState('Olá');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting('Bom dia');
        else if (hour >= 12 && hour < 18) setGreeting('Boa tarde');
        else setGreeting('Boa noite');

        // Lógica para o tema (pode ser movida para um hook ou contexto global)
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.className = savedTheme;
    }, []);

    // Dados de exemplo para os projetos ativos
    const activeProjects = [
        { title: 'Desenvolvimento de App Mobile', client: 'TechCorp', progress: 75, deadline: '5 dias restantes', status: 'Em Andamento' },
        { title: 'Website Institucional', client: 'Creative Co.', progress: 40, deadline: '12 dias restantes', status: 'Em Andamento' },
        { title: 'Revisão de UI/UX', client: 'Designify', progress: 95, deadline: '2 dias restantes', status: 'Finalizando' },
    ];
    
    // Animações
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar collapsed={isSidebarCollapsed} setCollapsed={setIsSidebarCollapsed} />
            
            <div className="content-wrapper">
                <main className="dashboard-main">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div variants={itemVariants}>
                            <Header user={user} greeting={greeting} />
                        </motion.div>

                        <motion.section variants={itemVariants} className="dashboard-section">
                            <h2 className="section-title">Projetos Ativos</h2>
                            <div className="active-projects-grid">
                                {activeProjects.map((proj, i) => <ProjectCard key={i} project={proj} />)}
                            </div>
                        </motion.section>
                        
                        <motion.section variants={itemVariants} className="dashboard-section">
                            <h2 className="section-title">Visão Financeira</h2>
                            <div className="financial-grid">
                                <div className="dashboard-card card-grafico">
                                    {/* Componente do Gráfico de Ganhos iria aqui */}
                                    <p>Gráfico de Ganhos (Line Chart)</p>
                                </div>
                                <div className="dashboard-card card-atividades">
                                    {/* Componente de Atividades Recentes iria aqui */}
                                    <p>Feed de Atividades</p>
                                </div>
                            </div>
                        </motion.section>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;