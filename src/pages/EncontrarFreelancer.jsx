import React, { useState, } from 'react';
import '../assets/styles/encontrarFreelancers.css';

// --- Ícones (SVGs embutidos para simplicidade) ---
const IconStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);
const IconSearch = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);
const IconMapPin = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);
const IconDollarSign = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

// --- DADOS DE EXEMPLO (expansão da sua imagem) ---
const allFreelancersData = [
    { id: 1, name: 'Ana Silva', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734b413?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.8, specialty: 'UI/UX Designer & Product', description: 'Especialista em Logomarcas, Identidade Visual, Rótulos e Embalagens. Quero tornar seu sonho realidade!', skills: ['Figma', 'UX Research', 'Design Gráfico'], location: 'São Paulo, BR', price: 'R$ 80/h' },
    { id: 2, name: 'João Mendes', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 5.0, specialty: 'Desenvolvedor Back-End Sênior', description: 'Vasta experiência em sistemas de alta performance. Atuou em projetos para e-commerce e fintechs.', skills: ['Java', 'Spring', 'APIs REST', 'Microserviços'], location: 'Remoto', price: 'R$ 150/h' },
    { id: 3, name: 'Maria Oliveira', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.9, specialty: 'Desenvolvedora Mobile', description: 'Desenvolvimento de aplicativos Android e iOS com foco em experiência do usuário.', skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'], location: 'Rio de Janeiro, BR', price: 'R$ 120/h' },
    { id: 4, name: 'Carlos Santos', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.7, specialty: 'Especialista em Marketing Digital', description: 'Gerenciamento de campanhas de Tráfego Pago e Criação de Conteúdo.', skills: ['Tráfego Pago', 'SEO', 'Conteúdo', 'Análise de Dados'], location: 'Remoto', price: 'R$ 95/h' },
    { id: 5, name: 'Camila Rodrigues', photo: 'https://images.unsplash.com/photo-1520813795817-f58c49a62241?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.8, specialty: 'Cientista de Dados', description: 'Transformando dados em insights valiosos para tomada de decisões estratégicas.', skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'], location: 'São Paulo, BR', price: 'R$ 130/h' },
    { id: 6, name: 'Pedro Henrique', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.9, specialty: 'Arquiteto de Soluções Cloud', description: 'Especialista em migração e otimização de infraestruturas para a nuvem.', skills: ['AWS', 'Docker', 'Kubernetes'], location: 'Remoto', price: 'R$ 160/h' },
    { id: 7, name: 'Fernanda Lima', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.6, specialty: 'Content Creator', description: 'Criação de conteúdo envolvente para redes sociais e blogs.', skills: ['Copywriting', 'SEO', 'Edição de Vídeo'], location: 'Belo Horizonte, BR', price: 'R$ 70/h' },
];

// --- COMPONENTES ---

const FreelancerCard = ({ photo, name, rating, specialty, description, location, price }) => (
    <article className="freelancer-card">
        <div className="freelancer-header">
            <img src={photo} alt={`Foto de ${name}`} className="freelancer-photo" />
            <div className="freelancer-info">
                <h2 className="freelancer-name">{name}</h2>
                <div className="freelancer-rating">
                    <IconStar />
                    <span>{rating.toFixed(1)}</span>
                </div>
            </div>
            <button className="invite-btn">Convidar</button>
        </div>
        <h3 className="freelancer-specialty">{specialty}</h3>
        <p className="freelancer-description">{description}</p>
        <div className="freelancer-metadata">
            <span><IconMapPin /> {location}</span>
            <span><IconDollarSign /> {price}</span>
        </div>
    </article>
);

const Pagination = ({ freelancersPerPage, totalFreelancers, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalFreelancers / freelancersPerPage);

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

const EncontrarFreelancer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const freelancersPerPage = 4; // Define quantos freelancers por página

    const indexOfLastFreelancer = currentPage * freelancersPerPage;
    const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
    const currentFreelancers = allFreelancersData.slice(indexOfFirstFreelancer, indexOfLastFreelancer);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(allFreelancersData.length / freelancersPerPage)) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo
        }
    };

    return (
        <div className="freelancer-container">
            <header className="page-header">
                <h1>Encontre o Freelancer Ideal</h1>
                <p>Navegue pela nossa comunidade e descubra o talento perfeito para o seu projeto.</p>
                <div className="search-bar">
                    <IconSearch />
                    <input type="text" placeholder="Busque por habilidades ou nome..." />
                </div>
            </header>

            <main className="freelancer-list">
                {currentFreelancers.length > 0 ? (
                    currentFreelancers.map(freelancer => (
                        <FreelancerCard 
                            key={freelancer.id}
                            photo={freelancer.photo}
                            name={freelancer.name}
                            rating={freelancer.rating}
                            specialty={freelancer.specialty}
                            description={freelancer.description}
                            location={freelancer.location}
                            price={freelancer.price}
                        />
                    ))
                ) : (
                    <p>Nenhum freelancer encontrado.</p>
                )}
            </main>
            
            {allFreelancersData.length > freelancersPerPage && (
                <Pagination 
                    freelancersPerPage={freelancersPerPage}
                    totalFreelancers={allFreelancersData.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
};

export default EncontrarFreelancer;