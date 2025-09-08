// src/components/ProjectDetailCard.jsx
import React from 'react';
import '../assets/styles/projectDetailCard.css'; // Vamos criar este CSS

// Mapeamento de habilidades para ícones
// Você pode expandir isso para mais habilidades e usar CDN ou SVGs
const skillIcons = {
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    'GIT': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
    'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', // Exemplo para SQL
    // Adicione mais conforme necessário
};

const SkillTagWithIcon = ({ skillName }) => {
    const iconSrc = skillIcons[skillName];
    return (
        <div className="detail-skill-tag">
            {iconSrc && <img src={iconSrc} alt={`${skillName} icon`} className="skill-icon" />}
            <span>{skillName}</span>
        </div>
    );
};

const ProjectDetailCard = ({ title, description, skills, onProposeClick }) => {
    return (
        <div className="project-detail-card-wrapper">
            <div className="project-detail-card">
                <div className="detail-header">
                    <h2 className="detail-title">{title}</h2>
                    <button className="propose-button" onClick={onProposeClick}>
                        Faça sua proposta
                    </button>
                </div>
                <p className="detail-description">{description}</p>
                
                <div className="detail-skills-container">
                    {skills.map(skill => (
                        <SkillTagWithIcon key={skill} skillName={skill} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailCard;