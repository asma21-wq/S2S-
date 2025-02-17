import React from "react";
import "./GetStartedPage.css";
import { Link } from "react-router-dom";

<button className="cta-button">
  <Link to="/sign-up" style={{ textDecoration: 'none', color: 'white' }}>
    Sign Up Now
  </Link>
</button>

const GetStartedPage = () => {
  return (
    <div className="get-started">
      {/* Header Section */}
      <header className="get-started-header">
        <h1>Get Started with KnowledgeLink</h1>
        <p>Your journey to collaboration and innovation begins here!</p>
      </header>

      {/* Steps Section */}
      <section className="steps">
        <h2>Follow These Steps to Begin</h2>
        <div className="steps-grid">
          <div className="step">
            <h3>Step 1: Sign Up</h3>
            <p>
              Create a free account to join our community. Fill in your profile 
              to connect with like-minded individuals.
            </p>
          </div>
          <div className="step">
            <h3>Step 2: Share Your Ideas</h3>
            <p>
              Upload your scientific articles, research projects, or innovative 
              ideas to gain visibility and feedback.
            </p>
          </div>
          <div className="step">
            <h3>Step 3: Collaborate</h3>
            <p>
              Explore other users’ projects, participate in discussions, and form 
              partnerships for interdisciplinary growth.
            </p>
          </div>
          <div className="step">
            <h3>Step 4: Make an Impact</h3>
            <p>
              Connect with entrepreneurs and industries to turn your ideas into 
              real-world applications.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
};

export default GetStartedPage;
