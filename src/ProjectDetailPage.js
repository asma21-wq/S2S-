import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, Clock, Globe, ChevronLeft } from 'lucide-react';
import './ProjectDetailPage.css';

const projectsData = {
  1: {
    title: 'Web Development',
    description: 'Building responsive and modern websites tailored to your needs.',
    details: 'Our web development services include creating highly functional, user-friendly, and visually appealing websites using the latest technologies.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js'],
    keyFeatures: [
      'SEO-friendly design',
      'Cross-platform compatibility',
      'Optimized performance'
    ],

  },
  2: {
    title: 'Mobile Development',
    description: 'Creating mobile apps for Android and iOS platforms.',
    details: 'Our mobile development services focus on creating intuitive and feature-rich applications that work seamlessly on all devices.',
    technologies: ['React Native', 'Expo', 'Flutter'],
    
    keyFeatures: [
      'Cross-platform development',
      'Offline functionality',
      'Push notifications',
      'Integration with backend services',
      'Custom UI/UX design'
    ],
    
    
  },
  3: {
    title: 'Graphic Design',
    description: 'Transforming ideas into visually stunning designs.',
    details: 'We offer graphic design services that help bring your brand to life with creative and impactful visuals.',
    technologies: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'CorelDRAW'],


    keyFeatures: [
      'Custom logo design',
      'Brand identity development',
      'Print and digital media design',
      'High-quality vector graphics',
      'Creative typography and layout'
    ],
  },
  4: {
    title: 'Game Development',
    description: 'Designing and developing immersive gaming experiences.',
    details: 'Our game development services include creating engaging and interactive games for various platforms.',
    technologies: ['Unity', 'Unreal Engine', 'C#', 'Blender'],
    keyFeatures: [
      '2D and 3D game development',
      'Multiplayer game integration',
      'Real-time physics and animations',
      'Cross-platform game deployment',
      'Custom game mechanics and AI'
    ],
  },
  5: {
    title: 'Figma Prototyping',
    description: 'Bringing your ideas to life with interactive prototypes.',
    details: 'We provide Figma prototyping services to visualize and test your product designs before development.',
    technologies: ['Figma', 'Sketch', 'Adobe XD'],
    
    keyFeatures: [
      'Interactive prototypes',
      'Collaborative design environment',
      'High-fidelity wireframes'
    ],

   
  },
 6:{
  title: 'AI Chatbot Development',
  description: 'Creating intelligent chatbots to enhance customer interaction and automate responses.',
  details: 'We specialize in developing AI-driven chatbots that can understand and respond to user queries effectively, improving customer service and engagement.',
  technologies: ['Dialogflow', 'Rasa', 'Microsoft Bot Framework', 'TensorFlow'],
  keyFeatures: [
    'Natural Language Processing (NLP)',
    'Customizable conversation flows',
    'Integration with messaging platforms (e.g., WhatsApp, Facebook Messenger)'
  ],
},
7:{
  title: 'Database Management',
  description: 'Managing and optimizing databases for improved performance and security.',
  details: 'Our team provides comprehensive database management services, including database design, optimization, and maintenance to ensure seamless operations.',
  technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'SQL Server'],
  keyFeatures: [
    'Database optimization and indexing',
    'Data migration and backup solutions',
    'Secure data storage and access management'
  ],
}
,
8:{
  title: 'Cybersecurity Services',
  description: 'Protecting your digital assets from cyber threats with expert security solutions.',
  details: 'We offer end-to-end cybersecurity services, including vulnerability assessments, penetration testing, and network security setup to safeguard your systems and data.',
  technologies: ['Wireshark', 'Nmap', 'Metasploit', 'Kali Linux'],
  keyFeatures: [
    'Penetration testing and vulnerability assessments',
    'Network security monitoring',
    'Encryption and data protection strategies'
  ],
}
,

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
          <h2>Service Overview</h2>
          <p>{project.details}</p>

          <div className="project-key-features">
            <h3>Features Provided</h3>
            <ul>
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-sidebar">
          <div className="project-metadata">
            

            
          </div>

          <div className="project-technologies">
            <h3>Technologies</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          

         
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;