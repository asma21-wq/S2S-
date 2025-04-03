import React, { useState, useEffect } from "react";
import "./ProjectsPage.css";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

function Projects() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Function to add a new service
  const addService = async (newService) => {
    try {
      const response = await fetch('http://localhost:5000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error("Failed to add service");
      }

      const data = await response.json();
      setServices([...services, data]); // Add the new service to the state
      navigate('/projects'); // Redirect to the projects page
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }
  };

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.servicename.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? service.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="projects-container">
      <Link to="/Home" className="back-link">
        <ChevronLeft size={24} /> Back to Home Page
      </Link>
      <h1>Explore and Collaborate on Innovative Services</h1>

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search Service..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
            <option value="GameDev">Game Development</option>
            <option value="ProjectManagement">Project Management</option>
          </select>
        </div>
      </div>

      {/* Add New Service Button */}
      <div className="add-project-section">
        <Link to="/add-project" className="add-project-btn">+ Add New Service</Link>
      </div>

      {/* Service Cards */}
      <div className="project-cards-container">
        {filteredServices.map((service) => (
          <div key={service._id} className="project-card">
            <h3>{service.servicename}</h3>
            <p>By: {service.username}</p>
            <p><strong>Category:</strong> {service.category}</p>
            <p><strong>Description:</strong> {service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;