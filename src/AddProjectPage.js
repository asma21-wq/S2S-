import React, { useState } from "react";
import "./AddProjectPage.css";
import { useNavigate } from "react-router-dom";

function AddProjectPage() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  // Function to add a new service
  const addService = async (newService) => {
    try {
      const response = await fetch('http://localhost:5000/api/services/', {
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
      console.log("Service added:", data);
      return data; // Return the added service data
    } catch (error) {
      console.error("Error adding service:", error);
      throw error; // Re-throw the error for handling in the caller
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      servicename: project.title,
      description: project.description,
      category: project.category,
      username: "Current User", // Replace with actual username or fetch from context
    };

    try {
      await addService(newService); // Call the addService function
      navigate('/projects'); // Redirect to the projects page
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="add-project-page">
      <h1>Add New Service</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Service Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Enter service title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleChange}
            placeholder="Describe your service"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={project.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="WebDev">Web Development</option>
            <option value="MobileDev">Mobile Development</option>
            <option value="GraphicDesign">Graphic Design</option>
            <option value="GameDev">Game Development</option>
            <option value="ProjectManagement">Project Management</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Share Service
        </button>
      </form>
    </div>
  );
}

export default AddProjectPage;