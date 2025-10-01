// src/pages/InviteFreelancerPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Importe o CSS da página de detalhes do projeto, pois o layout é similar
import '../assets/styles/projectDetails.css'; 
import '../assets/styles/inviteFreelancer.css'; // Criaremos este CSS simples a seguir

// Dados mockados do Freelancer (Substitua pela sua API de busca)
const mockFreelancer = {
    id: 123,
    name: 'Ana Silva',
    title: 'UI/UX Designer & Product',
    photoUrl: 'URL_DA_FOTO_DE_ANA', // Use uma URL real da sua base de dados
    rate: 'R$ 80/h',
    location: 'São Paulo, BR'
};

// Dados mockados dos Projetos do Cliente
const mockClientProjects = [
    { id: 'proj1', title: 'Redesign da Landing Page' },
    { id: 'proj2', title: 'Desenvolvimento do Painel Admin' },
    { id: 'proj3', title: 'Criação de Logo e Identidade Visual' },
];


const InviteFreelancerPage = () => {
    // Pega o ID da URL (para uso futuro na API)
    const { freelancerId } = useParams(); 
    
    // Estados do componente
    const [freelancer, setFreelancer] = useState(mockFreelancer);
    const [form, setForm] = useState({
        projectId: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' ou 'error'

    // Simulação da busca do freelancer
    useEffect(() => {
        // Se estivesse usando API:
        // fetchFreelancer(freelancerId).then(setFreelancer);
        setFreelancer(mockFreelancer); 
    }, [freelancerId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        // --- Lógica de Envio para a API ---
        setTimeout(() => {
            console.log('Enviando convite:', { freelancerId, ...form });
            
            // Simulação de sucesso
            setIsSubmitting(false);
            setSubmissionStatus('success');

            // Limpa o formulário após sucesso (opcional)
            setForm({ projectId: '', message: '' });
        }, 1500);
    };

    return (
        <div className="project-details-page-wrapper">
            <div className="project-details-page">
                
                <div className="details-header">
                    <h1 className="job-title" style={{fontSize: '2rem'}}>
                        Convidar {freelancer.name} para um Projeto
                    </h1>
                    <p className="company-name">Envie um convite personalizado para Ana Silva iniciar uma proposta.</p>
                </div>
                
                <div className="details-layout-grid">
                    
                    {/* --- CONTEÚDO PRINCIPAL (FORMULÁRIO) --- */}
                    <main className="details-main-content">
                        <form onSubmit={handleSubmit} className="invite-form">
                            
                            <div className="form-group">
                                <label htmlFor="projectId">1. Selecione o Projeto</label>
                                <select
                                    id="projectId"
                                    name="projectId"
                                    value={form.projectId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Escolha um dos seus projetos publicados</option>
                                    {mockClientProjects.map(p => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                                <p className="help-text">O freelancer receberá o link para este projeto.</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">2. Escreva uma Mensagem de Convite</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="8"
                                    placeholder={`Olá ${freelancer.name},\n\nVimos seu perfil e acreditamos que você é o candidato ideal para o nosso projeto "${form.projectId || 'Seu Projeto Selecionado'}".\n\nPor favor, veja os detalhes e nos envie uma proposta.\n\nAtenciosamente,\n[Seu Nome/Empresa]`}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <p className="help-text">Uma mensagem personalizada aumenta as chances de aceitação.</p>
                            </div>

                            {submissionStatus === 'success' && (
                                <div className="success-message">
                                    <i className="fas fa-check-circle"></i> Convite enviado com sucesso para {freelancer.name}!
                                    <Link to="/dashboard/transacoes" style={{marginLeft: '10px'}}>Ver Convites Pendentes</Link>
                                </div>
                            )}
                            
                            {submissionStatus === 'error' && (
                                <div className="error-message">
                                    <i className="fas fa-times-circle"></i> Ocorreu um erro ao enviar o convite. Tente novamente.
                                </div>
                            )}

                            <button type="submit" className="submit-button" disabled={isSubmitting || submissionStatus === 'success'}>
                                {isSubmitting ? 'Enviando...' : 'Enviar Convite'}
                            </button>
                            
                        </form>
                    </main>

                    {/* --- BARRA LATERAL (INFORMAÇÕES DO FREELANCER) --- */}
                    <aside className="details-sidebar">
                        
                        <div className="sidebar-card employer-card">
                            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px'}}>
                                {/* Opcional: Adicionar foto do freelancer */}
                                {/* <img src={freelancer.photoUrl} alt={freelancer.name} className="freelancer-photo" /> */}
                                <div>
                                    <h3 style={{borderBottom: 'none', paddingBottom: '0'}}>{freelancer.name}</h3>
                                    <p className="employer-title">{freelancer.title}</p>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i> 
                                <span>{freelancer.location}</span>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-money-bill-wave"></i> 
                                <span>{freelancer.rate} (Estimativa de Hora)</span>
                            </div>
                            
                            <Link to={`/dashboard/perfil/${freelancerId}`} className="view-profile-link">
                                Ver Perfil Completo
                            </Link>
                        </div>
                        
                        <div className="sidebar-card employer-card">
                             <h3 style={{borderBottom: 'none', paddingBottom: '0'}}>Como funciona o convite?</h3>
                             <ul className="detail-list responsibilities-list" style={{paddingTop: '10px'}}>
                                 <li><i className="fas fa-check-circle"></i>O freelancer recebe seu convite e o link do projeto.</li>
                                 <li><i className="fas fa-check-circle"></i>Ele analisa e envia uma proposta formal, se interessado.</li>
                                 <li><i className="fas fa-check-circle"></i>Você negocia e contrata diretamente pela plataforma.</li>
                             </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default InviteFreelancerPage;