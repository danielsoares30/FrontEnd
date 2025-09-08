// src/pages/AboutUs.jsx
import React from 'react';
import '../assets/styles/SobreNos.css';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <header className="about-us-header">
                <h1>Sobre Nós</h1>
                <p>Nossa história, nossa missão e o que nos move.</p>
            </header>
            
            <section className="about-us-section">
                <div className="section-content">
                    <h2>Nossa História</h2>
                    <p>
                        A **[Nome do Seu Site/Empresa]** nasceu da paixão por conectar talentos a oportunidades. Vimos que o mundo do trabalho estava mudando, e que a flexibilidade e a autonomia se tornavam cada vez mais importantes. Nossa plataforma foi criada para ser a ponte entre freelancers talentosos e empresas que precisam de suas habilidades, de forma rápida, segura e eficiente.
                    </p>
                    <p>
                        Começamos como um pequeno projeto, mas com o apoio de nossa crescente comunidade, evoluímos para um espaço onde a criatividade e a inovação prosperam. Cada projeto concluído em nossa plataforma é um passo a mais em direção a um futuro de trabalho mais flexível e justo para todos.
                    </p>
                </div>
                <div className="section-image">
                    {/* Imagem de exemplo, substitua por uma imagem real da sua equipe ou do conceito */}
                    <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Nossa equipe trabalhando" />
                </div>
            </section>

            <section className="about-us-section reverse-layout">
                <div className="section-content">
                    <h2>Missão e Valores</h2>
                    <p>
                        Nossa **missão** é empoderar profissionais e empresas, fornecendo as ferramentas para que eles possam alcançar seus objetivos. Queremos ser mais do que uma plataforma: queremos ser um parceiro no crescimento.
                    </p>
                    <p>
                        Nossos **valores** são a transparência, a inovação e o respeito. Acreditamos que a confiança é a base de todo bom relacionamento, e trabalhamos para criar um ambiente onde todos se sintam seguros e valorizados. A sua jornada é a nossa jornada.
                    </p>
                </div>
                <div className="section-image">
                    {/* Outra imagem de exemplo */}
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Visão e missão da empresa" />
                </div>
            </section>
        </div>
    );
};

export default AboutUs;