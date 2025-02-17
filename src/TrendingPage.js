import React from "react";
import { Link } from "react-router-dom";
import "./TrendingPage.css";
import {  ChevronLeft } from 'lucide-react';


const TrendingPage = () => {
  return (
    <div className="trending-page">
    <Link to="/Home" className="back-link">
          <ChevronLeft size={24} /> Back to Home Page
        </Link>
      <h1>Trending Research and Ideas</h1>
      <p>Check out the most popular and discussed research topics in the community.</p>
      <div className="trending-list">
        <div className="trending-item">
          <h3>AI in Medicine</h3>
          <Link to="/project/1">Explore Project</Link>
        </div>
        <div className="trending-item">
          <h3>Blockchain for Secure Voting</h3>
          <Link to="/project/2">Explore Project</Link>
        </div>
        <div className="trending-item">
          <h3>Quantum Computing in Financial Markets</h3>
          <Link to="/project/3">Explore Project</Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
