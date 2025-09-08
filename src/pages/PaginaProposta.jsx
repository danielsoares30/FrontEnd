// src/pages/MakeProposal.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/PaginaPropostas.css';

const PaginaProposta = () => {
    // Pegamos o ID do projeto da URL. Você precisará passar o ID do projeto.
    const { projectId } = useParams();

    // Estado do formulário
    const [proposalData, setProposalData] = useState({
        price: '',
        deadline: '',
        message: '',
    });

    // Lógica para lidar com as mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProposalData(prevData => ({ ...prevData, [name]: value }));
    };

    // Lógica para submeter o formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Proposta submetida para o projeto:', projectId);
        console.log(proposalData);
        // Aqui você chamaria a sua API para enviar os dados
        alert('Proposta enviada com sucesso!');
        // Redirecionar o usuário para a página do dashboard ou de projetos
    };

    // Dados de exemplo do projeto (idealmente, você buscaria esses dados da sua API)
    const project = {
        title: 'Desenvolvimento FrontEnd Sênior',
        client: 'TechFlow'
    };

    return (
        <div className="proposal-container">
            <header className="proposal-header">
                <h1>Fazer Proposta</h1>
                <p>Para o projeto: <strong>{project.title}</strong></p>
            </header>

            <form className="proposal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="price">Valor da Proposta (R$)</label>
                    <input 
                        type="number" 
                        id="price" 
                        name="price" 
                        value={proposalData.price} 
                        onChange={handleChange} 
                        placeholder="Ex: 8.000,00" 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="deadline">Prazo de Entrega (em dias)</label>
                    <input 
                        type="number" 
                        id="deadline" 
                        name="deadline" 
                        value={proposalData.deadline} 
                        onChange={handleChange} 
                        placeholder="Ex: 30" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Mensagem para o Cliente</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={proposalData.message} 
                        onChange={handleChange} 
                        placeholder="Descreva por que você é o freelancer ideal para este projeto..." 
                        rows="6" 
                        required 
                    />
                </div>

                <button type="submit" className="submit-proposal-btn">
                    Enviar Proposta
                </button>
            </form>
        </div>
    );
};

export default PaginaProposta;