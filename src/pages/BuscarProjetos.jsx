// Ficheiro: src/pages/BuscarProjetos.jsx

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import GhostNoResults from '../components/GhostNoResults.jsx';
import Footer from '../components/Footer';
import 'src/assets/styles/buscarProjetos.css';

// --- ÍCONES (SVG embutido para simplicidade) ---
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconDollarSign = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;

// --- DADOS MOCADOS (Mock Data) ---
const skillIcons = { 'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', 'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', 'GIT': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', 'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', 'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', 'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', 'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', 'UX Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg', 'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg', 'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', 'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg', 'Segurança': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', 'PenTest': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', 'Firewall': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', 'Unity': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', 'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg', 'Game Design': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', 'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', 'Spring Boot': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg', 'Kafka': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg', 'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', 'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', 'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', 'Multithreading': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', 'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', 'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', 'Pandas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg', 'Jupyter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg', 'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', 'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',};
const allProjectsData = [ { id: 1, client: 'TechFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', title: 'Desenvolvedor FrontEnd Sênior', category: 'frontend', location: 'Remoto', postDate: 'Publicado hoje', budget: 'R$ 8.000', description: 'Buscamos um desenvolvedor Frontend experiente para liderar a criação de interfaces ricas e interativas para nossa plataforma de SaaS.', skills: ['React', 'TypeScript', 'GIT'] }, { id: 2, client: 'DataCorp', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', title: 'Engenheiro de Dados Pleno', category: 'data', location: 'São Paulo, BR', postDate: 'Publicado há 2 dias', budget: 'R$ 7.500', description: 'Vaga para engenheiro de dados com foco em construção e manutenção de pipelines de dados em Python e SQL.', skills: ['Python', 'SQL', 'Django'] }, { id: 3, client: 'InnovateUX', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg', title: 'UI/UX Designer para App Mobile', category: 'design', location: 'Remoto', postDate: 'Publicado há 3 dias', budget: 'R$ 6.000', description: 'Procuramos um designer talentoso para criar a experiência de usuário de um novo aplicativo de finanças pessoais.', skills: ['Figma', 'UX Design'] }, { id: 4, client: 'CloudSolutions', logo: 'https://png.pngtree.com/element_our/sm/20180410/sm_5acd1797b5783.jpg', title: 'Arquiteto Cloud AWS', category: 'infra', location: 'Rio de Janeiro, BR', postDate: 'Publicado há 1 semana', budget: 'R$ 12.000', description: 'Arquiteto de soluções Cloud para projetar e implementar infraestrutura escalável na AWS.', skills: ['AWS', 'Docker', 'Kubernetes'] }, { id: 5, client: 'SecureNet', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', title: 'Especialista em Cibersegurança', category: 'seguranca', location: 'Remoto', postDate: 'Publicado há 5 dias', budget: 'R$ 9.000', description: 'Vaga para profissional com experiência em segurança de redes e aplicações web, buscando vulnerabilidades e implementando defesas.', skills: ['Segurança', 'PenTest', 'Firewall'] }, { id: 6, client: 'GameDev Inc.', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', title: 'Desenvolvedor de Jogos Unity', category: 'gamedev', location: 'Belo Horizonte, BR', postDate: 'Publicado há 4 dias', budget: 'R$ 7.000', description: 'Desenvolvedor Unity com paixão por jogos para criar novas experiências interativas.', skills: ['Unity', 'C#', 'Game Design'] }, { id: 7, client: 'E-commerce Solutions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', title: 'Desenvolvedor Back-End Java', category: 'backend', location: 'Remoto', postDate: 'Publicado há 1 dia', budget: 'R$ 9.500', description: 'Experiência em Spring Boot e microserviços.', skills: ['Java', 'Spring Boot', 'Kafka', 'SQL'] }, { id: 8, client: 'Digital Agency', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg', title: 'Desenvolvedor Vue.js', category: 'frontend', location: 'Curitiba, BR', postDate: 'Publicado há 3 dias', budget: 'R$ 7.200', description: 'Criação de interfaces responsivas e de alta performance.', skills: ['Vue.js', 'HTML', 'CSS', 'JavaScript'] }, { id: 9, client: 'FinTech Group', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', title: 'Engenheiro de Software C++', category: 'backend', location: 'São Paulo, BR', postDate: 'Publicado há 5 dias', budget: 'R$ 10.000', description: 'Desenvolvimento de sistemas de alta frequência para o mercado financeiro.', skills: ['C++', 'Multithreading', 'Linux'] }, { id: 10, client: 'HealthCare AI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg', title: 'Cientista de Dados Júnior', category: 'data', location: 'Remoto', postDate: 'Publicado hoje', budget: 'R$ 5.000', description: 'Análise de dados para modelos de saúde preditiva.', skills: ['Python', 'TensorFlow', 'Pandas', 'Jupyter'] },];


// --- SUB-COMPONENTE: FilterSidebar ---
const FilterSidebar = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFilters(prev => {
                const newLocations = checked
                    ? [...(prev.location || []), value]
                    : (prev.location || []).filter(loc => loc !== value);
                return { ...prev, location: newLocations };
            });
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSkillKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const newSkill = e.target.value.trim();
            if (!filters.skills.includes(newSkill)) {
                setFilters(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            }
            e.target.value = '';
        }
    };

    const removeSkill = (skillToRemove) => {
        setFilters(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    return (
        <aside className="filter-sidebar">
            <h2 className="filter-title">Filtros</h2>
            <div className="filter-group">
                <h3>Buscar por Habilidade</h3>
                <div className="search-input-wrapper">
                    <IconSearch />
                    <input type="text" placeholder="Digite uma skill e Enter..." onKeyDown={handleSkillKeyDown} />
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
            <div className="filter-group">
                <h3>Categoria</h3>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">Todas</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="design">Design</option>
                    <option value="infra">Infraestrutura</option>
                    <option value="data">Dados</option>
                </select>
            </div>
            <div className="filter-group">
                <h3>Faixa de Orçamento</h3>
                <div className="filter-options">
                    <label className="custom-radio"><input type="radio" name="budget" value="" checked={filters.budget === ''} onChange={handleFilterChange} /><span className="radio-label">Qualquer Valor</span></label>
                    <label className="custom-radio"><input type="radio" name="budget" value="0-3000" checked={filters.budget === '0-3000'} onChange={handleFilterChange} /><span className="radio-label">Até R$ 3.000</span></label>
                    <label className="custom-radio"><input type="radio" name="budget" value="3000-7000" checked={filters.budget === '3000-7000'} onChange={handleFilterChange} /><span className="radio-label">R$ 3.000 a R$ 7.000</span></label>
                    <label className="custom-radio"><input type="radio" name="budget" value="7000-999999" checked={filters.budget === '7000-999999'} onChange={handleFilterChange} /><span className="radio-label">Acima de R$ 7.000</span></label>
                </div>
            </div>
            <div className="filter-group">
                <h3>Modalidade</h3>
                <div className="filter-options">
                    <label className="custom-checkbox"><input type="checkbox" name="location" value="Remoto" checked={filters.location?.includes('Remoto')} onChange={handleFilterChange} /><span className="checkbox-label">Remoto</span></label>
                    <label className="custom-checkbox"><input type="checkbox" name="location" value="Presencial" checked={filters.location?.includes('Presencial')} onChange={handleFilterChange} /><span className="checkbox-label">Presencial</span></label>
                </div>
            </div>
        </aside>
    );
};

// --- SUB-COMPONENTE: SkillTagWithIcon ---
const SkillTagWithIcon = ({ skillName }) => {
    const iconSrc = skillIcons[skillName];
    return (
        <div className="skill-tag-with-icon">
            {iconSrc && <img src={iconSrc} alt={`${skillName} icon`} className="skill-icon" />}
            <span>{skillName}</span>
        </div>
    );
};

// --- SUB-COMPONENTE: ProjectCard ---
const ProjectCard = ({ project }) => (
    <article className="project-card">
        <header className="card-header">
            <img src={project.logo} alt={`${project.client} logo`} className="client-logo" />
            <div className="client-info">
                <span className="client-name">{project.client}</span>
                <small className="post-date">{project.postDate}</small>
            </div>
        </header>
        <div className="card-body">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
        </div>
        <footer className="card-footer">
            <div className="project-skills">
                {project.skills.slice(0, 4).map(skill => (
                    <SkillTagWithIcon key={skill} skillName={skill} />
                ))}
            </div>
            <div className="card-meta-action">
                <div className="project-meta">
                    <span><IconMapPin /> {project.location}</span>
                    <span><IconDollarSign /> {project.budget}</span>
                </div>
                <Link to={`/dashboard/projeto/${project.id}`} className="proposta-btn">Ver Detalhes</Link>
            </div>
        </footer>
    </article>
);

// --- SUB-COMPONENTE: Pagination ---
const Pagination = ({ projectsPerPage, totalProjects, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalProjects / projectsPerPage);
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
        const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrent) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxPagesBeforeCurrent;
            endPage = currentPage + maxPagesAfterCurrent;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-container">
            <ul>
                <li onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>&laquo;</li>
                {startPage > 1 && (<li onClick={() => paginate(1)}>1</li>)}
                {startPage > 2 && (<li className="disabled">...</li>)}
                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>{number}</li>
                ))}
                {endPage < totalPages - 1 && (<li className="disabled">...</li>)}
                {endPage < totalPages && (<li onClick={() => paginate(totalPages)}>{totalPages}</li>)}
                <li onClick={() => paginate(currentPage + 1)} className={currentPage === totalPages ? 'disabled' : ''}>&raquo;</li>
            </ul>
        </nav>
    );
};

// --- COMPONENTE PRINCIPAL: BuscarProjetos ---
const BuscarProjetos = () => {
  const [filters, setFilters] = useState({ skills: [], category: '', budget: '', location: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const filteredProjects = useMemo(() => {
    const parseBudget = (budgetStr) => parseFloat(budgetStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
    return allProjectsData.filter(project => {
        const skillMatch = filters.skills.length === 0 || filters.skills.every(filterSkill =>
            project.skills.some(projectSkill => projectSkill.toLowerCase().includes(filterSkill.toLowerCase()))
        );
        const categoryMatch = filters.category === '' || project.category === filters.category;
        const budgetMatch = (() => {
            if (filters.budget === '') return true;
            const [min, max] = filters.budget.split('-').map(Number);
            const projectBudget = parseBudget(project.budget);
            return projectBudget >= min && projectBudget <= max;
        })();
        const locationMatch = (() => {
            if (filters.location.length === 0) return true;
            const isRemote = project.location.toLowerCase() === 'remoto';
            const wantsRemote = filters.location.includes('Remoto');
            const wantsPresencial = filters.location.includes('Presencial');
            if (wantsRemote && wantsPresencial) return true;
            if (wantsRemote) return isRemote;
            if (wantsPresencial) return !isRemote;
            return false;
        })();
        return skillMatch && categoryMatch && budgetMatch && locationMatch;
    });
  }, [filters]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(filteredProjects.length / projectsPerPage)) {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="search-page-container">
      <div className="buscar-projetos-container">
        <header className="page-header">
          <h1>Encontre o Projeto Perfeito</h1>
          <p>Navegue pelas oportunidades e encontre o trabalho ideal para as suas habilidades.</p>
        </header>

        <div className="search-page-layout">
          <FilterSidebar filters={filters} setFilters={setFilters} />
          <main className="projects-main-content">
            {currentProjects.length > 0 ? (
              <>
                <div className="project-list">
                  {currentProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
                {filteredProjects.length > projectsPerPage && (
                  <Pagination
                    projectsPerPage={projectsPerPage}
                    totalProjects={filteredProjects.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                )}
              </>
            ) : (
              <GhostNoResults />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuscarProjetos;