import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
// Se você usa o Header/Footer em todas as páginas, importe-os:
// import Header from '../components/Header';
// import Footer from '../components/Footer';

import '../assets/styles/projectDetails.css'; // Importe o CSS para o layout

// --- DADOS MOCKADOS (Substitua pela sua chamada à API real) ---
const mockProject = {
    id: 1,
    title: 'Desenvolvedor FrontEnd Sênior',
    company: 'TechFlow',
    logoUrl: 'https://i.ibb.co/L5w11fF/techflow-logo.png', // Exemplo de logo
    posted: 'Publicado hoje',
    salary: 'R$ 8.000,00 - R$ 12.000,00',
    location: 'Remoto (Horário Flexível)',
    description: 'Buscamos um desenvolvedor Frontend experiente para liderar a criação de interfaces ricas e interativas para nossa plataforma de SaaS. Você será o responsável por definir a arquitetura frontend e garantir a melhor experiência de usuário.',
    responsibilities: [
        'Liderar o desenvolvimento de novos recursos usando React e TypeScript.',
        'Colaborar com a equipe de design (UX/UI) para traduzir wireframes e protótipos em código de alta qualidade.',
        'Otimizar o desempenho do aplicativo para garantir velocidade e escalabilidade.',
        'Revisar código e orientar desenvolvedores juniores.'
    ],
    requirements: [
        'Experiência mínima de 5 anos com desenvolvimento Frontend.',
        'Proficiência em JavaScript (ES6+), React.js e Redux/Context API.',
        'Experiência sólida com TypeScript e Git (Git Flow).',
        'Conhecimento em metodologias Ágeis (Scrum/Kanban).',
        'Habilidade de comunicação clara em Português.'
    ],
    technologies: ['React', 'TypeScript', 'GIT', 'Redux', 'Jest', 'Figma'],
    employerInfo: {
        name: 'Carlos Mendes',
        title: 'CTO - TechFlow',
        avgRating: 4.8
    }
};

// Componente simples para a Tag de Tecnologia
const TechTag = ({ name }) => (
    <span className="detail-tag">
        {name}
    </span>
);

const ProjectDetailsPage = () => {
    // const { id } = useParams(); // Usaria o ID para carregar dados reais
    const [project, _setProject] = useState(mockProject);
    const [isApplied, setIsApplied] = useState(false);

    const handleApply = () => {
        // Lógica de candidatura (ex: chamar API)
        alert(`Candidatura enviada para: ${project.title}`);
        setIsApplied(true);
    };

    return (
        // Envolver toda a página em um fragmento ou div, e adicionar o Header/Footer globalmente
        <div className="project-details-page-wrapper"> 
            {/* <Header />  -- Descomente se for usar um header fixo */}

            <div className="project-details-page">
                
                {/* Seção Principal: Título e Informações */}
                <header className="details-header">
                    <div className="header-info">
                        <img src={project.logoUrl} alt={`${project.company} Logo`} className="company-logo" />
                        <div className="text-info">
                            <h1 className="job-title">{project.title}</h1>
                            <p className="company-name">{project.company} · {project.posted}</p>
                        </div>
                    </div>
                </header>

                <div className="details-layout-grid">
                    
                    {/* --- CONTEÚDO PRINCIPAL (MAIN) --- */}
                    <main className="details-main-content">
                        
                        <section className="detail-section">
                            <h2>Resumo e Descrição</h2>
                            <p className="job-description">{project.description}</p>
                        </section>

                        <section className="detail-section">
                            <h2>Responsabilidades Principais</h2>
                            <ul className="detail-list responsibilities-list">
                                {project.responsibilities.map((resp, index) => (
                                    <li key={index}><i className="fas fa-check-circle"></i>{resp}</li>
                                ))}
                            </ul>
                        </section>
                        
                        <section className="detail-section">
                            <h2>Requisitos</h2>
                            <ul className="detail-list requirements-list">
                                {project.requirements.map((req, index) => (
                                    <li key={index}><i className="fas fa-exclamation-circle"></i>{req}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="detail-section">
                            <h2>Tecnologias Utilizadas</h2>
                            <div className="tags-container">
                                {project.technologies.map(tech => (
                                    <TechTag key={tech} name={tech} />
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* --- BARRA LATERAL (ASIDE) --- */}
                    <aside className="details-sidebar">
                        
                        <div className="sidebar-card action-card">
                            <div className="salary-info">
                                <i className="fas fa-money-bill-wave"></i>
                                <span className="salary-value">{project.salary}</span>
                            </div>
                            <div className="location-info">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>{project.location}</span>
                            </div>
                            
                            <button 
                                className={`apply-button ${isApplied ? 'applied' : ''}`}
                                onClick={handleApply}
                                disabled={isApplied}
                            >
                                {isApplied ? 'Candidatura Enviada!' : 'Candidatar-se Agora'}
                            </button>
                        </div>

                        <div className="sidebar-card employer-card">
                            <h3>Sobre o Empregador</h3>
                            <p className="employer-name">{project.employerInfo.name}</p>
                            <p className="employer-title">{project.employerInfo.title}</p>
                            <div className="employer-rating">
                                <i className="fas fa-star"></i> {project.employerInfo.avgRating} de 5
                            </div>
                            <Link to={`/employer/${project.company}`} className="view-profile-link">
                                Ver Perfil da Empresa
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
            
             <Footer />
        </div>
    );
};

export default ProjectDetailsPage;