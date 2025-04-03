import React from "react";
import { Link } from "react-router-dom";
import "./DiscussionsPage.css";
import { ChevronLeft } from 'lucide-react';
import Chatbot from "./Chatbot"; // Import the Chatbot component

const DiscussionsPage = () => {
  return (
    <div className="discussions-page">
      <Link to="/Home" className="back-link">
        <ChevronLeft size={24} /> Back to Home Page
      </Link>
      <h1>Chat with Our Bot</h1>
      <p>Ask any questions you have about our platform.</p>
      <Chatbot /> {/* Replace the FAQ list with the Chatbot component */}
    </div>
  );
};

export default DiscussionsPage;