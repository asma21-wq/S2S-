import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import GetStartedPage from "./GetStartedPage";
import DashboardPage from "./DashboardPage";
import NetworkPage from "./NetworkPage";
import ProjectsPage from "./ProjectsPage";
import DiscussionsPage from "./DiscussionsPage";
import TrendingPage from "./TrendingPage";
import WelcomPage from './WelcomPage';
import SignInForm from './SignIn';
import SignUpForm from './SignUp';
import Navbar from "./Navbar";
import Footer from './Footer'; 
import AddProjectPage from './AddProjectPage';
import FeedbackPage from './FeedbackPage'; // Import the FeedbackPage component
import DiscussionDetailPage from "./DiscussionDetailPage";
import ProjectDetailPage from './ProjectDetailPage';
import ProfilePage from './ProfilePage';
import NotificationPage from './User Notification Page';

function App() {
  // Component to hide Navbar on specific routes
  const ShowNavbar = () => {
    const location = useLocation();
    const hideNavbarRoutes = ["/", "/sign-in", "/sign-up"];
    return !hideNavbarRoutes.includes(location.pathname) && <Navbar />;
  };

  // Component to hide Footer on specific routes
  const ShowFooter = () => {
    const location = useLocation();
    const hideFooterRoutes = ["/"]; // List of routes where Footer should not be displayed
    return !hideFooterRoutes.includes(location.pathname) && <Footer />;
  };

  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <Router>
      <ShowNavbar />
      <Routes>
        {/* Default route set to WelcomPage */}
        <Route path="/" element={<WelcomPage />} />
        
        {/* SignIn and SignUp pages */}
        <Route
          path="/sign-in"
          element={<SignInFormWithRedirect />}
        />
        
        <Route
          path="/sign-up"
          element={
            <div className="sign-up-page">
              <div className="App">
                <div className={containerClass} id="container">
                  <SignUpForm />
                  <SignInForm />
                  <div className="overlay-container">
                    <div className="overlay">
                      <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>
                          To keep connected with us please login with your personal info
                        </p>
                        <button
                          className="ghost"
                          id="signIn"
                          onClick={() => handleOnClick("signIn")}
                        >
                          Sign In
                        </button>
                      </div>
                      <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button
                          className="ghost"
                          id="signUp"
                          onClick={() => handleOnClick("signUp")}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        {/* Other routes */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/discussions" element={<DiscussionsPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/add-project" element={<AddProjectPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/discussion/:id" element={<DiscussionDetailPage />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/Notification" element={<NotificationPage />} />

        


      </Routes>

      {/* Conditionally render Footer */}
      <ShowFooter />
    </Router>
  );
}

// Create a wrapper for the SignInForm to handle redirect after successful sign-in
const SignInFormWithRedirect = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Simulate successful sign-in
    // You can replace this with your actual sign-in logic (e.g., checking credentials)
    // This would be determined after form validation
  
    // Redirect to the Home page after successful sign-in
    navigate("/home");
  };

  return <SignInForm onSubmit={handleSubmit} />;
};

export default App;
