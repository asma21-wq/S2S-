import React, { useState } from 'react';
import './FeedbackPage.css'; // Create this CSS file to style your page.

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle feedback submission (e.g., save to database, send to server)
    console.log('Feedback Submitted:', feedback);
    setSubmitted(true);
  };

  return (
    <div className="feedback-page">
      <h1>Share Your Feedback</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="5"
            cols="50"
            required
          ></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <p>Thank you for your feedback!</p>
      )}
    </div>
  );
}

export default FeedbackPage;
