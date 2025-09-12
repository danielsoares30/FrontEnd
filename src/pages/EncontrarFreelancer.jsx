import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../assets/styles/encontrarFreelancers.css';

// --- ÍCONES ---
const IconStar = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const IconDollarSign = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;

// --- DADOS DE EXEMPLO ---
const allFreelancersData = [ { id: 1, name: 'Ana Silva', photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734b413?q=80&w=1976&auto=format&fit=crop', rating: 4.8, specialty: 'UI/UX Designer & Product', description: 'Especialista em Logomarcas, Identidade Visual, Rótulos e Embalagens. Quero tornar seu sonho realidade!', skills: ['Figma', 'UX Research', 'Design Gráfico'], location: 'São Paulo, BR', price: 'R$ 80/h' }, { id: 2, name: 'João Mendes', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop', rating: 5.0, specialty: 'Desenvolvedor Back-End Sênior', description: 'Vasta experiência em sistemas de alta performance. Atuou em projetos para e-commerce e fintechs.', skills: ['Java', 'Spring', 'APIs REST', 'Microserviços'], location: 'Remoto', price: 'R$ 150/h' }, { id: 3, name: 'Maria Oliveira', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop', rating: 4.9, specialty: 'Desenvolvedora Mobile', description: 'Desenvolvimento de aplicativos Android e iOS com foco em experiência do usuário.', skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'], location: 'Rio de Janeiro, BR', price: 'R$ 120/h' }, { id: 4, name: 'Carlos Santos', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop', rating: 4.7, specialty: 'Especialista em Marketing Digital', description: 'Gerenciamento de campanhas de Tráfego Pago e Criação de Conteúdo.', skills: ['Tráfego Pago', 'SEO', 'Conteúdo', 'Análise de Dados'], location: 'Remoto', price: 'R$ 95/h' }, { id: 5, name: 'Camila Rodrigues', photo: 'https://images.unsplash.com/photo-1520813795817-f58c49a62241?q=80&w=1974&auto=format&fit=crop', rating: 4.8, specialty: 'Cientista de Dados', description: 'Transformando dados em insights valiosos para tomada de decisões estratégicas.', skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'], location: 'São Paulo, BR', price: 'R$ 130/h' }, { id: 6, name: 'Pedro Henrique', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop', rating: 4.9, specialty: 'Arquiteto de Soluções Cloud', description: 'Especialista em migração e otimização de infraestruturas para a nuvem.', skills: ['AWS', 'Docker', 'Kubernetes'], location: 'Remoto', price: 'R$ 160/h' }, { id: 7, name: 'Fernanda Lima', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=1974&auto=format&fit=crop', rating: 4.6, specialty: 'Content Creator', description: 'Criação de conteúdo envolvente para redes sociais e blogs.', skills: ['Copywriting', 'SEO', 'Edição de Vídeo'], location: 'Belo Horizonte, BR', price: 'R$ 70/h' },];

// --- SUB-COMPONENTES ---

const FilterSidebar = ({ filters, setFilters }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <aside className="filter-sidebar">
            <h2 className="filter-title">Filtros</h2>
            <div className="filter-group">
                <h3>Especialidade</h3>
                <select name="specialty" value={filters.specialty} onChange={handleInputChange}>
                    <option value="">Todas</option>
                    <option value="UI/UX Designer & Product">UI/UX & Produto</option>
                    <option value="Desenvolvedor Back-End Sênior">Back-End</option>
                    <option value="Desenvolvedora Mobile">Mobile</option>
                    <option value="Especialista em Marketing Digital">Marketing Digital</option>
                    <option value="Cientista de Dados">Dados</option>
                </select>
            </div>
            <div className="filter-group">
                <h3>Preço por Hora</h3>
                <div className="filter-options">
                    <label className="custom-radio"><input type="radio" name="price" value="" checked={filters.price === ''} onChange={handleInputChange} /><span className="radio-label">Qualquer Valor</span></label>
                    <label className="custom-radio"><input type="radio" name="price" value="0-90" checked={filters.price === '0-90'} onChange={handleInputChange} /><span className="radio-label">Até R$ 90/h</span></label>
                    <label className="custom-radio"><input type="radio" name="price" value="90-140" checked={filters.price === '90-140'} onChange={handleInputChange} /><span className="radio-label">R$ 90 a R$ 140/h</span></label>
                    <label className="custom-radio"><input type="radio" name="price" value="140-9999" checked={filters.price === '140-9999'} onChange={handleInputChange} /><span className="radio-label">Acima de R$ 140/h</span></label>
                </div>
            </div>
            <div className="filter-group">
                <h3>Avaliação Mínima</h3>
                <div className="filter-options">
                    <label className="custom-radio"><input type="radio" name="rating" value="0" checked={filters.rating === '0'} onChange={handleInputChange} /><span className="radio-label">Qualquer</span></label>
                    <label className="custom-radio"><input type="radio" name="rating" value="4.5" checked={filters.rating === '4.5'} onChange={handleInputChange} /><span className="radio-label">4.5 estrelas ou mais</span></label>
                    <label className="custom-radio"><input type="radio" name="rating" value="4.8" checked={filters.rating === '4.8'} onChange={handleInputChange} /><span className="radio-label">4.8 estrelas ou mais</span></label>
                </div>
            </div>
        </aside>
    );
};

const FreelancerCard = ({ freelancer }) => (
    <article className="freelancer-card">
        <div className="card-content">
            <header className="freelancer-header">
                <img src={freelancer.photo} alt={`Foto de ${freelancer.name}`} className="freelancer-photo" />
                <div className="freelancer-info">
                    <h2 className="freelancer-name">{freelancer.name}</h2>
                    <div className="freelancer-rating"><IconStar /><span>{freelancer.rating.toFixed(1)}</span></div>
                </div>
                <Link to="#" className="invite-btn">Convidar</Link>
            </header>
            <div className="freelancer-body">
                <h3 className="freelancer-specialty">{freelancer.specialty}</h3>
                <p className="freelancer-description">{freelancer.description}</p>
                <div className="freelancer-skills">
                    {freelancer.skills.slice(0, 4).map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
        <footer className="freelancer-footer">
            <span><IconMapPin /> {freelancer.location}</span>
            <span><IconDollarSign /> {freelancer.price}</span>
        </footer>
    </article>
);

const Pagination = ({ freelancersPerPage, totalFreelancers, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalFreelancers / freelancersPerPage);
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        // Mostra todas as páginas se o total for menor ou igual ao máximo
        startPage = 1;
        endPage = totalPages;
    } else {
        // Calcula o range de páginas a serem mostradas
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
                <li onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>
                    &laquo;
                </li>

                {startPage > 1 && (
                    <li onClick={() => paginate(1)}>1</li>
                )}
                {startPage > 2 && (
                    <li className="disabled">...</li>
                )}

                {pageNumbers.map(number => (
                    <li key={number} onClick={() => paginate(number)} className={number === currentPage ? 'active' : ''}>
                        {number}
                    </li>
                ))}

                {endPage < totalPages - 1 && (
                    <li className="disabled">...</li>
                )}
                {endPage < totalPages && (
                     <li onClick={() => paginate(totalPages)}>{totalPages}</li>
                )}

                <li onClick={() => paginate(currentPage + 1)} className={currentPage === totalPages ? 'disabled' : ''}>
                    &raquo;
                </li>
            </ul>
        </nav>
    );
};

// --- COMPONENTE PRINCIPAL ---
const EncontrarFreelancer = () => {
    const [filters, setFilters] = useState({ searchTerm: '', specialty: '', price: '', rating: '0' });
    const [currentPage, setCurrentPage] = useState(1);
    const freelancersPerPage = 6;

    const filteredFreelancers = useMemo(() => {
        const parsePrice = (priceStr) => parseFloat(priceStr.replace('R$', '').replace('/h', '').trim());
        
        return allFreelancersData.filter(freelancer => {
            const searchTermLower = filters.searchTerm.toLowerCase();
            const searchMatch = filters.searchTerm === '' ||
                freelancer.name.toLowerCase().includes(searchTermLower) ||
                freelancer.specialty.toLowerCase().includes(searchTermLower) ||
                freelancer.skills.some(skill => skill.toLowerCase().includes(searchTermLower));

            const specialtyMatch = filters.specialty === '' || freelancer.specialty === filters.specialty;

            const priceMatch = (() => {
                if (filters.price === '') return true;
                const [min, max] = filters.price.split('-').map(Number);
                const freelancerPrice = parsePrice(freelancer.price);
                return freelancerPrice >= min && freelancerPrice <= max;
            })();

            const ratingMatch = freelancer.rating >= parseFloat(filters.rating);

            return searchMatch && specialtyMatch && priceMatch && ratingMatch;
        });
    }, [filters]);

    const indexOfLastFreelancer = currentPage * freelancersPerPage;
    const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
    const currentFreelancers = filteredFreelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= Math.ceil(filteredFreelancers.length / freelancersPerPage)) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="freelancer-page-container">
            <div className="encontrar-freelancers-container">
                <header className="page-header">
                    <h1>Encontre o Freelancer Ideal</h1>
                    <p>Navegue pela nossa comunidade e descubra o talento perfeito para o seu projeto.</p>
                    <div className="search-bar">
                        <IconSearch />
                        <input type="text" name="searchTerm" value={filters.searchTerm} onChange={(e) => setFilters(prev => ({...prev, searchTerm: e.target.value}))} placeholder="Busque por nome, habilidade ou especialidade..." />
                    </div>
                </header>

                <div className="search-page-layout">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                    <main className="freelancer-list">
                        {currentFreelancers.length > 0 ? (
                            currentFreelancers.map(freelancer => (
                                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
                            ))
                        ) : (
                            <p>Nenhum freelancer encontrado com os filtros selecionados.</p> /* Melhorar esta mensagem */
                        )}
                    </main>
                </div>
                
                {filteredFreelancers.length > freelancersPerPage && (
                    <Pagination freelancersPerPage={freelancersPerPage} totalFreelancers={filteredFreelancers.length} paginate={paginate} currentPage={currentPage} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EncontrarFreelancer;