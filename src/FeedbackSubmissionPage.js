import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const FeedbackSubmissionPage = () => {
  const [newFeedback, setNewFeedback] = useState(""); // Initialize state for new feedback
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submitting status
  const navigate = useNavigate(); // Hook for navigation
  
  // Handle the feedback submission
  const handleSubmitFeedback = async () => {
    console.log("Submit button clicked"); // Debugging

    const userId = localStorage.getItem("userId"); // Retrieve user ID

    if (!userId) {
      console.error("User ID is missing!"); // If userId is not found, log an error
      return;
    }

    setIsSubmitting(true); // Disable button during submission

    try {
      // Send the request with content and userId
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        { content: newFeedback, userId }
      );

      console.log("Feedback submitted successfully:", response.data);
      setNewFeedback(""); // Clear the feedback input after submission
      navigate("/home"); // Navigate to home page
    } catch (error) {
      console.error("Error submitting feedback:", error.response?.data || error.message);
    } finally {
      setIsSubmitting(false); // Re-enable button after submission
    }
  };

  return (
    <div className="feedback-submission-page">
      <h2>Submit Your Feedback</h2>
      <Form>
        <Form.Group className="mb-3" controlId="feedbackInput">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)} // Update state on input change
            placeholder="Write your feedback here..."
          />
        </Form.Group>
        <Button 
          variant="primary" 
          onClick={handleSubmitFeedback} 
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default FeedbackSubmissionPage;
