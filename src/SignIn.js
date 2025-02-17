import React from "react";
import { useNavigate } from "react-router-dom";
import './SignInSignUp.css';

function SignInForm() {
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Handle the "Sign In" button click
  const handleOnSubmit = evt => {
    evt.preventDefault();
    
    // Navigate directly to the homepage when the "Sign In" button is clicked
    navigate("/home");
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fa fa-facebook">  </i>
          </a>
          <a href="#" className="social">
            <i className="fa fa-google" ></i>
          </a>
          <a href="#" className="social">
            <i className="fa fa-linkedin"> </i>
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
