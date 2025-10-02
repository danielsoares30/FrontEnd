import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// Importa o nosso novo ficheiro de estilo
import '../assets/styles/perfil.css';
import Footer from '../components/Footer'; // Importação do componente Footer

// --- DADOS DE EXEMPLO (substitua pela sua chamada à API no futuro) ---
const mockSkills = ["React", "JavaScript", "TypeScript", "Node.js", "CSS", "HTML", "Figma", "Java", "Spring Boot"];

const mockPortfolio = [
  {
    imgSrc: 'https://placehold.co/600x400/1e293b/ffffff?text=Projeto+1',
    title: 'Dashboard de Análise',
    description: 'Plataforma de visualização de dados para e-commerce.'
  },
  {
    imgSrc: 'https://placehold.co/600x400/4f46e5/ffffff?text=Projeto+2',
    title: 'Aplicação Mobile de Fitness',
    description: 'App para monitorização de treinos e nutrição.'
  },
  {
    imgSrc: 'https://placehold.co/600x400/ca8a04/ffffff?text=Projeto+3',
    title: 'Website Institucional',
    description: 'Design e desenvolvimento do website para uma startup.'
  }
];

const mockReviews = [
  {
    client: 'Tech Solutions Inc.',
    rating: 5,
    comment: 'Excelente profissional! Entregou o projeto antes do prazo e com uma qualidade impecável. Recomendo fortemente.'
  },
  {
    client: 'Inova Marketing',
    rating: 4,
    comment: 'Boa comunicação e grande conhecimento técnico. Houve apenas um pequeno atraso, mas o resultado final foi ótimo.'
  }
];


// --- COMPONENTE PRINCIPAL ---

const Perfil = () => {
  const { user } = useAuth();
  
  // A lógica para editar a bio permanece a mesma
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || 'Especialista em desenvolvimento full-stack com mais de 5 anos de experiência em React e Node.js. Apaixonado por criar interfaces rápidas e escaláveis.');

  const handleSaveBio = () => {
    console.log("A guardar a nova descrição:", bio);
    // TODO: Adicionar chamada à API para atualizar a bio
    setIsEditingBio(false);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return <div>A carregar perfil...</div>;
  }

  return (
    <div className="profile-page">
      
      {/* --- COLUNA ESQUERDA --- */}
      <aside className="profile-sidebar">
        <div className="profile-card user-info-card">
          <div className="avatar">
            {getInitials(user.nome_completo)}
          </div>
          <h2>{user.nome_completo}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-card">
          <h3>
            <span>Habilidades</span>
            <button className="edit-button">Editar</button>
          </h3>
          <div className="skills-list">
            {mockSkills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
          </div>
        </div>
      </aside>

      {/* --- COLUNA DIREITA --- */}
      <main className="profile-main-content">
        <div className="profile-card">
          <h3>
            <span>Sobre Mim</span>
            {!isEditingBio && (
              <button className="edit-button" onClick={() => setIsEditingBio(true)}>Editar</button>
            )}
          </h3>
          {isEditingBio ? (
            <div className="bio-content">
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{width: '100%', minHeight: '150px', marginBottom: '1rem'}}
              />
              <button onClick={handleSaveBio}>Guardar</button>
              <button onClick={() => setIsEditingBio(false)} style={{marginLeft: '1rem'}}>Cancelar</button>
            </div>
          ) : (
            <div className="bio-content">
              <p>{bio}</p>
            </div>
          )}
        </div>

        <div className="profile-card">
          <h3>
            <span>Portfólio</span>
            <button className="edit-button">Adicionar Projeto</button>
          </h3>
          <div className="portfolio-grid">
            {mockPortfolio.map((item, index) => (
              <div key={index} className="portfolio-item">
                <img src={item.imgSrc} alt={item.title} />
             <div className="portfolio-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <h3>Avaliações de Clientes ({mockReviews.length})</h3>
          <div className="reviews-list">
            {mockReviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <h4>{review.client}</h4>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                </div>
                <p className="review-comment">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </main>
     {<Footer /> }
    </div>
  );
};

export default Perfil;