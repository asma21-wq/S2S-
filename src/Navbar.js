import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Navbar.css";
import logo from './new.png';
import profile from './profile.png';
import images from './images.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* Wrap the logo image with Link to navigate to /home */}
        <Link to="./Home">
          <img src={logo} alt="Platform Logo" />
        </Link>
      </div>
      
      <div className="navbar-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for ideas, services, or discussions..."
        />
      </div>
      
      <ul className="nav-links">
        <li><Link to="/network">Network</Link></li>
        <li><Link to="/projects">Services</Link></li>
        <li><Link to="/discussions">Q&A</Link></li>
        <li><Link to="/trending">Trending</Link></li>
      </ul>
      
      <div className="user-icons">
        {/* Icons for profile, notifications, etc. */}
        <Link to="/Notification">
        <img src={images} alt="Notifications" />
        </Link>

        <Link to="/profile">
        <img src={profile} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
