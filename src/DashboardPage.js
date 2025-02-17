import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      
      {/* Main Navigation Tabs */}
      <div className="main-nav-tabs">
        <Link to="/network" className="tab-link">Network</Link>
        <Link to="/projects" className="tab-link">Projects</Link>
        <Link to="/discussions" className="tab-link">Discussions</Link>
        <Link to="/trending" className="tab-link">Trending</Link>
      </div>

      {/* Content Sections */}
      <div className="content-sections">
        {/* Trending Topics */}
        <section className="section trending">
          <h2>Trending Topics</h2>
          <div className="content-grid">
            <div className="content-card">
              <h3>Artificial Intelligence in Healthcare</h3>
              <p>Engagement: 1500 views, 200 comments</p>
              <button className="view-button">Explore</button>
            </div>
            <div className="content-card">
              <h3>Quantum Computing Advances</h3>
              <p>Engagement: 1200 views, 180 comments</p>
              <button className="view-button">Explore</button>
            </div>
            <div className="content-card">
              <h3>Sustainable Energy Solutions</h3>
              <p>Engagement: 1000 views, 160 comments</p>
              <button className="view-button">Explore</button>
            </div>
          </div>
        </section>

        {/* Recent Projects */}
        <section className="section recent-projects">
          <h2>Recent Projects</h2>
          <div className="content-grid">
            <div className="content-card">
              <h3>Smart Waste Management System</h3>
              <p>A project aimed at improving waste collection efficiency using IoT.</p>
              <button className="view-button">View Project</button>
            </div>
            <div className="content-card">
              <h3>AI for Predictive Healthcare</h3>
              <p>Developing machine learning models to predict health risks based on data.</p>
              <button className="view-button">View Project</button>
            </div>
            <div className="content-card">
              <h3>Blockchain for Secure Voting</h3>
              <p>A project focused on using blockchain technology to ensure election integrity.</p>
              <button className="view-button">View Project</button>
            </div>
          </div>
        </section>
        <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 KnowledgeLink. All Rights Reserved.</p>
          <div className="footer-links">
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default DashboardPage;
