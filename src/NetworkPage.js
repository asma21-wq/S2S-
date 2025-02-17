import React, { useState } from "react";
import "./NetworkPage.css";
import ceo from './ceo.jpg';
import { Link } from "react-router-dom";
import {  ChevronLeft } from 'lucide-react';
import drjd from './drjd.jpg';

function Network() {
  const [connected, setConnected] = useState({ jane: false, john: false });
  const [liked, setLiked] = useState({ article1: false, article2: false });
  const [messageVisible, setMessageVisible] = useState(null); // For showing message input
  const [commentVisible, setCommentVisible] = useState(null); // For showing comment input

  // Handle Connect button
  const handleConnect = (person) => {
    setConnected((prev) => ({ ...prev, [person]: !prev[person] }));
  };

  // Handle Like button
  const handleLike = (article) => {
    setLiked((prev) => ({ ...prev, [article]: !prev[article] }));
  };

  // Handle Message button visibility
  const handleMessageClick = (person) => {
    setMessageVisible(person === messageVisible ? null : person); // Toggle message input visibility
  };

  // Handle Comment button visibility
  const handleCommentClick = (article) => {
    setCommentVisible(article === commentVisible ? null : article); // Toggle comment input visibility
  };

  return (
    <div className="network-container">
    <Link to="/Home" className="back-link">
          <ChevronLeft size={24} /> Back to Home Page
        </Link>
      <h1>Connect with Innovators and Entrepreneurs</h1>

      {/* Search and Filters */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search users or entrepreneurs..."
          className="search-bar"
        />
        <div className="filter-container">
          <select>
            <option value="">Filter by Expertise</option>
            <option value="AI">Artificial Intelligence</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Energy">Renewable Energy</option>
          </select>
          <select>
            <option value="">Filter by Collaboration Type</option>
            <option value="Funding">Looking for Funding</option>
            <option value="Partnership">Open for Partnership</option>
          </select>
        </div>
      </div>

      {/* User and Entrepreneur Cards */}
      <div className="profiles-container">
        <div className="profile-card">
          <img src={ceo} alt="User 1" className="profile-pic" />
          <h3>Dr. Jane Doe</h3>
          <p>Expert in Renewable Energy</p>
          <button
            className="connect-btn"
            onClick={() => handleConnect("jane")}
            disabled={connected.jane}
          >
            {connected.jane ? "Connected" : "Connect"}
          </button>
          <button className="message-btn" onClick={() => handleMessageClick("jane")}>
            Message
          </button>
          {messageVisible === "jane" && <input type="text" placeholder="Type your message..." />}
        </div>
        <div className="profile-card">
          <img src={drjd} alt="Entrepreneur 1" className="profile-pic" />
          <h3>John Smith</h3>
          <p>CEO, GreenTech Solutions</p>
          <button
            className="connect-btn"
            onClick={() => handleConnect("john")}
            disabled={connected.john}
          >
            {connected.john ? "Connected" : "Connect"}
          </button>
          <button className="message-btn" onClick={() => handleMessageClick("john")}>
            Message
          </button>
          {messageVisible === "john" && <input type="text" placeholder="Type your message..." />}
        </div>
      </div>

      {/* Articles Section */}
      <section className="articles-section">
        <h2>Explore Articles and Ideas</h2>
        <div className="article-card">
          <h3>Revolutionizing AI in Healthcare</h3>
          <p>By: Dr. Jane Doe</p>
          <button className="like-btn" onClick={() => handleLike("article1")}>
            {liked.article1 ? "Liked" : "Like"}
          </button>
          <button className="comment-btn" onClick={() => handleCommentClick("article1")}>
            Comment
          </button>
          {commentVisible === "article1" && <textarea placeholder="Type your comment..." />}
        </div>
        <div className="article-card">
          <h3>Sustainable Energy for the Future</h3>
          <p>By: John Smith</p>
          <button className="like-btn" onClick={() => handleLike("article2")}>
            {liked.article2 ? "Liked" : "Like"}
          </button>
          <button className="comment-btn" onClick={() => handleCommentClick("article2")}>
            Comment
          </button>
          {commentVisible === "article2" && <textarea placeholder="Type your comment..." />}
        </div>
      </section>
    </div>
  );
}

export default Network;
