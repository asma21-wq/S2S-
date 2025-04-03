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
      <h1>Emerging Services</h1>
      <p>
      
  Discover the latest and most innovative emerging services. If you have the skills, be among the first to offer them as they become available! For any inquiries, please <Link to="/contact">contact us</Link>.

</p>
      <div className="trending-list">
        <div className="trending-item">
          <h3> AI Chatbot Development</h3>
          <Link to="/project/6">Explore service </Link>
        </div>
        <div className="trending-item">
          <h3>Database Management</h3>
          <Link to="/project/7">Explore service</Link>
        </div>
        <div className="trending-item">
          <h3> Cybersecurity Services          </h3>
          <Link to="/project/8">Explore service</Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
