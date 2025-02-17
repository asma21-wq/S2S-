import React from "react";
import { Link } from "react-router-dom";
import "./DiscussionsPage.css";
import {  ChevronLeft } from 'lucide-react';
const DiscussionsPage = () => {
  const discussions = [
    { id: 1, title: "How can AI improve healthcare outcomes?" },
    { id: 2, title: "What are the real-world applications of Quantum Computing?" },
    { id: 3, title: "Blockchain for sustainable energy - Ideas and insights" },
  ];

  return (
    <div className="discussions-page">
    <Link to="/Home" className="back-link">
          <ChevronLeft size={24} /> Back to Home Page
        </Link>
      <h1>Community Discussions</h1>
      <p>Join the conversation, ask questions, and share your insights with the community.</p>
      <div className="discussion-list">
        {discussions.map((discussion) => (
          <div className="discussion-item" key={discussion.id}>
            <h3>{discussion.title}</h3>
            <Link to={`/discussion/${discussion.id}`}>Join Discussion</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionsPage;
