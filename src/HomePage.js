import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { CCard, CCardBody, CCardImage, CCardTitle, CCardText, CButton } from "@coreui/react";
import "./HomePage.css";
import inno from "./ai5.jpg";
import ai from "./ai.jpg";
import pp from "./pp.jpg";
import eg from "./eg.jpg";
import space from "./space.jpg";
import agr from "./agr.jpg";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Fetch latest feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/latest");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const token = localStorage.getItem("token");
  console.log("Retrieved Token:", token); // Debugging
  // Redirect to the feedback submission page
  const handleSubmitFeedbackClick = () => {
    navigate("/feedback-submission");
  };

  // Dummy projects data
  const projects = [
    { id: 1, title: "Web Development", description: "Building responsive websites.", image: ai },
    { id: 2, title: "Mobile Development", description: "Creating seamless mobile apps.", image: eg },
    { id: 3, title: "Graphic Design", description: "Stunning visuals for your brand.", image: pp },
    { id: 4, title: "Game Development", description: "Developing engaging games.", image: space },
    { id: 5, title: "Figma Prototyping", description: "Interactive prototypes.", image: agr },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Share What You Have <br />Get What You Need</h1>
          <Link to="/projects" className="cta-button">Start Now</Link>
        </div>
        <div className="hero-image">
          <img src={inno} alt="Collaboration illustration" />
        </div>
      </section>

      <section className="latest-projects-section" >
        <h2>Most popular services</h2>
        <div className="projects-containers">
          {projects.slice(0, 3).map((project) => (
            <CCard style={{ width: "18rem" }} key={project.id}>
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

      <section className="famous-projects-section">
        <h2>Most Famous Services</h2>
        <div className="projects-containers">
          {projects.slice(3).map((project) => (
            <CCard style={{ width: "18rem" }} key={project.id}>
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

      <section className="feedback-section">
  <h2>Community Feedback</h2>
  {feedbacks.length > 0 ? (
    feedbacks.map((feedback, index) => (
      <div key={index} className="feedback-item">
        <p>
          "{feedback.content}" – 
          {feedback.user ? `${feedback.user.name} ${feedback.user.prenom}` : 'Anonymous'}
        </p>
      </div>
    ))
  ) : (
    <p>No feedbacks available.</p>
  )}
  <Button variant="primary" onClick={handleSubmitFeedbackClick}>
    Share Your Feedback
  </Button>
</section>
    </div>
  );
}

export default Home;