import React, { useState, useEffect } from "react";
import "./NetworkPage.css";
import { Link } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

function Network() {
  const [connected, setConnected] = useState({});
  const [liked, setLiked] = useState({ article1: false, article2: false });
  const [messageVisible, setMessageVisible] = useState(null);
  const [commentVisible, setCommentVisible] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle Connect button
  const handleConnect = (person) => {
    setConnected((prev) => ({ ...prev, [person]: !prev[person] }));
  };

  // Handle Like button
  const handleLike = (article) => {
    setLiked((prev) => ({ ...prev, [article]: !prev[article] }));
  };

  // Handle Message button visibility
  const handleMessageClick = (person) => {
    setMessageVisible(person === messageVisible ? null : person);
  };

  // Handle Comment button visibility
  const handleCommentClick = (article) => {
    setCommentVisible(article === commentVisible ? null : article);
  };

  // Filter users by search term and selected category
  const filteredUsers = users.filter((user) => {
    const searchTermTrimmed = searchTerm.trim().toLowerCase();
    const matchesSearchTerm =
      (user.name && user.name.toLowerCase().includes(searchTermTrimmed)) ||
      (user.expertise && user.expertise.toLowerCase().includes(searchTermTrimmed));

    const userCategory = user.category || "Uncategorized"; // Default value
    const matchesCategory = selectedCategory
      ? userCategory === selectedCategory
      : true;

    return matchesSearchTerm && matchesCategory;
  });

  // Debugging
  useEffect(() => {
    console.log("Search Term:", searchTerm);
    console.log("Users:", users);
    console.log("Filtered Users:", filteredUsers);
  }, [searchTerm, users, filteredUsers]);

  return (
    <div className="network-container">
      <Link to="/Home" className="back-link">
        <ChevronLeft size={24} /> Back to Home Page
      </Link>
      <h1>Connect with service providers</h1>

      {/* Search and Filters */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search users or entrepreneurs..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-container">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Filter by Category</option>
            <option value="WebDev">Web Development</option>
            <option value="MobileDev">Mobile Development</option>
            <option value="GraphicDesign">Graphic Design</option>
            <option value="ProjectManagement">Project Management</option>
          </select>
        </div>
      </div>

      {/* User and Entrepreneur Cards */}
      <div className="profiles-container">
        {filteredUsers.map((user) => (
          <div className="profile-card" key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.expertise || "No expertise provided"}</p>
            <button
              className="connect-btn"
              onClick={() => handleConnect(user._id)}
              disabled={connected[user._id]}
            >
              {connected[user._id] ? "Connected" : "Connect"}
            </button>
            <button className="message-btn" onClick={() => handleMessageClick(user._id)}>
              Message
            </button>
            {messageVisible === user._id && (
              <input type="text" placeholder="Type your message..." />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Network;