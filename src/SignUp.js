import React from "react";
import './SignInSignUp.css';
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    prenom: "",
    email: "",
    password: "",
    userType: "researcher" // Default userType
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt)  => {
    evt.preventDefault();

    const { name, prenom, email, password, userType } = state;
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, prenom, email, password, userType }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Show success message
        setState({
          name: "",
          prenom: "",
          email: "",
          password: "",
        });
      } else {
        alert(`Error: ${data.message}`); // Show error message from backend
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
          <i class="fa fa-facebook">  </i>
          </a>
          <a href="#" className="social">
          <i class="fa fa-google" ></i>
          </a>
          <a href="#" className="social">
          <i class="fa fa-linkedin"> </i>
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
          <input
          type="text"
          name="prenom"
          value={state.prenom}
          onChange={handleChange}
          placeholder="Family Name"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
          <div>
          
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
