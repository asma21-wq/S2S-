import React, { useState } from "react";
import "./ProjectsPage.css";
import p2 from './proj2.jpg';
import p1 from './proj1.jpg';
import { Link } from "react-router-dom";
import {  ChevronLeft } from 'lucide-react';

function Projects() {
  const [liked, setLiked] = useState({ project1: false, project2: false });
  const [commentVisible, setCommentVisible] = useState(null); // For showing comment input
  const [detailsVisible, setDetailsVisible] = useState(null); // For showing project details

  // Sample project details
  const projectDetails = {
    project1: {
      title: "Revolutionizing Healthcare with AI",
      description: "This project explores the use of AI to improve healthcare systems, making healthcare more efficient and accessible.",
      timeline: "January 2023 - Ongoing",
      objectives: "Develop AI-based models for patient diagnosis and treatment optimization.",
    },
    project2: {
      title: "Sustainable Energy Solutions",
      description: "A project focused on creating sustainable energy solutions for reducing carbon footprints and promoting clean energy.",
      timeline: "March 2022 - Completed",
      objectives: "Design and implement renewable energy systems, focusing on solar and wind technologies.",
    },
  };

  // Handle Like button
  const handleLike = (project) => {
    setLiked((prev) => ({ ...prev, [project]: !prev[project] }));
  };

  // Handle Comment button visibility
  const handleCommentClick = (project) => {
    setCommentVisible(project === commentVisible ? null : project); // Toggle comment input visibility
  };

  // Handle View Details button visibility
  const handleDetailsClick = (project) => {
    setDetailsVisible(project === detailsVisible ? null : project); // Toggle details visibility
  };

  return (
    <div className="projects-container">
     <Link to="/Home" className="back-link">
          <ChevronLeft size={24} /> Back to Home Page
        </Link>
      <h1>Explore and Collaborate on Innovative Projects</h1>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search projects..."
          className="search-bar"
        />
        <div className="filter-container">
          <select>
            <option value="">Filter by Category</option>
            <option value="AI">Artificial Intelligence</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Energy">Renewable Energy</option>
          </select>
          <select>
            <option value="">Filter by Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Add New Project Button */}
      <div className="add-project-section">
        <Link to="/add-project" className="add-project-btn">+ Add New Project</Link>
      </div>

      {/* Project Cards */}
      <div className="project-cards-container">
        <div className="project-card">
          <img src={p1} alt="User 1" className="profile-pic" />
          <h3>Revolutionizing Healthcare with AI</h3>
          <p>By: Dr. Jane Doe</p>
          <p>Status: Ongoing</p>
          <button className="details-btn" onClick={() => handleDetailsClick("project1")}>
            {detailsVisible === "project1" ? "Hide Details" : "View Details"}
          </button>
          {detailsVisible === "project1" && (
            <div className="project-details">
              <p><strong>Description:</strong> {projectDetails.project1.description}</p>
              <p><strong>Timeline:</strong> {projectDetails.project1.timeline}</p>
              <p><strong>Objectives:</strong> {projectDetails.project1.objectives}</p>
            </div>
          )}

          <button className="like-btn" onClick={() => handleLike("project1")}>
            {liked.project1 ? "Liked" : "Like"}
          </button>

          <button className="comment-btn" onClick={() => handleCommentClick("project1")}>
            Comment
          </button>
          {commentVisible === "project1" && <textarea placeholder="Type your comment..." />}
        </div>

        <div className="project-card">
          <img src={p2} alt="User 2" className="profile-pic" />
          <h3>Sustainable Energy Solutions</h3>
          <p>By: John Smith</p>
          <p>Status: Completed</p>
          <button className="details-btn" onClick={() => handleDetailsClick("project2")}>
            {detailsVisible === "project2" ? "Hide Details" : "View Details"}
          </button>
          {detailsVisible === "project2" && (
            <div className="project-details">
              <p><strong>Description:</strong> {projectDetails.project2.description}</p>
              <p><strong>Timeline:</strong> {projectDetails.project2.timeline}</p>
              <p><strong>Objectives:</strong> {projectDetails.project2.objectives}</p>
            </div>
          )}

          <button className="like-btn" onClick={() => handleLike("project2")}>
            {liked.project2 ? "Liked" : "Like"}
          </button>

          <button className="comment-btn" onClick={() => handleCommentClick("project2")}>
            Comment
          </button>
          {commentVisible === "project2" && <textarea placeholder="Type your comment..." />}
        </div>
      </div>
    </div>
  );
}

export default Projects;
