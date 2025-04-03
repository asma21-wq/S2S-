import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './SignInSignUp.css';

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // Hook to navigate to other routes
  // Handle input changes
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  // Handle the "Sign In" button click
  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = state;
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  

      const data = await response.json();
      console.log("Response data:", data); // Debugging line
  
      if (response.ok) {
        // ✅ Fix: Save token in localStorage
        localStorage.setItem("token", data.token);  
        console.log("Saved Token:", data.token); // Debugging
        localStorage.setItem("userId", data.userId); // ✅ Store user ID
    
        alert("Login successful!");
        navigate("/home");
      } else {
        alert(`Error: ${data.message}`); 
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
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
          value={state.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
