import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, Clock, Globe, ChevronLeft } from 'lucide-react';
import './ProjectDetailPage.css';

const projectsData = {
  1: {
    title: 'AI for Healthcare',
    description: 'A cutting-edge solution for personalized diagnostics.',
    details: 'AI can revolutionize healthcare by offering personalized diagnostics based on patient data and improving the speed and accuracy of medical procedures.',
    timeline: '18 months',
    scope: 'Global Healthcare Systems',
    technologies: ['Machine Learning', 'Deep Learning', 'Neural Networks'],
    impact: [
      'Faster disease detection',
      'Personalized treatment plans', 
      'Reduced diagnostic errors'
    ],
    keyFeatures: [
      'Advanced predictive analytics',
      'Real-time patient data processing',
      'Integrated medical imaging analysis'
    ],
    collaborators: ['Medical Research Institute', 'Global Health Tech'],
    challengesSolved: [
      'Early disease detection',
      'Precision medicine',
      'Healthcare accessibility'
    ]
  },
  2: {
    title: 'Renewable Energy Mapping',
    description: 'Explore global opportunities for clean energy development.',
    details: 'Mapping renewable energy resources helps identify ideal locations for energy generation, promoting sustainability and reducing dependence on fossil fuels.',
    timeline: '24 months',
    scope: 'International Renewable Energy Assessment',
    technologies: ['GIS Mapping', 'Satellite Imagery', 'Data Analytics'],
    impact: [
      'Reduced carbon emissions',
      'Sustainable energy planning',
      'Economic opportunities'
    ],
    keyFeatures: [
      'Global renewable resource database',
      'Interactive mapping visualization',
      'Climate impact prediction'
    ],
    collaborators: ['World Energy Council', 'Climate Research Center'],
    challengesSolved: [
      'Energy transition strategy',
      'Renewable site selection',
      'Climate change mitigation'
    ]
  },
  3: {
    title: 'Quantum Computing Applications',
    description: 'Innovative ideas for future computational advancements.',
    details: 'Quantum computing holds the potential to revolutionize fields like cryptography, materials science, and complex simulations that classical computers cannot handle.',
    timeline: '36 months',
    scope: 'Advanced Computational Research',
    technologies: ['Quantum Algorithms', 'Quantum Hardware', 'Cryptography'],
    impact: [
      'Breakthrough computational power',
      'Advanced scientific simulations',
      'Enhanced cybersecurity'
    ],
    keyFeatures: [
      'Quantum error correction',
      'Scalable quantum architecture',
      'Cross-domain problem solving'
    ],
    collaborators: ['Quantum Research Labs', 'Tech Innovation Institute'],
    challengesSolved: [
      'Complex mathematical modeling',
      'Cryptographic security',
      'Scientific research limitations'
    ]
  },
  4: {
    title: 'Space Exploration 2030',
    description: 'A roadmap to the next frontier of space research.',
    details: 'Space exploration will push the boundaries of human knowledge, enabling missions to Mars, studying exoplanets, and searching for extraterrestrial life.',
    timeline: '60 months',
    scope: 'Interplanetary Research Mission',
    technologies: ['Aerospace Engineering', 'Robotic Systems', 'Advanced Propulsion'],
    impact: [
      'Mars mission readiness',
      'Exoplanet discovery',
      'Human space exploration advancement'
    ],
    keyFeatures: [
      'Advanced spacecraft design',
      'Long-duration space survival systems',
      'Autonomous exploration robotics'
    ],
    collaborators: ['NASA', 'International Space Agency'],
    challengesSolved: [
      'Sustainable space travel',
      'Extraterrestrial research',
      'Human spaceflight barriers'
    ]
  },
  5: {
    title: 'Sustainable Agriculture',
    description: 'New practices to combat global food challenges.',
    details: 'Sustainable agriculture promotes efficient resource use, reduces waste, and supports food security, while minimizing environmental impact.',
    timeline: '30 months',
    scope: 'Global Agricultural Transformation',
    technologies: ['IoT', 'AI Crop Management', 'Precision Farming'],
    impact: [
      'Increased crop yields',
      'Water conservation',
      'Reduced environmental footprint'
    ],
    keyFeatures: [
      'Smart irrigation systems',
      'Crop health monitoring',
      'Predictive farming analytics'
    ],
    collaborators: ['Agricultural Research Center', 'Global Food Initiative'],
    challengesSolved: [
      'Food security',
      'Climate-resilient farming',
      'Resource optimization'
    ]
  },
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = projectsData[id];

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
      <Link to="/Home" className="back-link">
          <ChevronLeft size={24} /> Back to Home Page
        </Link>
        <h1>{project.title}</h1>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-detail-grid">
        <div className="project-main-details">
          <h2>Project Overview</h2>
          <p>{project.details}</p>

          <div className="project-key-features">
            <h3>Key Features</h3>
            <ul>
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-sidebar">
          <div className="project-metadata">
            <div className="metadata-item">
              <Clock size={20} />
              <span>Timeline: {project.timeline}</span>
            </div>
            <div className="metadata-item">
              <Globe size={20} />
              <span>Scope: {project.scope}</span>
            </div>
            <div className="metadata-item">
              <Briefcase size={20} />
              <span>Collaborators: {project.collaborators.join(', ')}</span>
            </div>
          </div>

          <div className="project-technologies">
            <h3>Technologies</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-impact">
            <h3>Project Impact</h3>
            <ul>
              {project.impact.map((impact, index) => (
                <li key={index}>{impact}</li>
              ))}
            </ul>
          </div>

          <div className="project-challenges">
            <h3>Challenges Solved</h3>
            <ul>
              {project.challengesSolved.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;