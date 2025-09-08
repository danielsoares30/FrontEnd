import React, { useState, useMemo } from 'react';
import '../assets/styles/buscarProjetos.css';
import GhostNoResults from '../components/GhostNoResults.jsx';


// --- ÍCONES (SVG embutido para simplicidade) ---
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

// --- Mapeamento de habilidades para ícones (para as tags) ---
const skillIcons = {
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    'GIT': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
    'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    'UX Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg',
    'Segurança': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'PenTest': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'Firewall': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    'Unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    'Game Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
    'Kafka': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'Multithreading': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
    'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
    'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',
    'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg',
};


// --- DADOS DE EXEMPLO ATUALIZADOS ---
const allProjectsData = [
    { id: 1, client: 'TechFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', title: 'Desenvolvedor FrontEnd Sênior', category: 'frontend', location: 'Remoto', postDate: 'Publicado hoje', budget: 'R$ 8.000', description: 'Buscamos um desenvolvedor Frontend experiente para liderar a criação de interfaces ricas e interativas para nossa plataforma de SaaS.', skills: ['React', 'TypeScript', 'GIT'] },
    { id: 2, client: 'DataCorp', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', title: 'Engenheiro de Dados Pleno', category: 'backend', location: 'São Paulo, BR', postDate: 'Publicado há 2 dias', budget: 'R$ 7.500', description: 'Vaga para engenheiro de dados com foco em construção e manutenção de pipelines de dados em Python e SQL.', skills: ['Python', 'SQL', 'Django'] },
    { id: 3, client: 'InnovateUX', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', title: 'UI/UX Designer para App Mobile', category: 'design', location: 'Remoto', postDate: 'Publicado há 3 dias', budget: 'R$ 6.000', description: 'Procuramos um designer talentoso para criar a experiência de usuário de um novo aplicativo de finanças pessoais.', skills: ['Figma', 'UX Design'] },
    { id: 4, client: 'CloudSolutions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg', title: 'Arquiteto Cloud AWS', category: 'infra', location: 'Rio de Janeiro, BR', postDate: 'Publicado há 1 semana', budget: 'R$ 12.000', description: 'Arquiteto de soluções Cloud para projetar e implementar infraestrutura escalável na AWS.', skills: ['AWS', 'Docker', 'Kubernetes'] },
    { id: 5, client: 'SecureNet', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', title: 'Especialista em Cibersegurança', category: 'seguranca', location: 'Remoto', postDate: 'Publicado há 5 dias', budget: 'R$ 9.000', description: 'Vaga para profissional com experiência em segurança de redes e aplicações web, buscando vulnerabilidades e implementando defesas.', skills: ['Segurança', 'PenTest', 'Firewall'] },
    { id: 6, client: 'GameDev Inc.', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', title: 'Desenvolvedor de Jogos Unity', category: 'gamedev', location: 'Belo Horizonte, BR', postDate: 'Publicado há 4 dias', budget: 'R$ 7.000', description: 'Desenvolvedor Unity com paixão por jogos para criar novas experiências interativas.', skills: ['Unity', 'C#', 'Game Design'] },
    { id: 7, client: 'E-commerce Solutions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', title: 'Desenvolvedor Back-End Java', category: 'backend', location: 'Remoto', postDate: 'Publicado há 1 dia', budget: 'R$ 9.500', description: 'Experiência em Spring Boot e microserviços.', skills: ['Java', 'Spring Boot', 'Kafka', 'SQL'] },
    { id: 8, client: 'Digital Agency', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', title: 'Desenvolvedor Vue.js', category: 'frontend', location: 'Curitiba, BR', postDate: 'Publicado há 3 dias', budget: 'R$ 7.200', description: 'Criação de interfaces responsivas e de alta performance.', skills: ['Vue.js', 'HTML', 'CSS', 'JavaScript'] },
    { id: 9, client: 'FinTech Group', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', title: 'Engenheiro de Software C++', category: 'backend', location: 'São Paulo, BR', postDate: 'Publicado há 5 dias', budget: 'R$ 10.000', description: 'Desenvolvimento de sistemas de alta frequência para o mercado financeiro.', skills: ['C++', 'Multithreading', 'Linux'] },
    { id: 10, client: 'HealthCare AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', title: 'Cientista de Dados Júnior', category: 'data', location: 'Remoto', postDate: 'Publicado hoje', budget: 'R$ 5.000', description: 'Análise de dados para modelos de saúde preditiva.', skills: ['Python', 'TensorFlow', 'Pandas', 'Jupyter'] },
];

// --- COMPONENTES ---

const FilterBar = ({ filters, setFilters }) => {
    const handleSkillChange = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const newSkill = e.target.value.trim();
            if (!filters.skills.includes(newSkill)) {
                setFilters(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            }
            e.target.value = ''; // Limpa o input
        }
    };

    const removeSkill = (skillToRemove) => {
        setFilters(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    return (
        <div className="filter-bar">
            <div className="search-input-wrapper">
                <IconSearch />
                <input
                    type="text"
                    placeholder="Busque por habilidades e pressione Enter..."
                    onKeyDown={handleSkillChange}
                />
            </div>
            {filters.skills.length > 0 && (
                <div className="active-filters">
                    {filters.skills.map(skill => (
                        <span key={skill} className="filter-tag">
                            {skill}
                            <button onClick={() => removeSkill(skill)}>×</button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

// Componente para a tag de habilidade com ícone
const SkillTagWithIcon = ({ skillName }) => {
    const iconSrc = skillIcons[skillName];
    return (
        <div className="skill-tag-with-icon">
            {iconSrc && <img src={iconSrc} alt={`${skillName} icon`} className="skill-icon" />}
            <span>{skillName}</span>
        </div>
    );
};

// Refatoração do componente ProjectCard para um layout mais visual
const ProjectCard = ({ title, description, skills }) => (
    <article className="project-card">
        <div className="card-content">
            <h2 className="project-title">{title}</h2>
            <p className="project-description">{description}</p>
            <div className="project-skills">
                {skills.map(skill => (
                    <SkillTagWithIcon key={skill} skillName={skill} />
                ))}
            </div>
        </div>
        <div className="card-action">
            <button className="proposta-btn">Faça sua proposta</button>
        </div>
    </article>
);


// NOVO COMPONENTE DE PAGINAÇÃO
const Pagination = ({ projectsPerPage, totalProjects, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProjects / projectsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-container">
            <ul>
                <li onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>
                    &laquo;
                </li>
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
                        {number}
                    </li>
                ))}
                <li onClick={() => paginate(currentPage + 1)} className={currentPage === totalPages ? 'disabled' : ''}>
                    &raquo;
                </li>
            </ul>
        </nav>
    );
};

const BuscarProjetos = () => {
    const [filters, setFilters] = useState({ skills: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5; // Define quantas vagas por página

    const filteredProjects = useMemo(() => {
        if (filters.skills.length === 0) {
            return allProjectsData;
        }
        return allProjectsData.filter(project =>
            filters.skills.every(filterSkill =>
                project.skills.some(projectSkill =>
                    projectSkill.toLowerCase().includes(filterSkill.toLowerCase())
                )
            )
        );
    }, [filters]);

    // Lógica da Paginação
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(filteredProjects.length / projectsPerPage)) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo da página ao mudar
        }
    };

    return (
        <>
            <div className="buscar-projetos-container">
                <header className="page-header">
                    <h1>Encontre o Projeto Perfeito</h1>
                    <p>Navegue pelas oportunidades e encontre o trabalho ideal para as suas habilidades.</p>
                </header>
                
                <FilterBar filters={filters} setFilters={setFilters} />
                
                {/* O divisor elegante entra aqui! */}
                <div className="elegant-divider"></div>
    
                <main className="project-list">
                    {currentProjects.length > 0 ? (
                        currentProjects.map(project => (
                            <ProjectCard key={project.id} {...project} />
                        ))
                    ) : (
                        <GhostNoResults />
                    )}
                </main>
                
                {filteredProjects.length > projectsPerPage && (
                    <Pagination 
                        projectsPerPage={projectsPerPage}
                        totalProjects={filteredProjects.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                )}
            </div>
        </>
    );
};

export default BuscarProjetos;