import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import inno from './ai5.jpg';
import ai from './ai.jpg';
import pp from './pp.jpg';
import eg from './eg.jpg';
import space from './space.jpg';
import agr from './agr.jpg';  
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; 
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton } from '@coreui/react';

function Home() {
  const projects = [
    { id: 1, title: 'AI for Healthcare', description: 'A cutting-edge solution for personalized diagnostics.', image: ai },
    { id: 2, title: 'Renewable Energy Mapping', description: 'Explore global opportunities for clean energy development.', image: eg },
    { id: 3, title: 'Quantum Computing Applications', description: 'Innovative ideas for future computational advancements.', image: pp },
    { id: 4, title: 'Space Exploration 2030', description: 'A roadmap to the next frontier of space research.', image: space },
    { id: 5, title: 'Sustainable Agriculture', description: 'New practices to combat global food challenges.', image: agr }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Share What You Have <br></br>
          Get What You Need</h1>
          <Link to="/projects" className="cta-button">Start Now</Link>
        </div>
        <div className="hero-image">
          <img src={inno} alt="Collaboration illustration" />
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="latest-projects-section">
        <h2>Latest Services</h2>
        <div className="projects-container">
          {projects.slice(0, 3).map((project) => (
            <CCard style={{ width: '18rem' }} key={project.id}>
              <CCardImage orientation="top" src={project.image} />
              <CCardBody>
                <CCardTitle>{project.title}</CCardTitle>
                <CCardText>{project.description}</CCardText>
                <Link to={`/project/${project.id}`}>
                  <CButton color="primary">Learn More</CButton>
                </Link>
              </CCardBody>
            </CCard>
          ))}
        </div>
      </section>

      {/* Most Famous Projects Section */}
      <section className="famous-projects-section">
        <h2>Most Famous Services</h2>
        <div className="projects-container">
          {projects.slice(3).map((project) => (
            <CCard style={{ width: '18rem' }} key={project.id}>
              <CCardImage orientation="top" src={project.image} />
              <CCardBody>
                <CCardTitle>{project.title}</CCardTitle>
                <CCardText>{project.description}</CCardText>
                <Link to={`/project/${project.id}`}>
                  <CButton color="primary">Learn More</CButton>
                </Link>
              </CCardBody>
            </CCard>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="feedback-section">
        <h2>Community Feedback</h2>
        <p>"This platform changed the way I work! I exchanged my graphic design skills for marketing advice, and it was a win-win. Highly recommend!" – Sarah M. </p>
        <p>"I love the sense of community here. Sharing skills instead of money makes services more accessible to everyone!" –  Emma R</p>
        <Link to="/feedback" className="cta-button">Share Your Feedback</Link>
      </section>

      {/* Networking Section */}
      <section className="networking-section">
        <h2>Connect and Collaborate</h2>
        <p>Exchange Services, Build Connections!</p>
        <Link to="/network" className="cta-button">Explore Network</Link>
      </section>

      {/* Footer */}
    </div>
  );
}

export default Home;
