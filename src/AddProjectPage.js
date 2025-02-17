import React, { useState } from "react";
import "./AddProjectPage.css"; // Import CSS file for styling

function AddProjectPage() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleImageUpload = (e) => {
    setProject({ ...project, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform logic for sharing the project (e.g., API call)
    console.log("Project shared:", project);

    // Clear the form after submission
    setProject({
      title: "",
      description: "",
      category: "",
      image: null,
    });

    alert("Your project has been shared successfully!");
  };

  return (
    <div className="add-project-page">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleChange}
            placeholder="Enter project title"
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
            placeholder="Describe your project"
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
            <option value="AI">AI</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Energy">Energy</option>
            <option value="Space">Space</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Project Image (optional):</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <button type="submit" className="submit-btn">
          Share Project
        </button>
      </form>
    </div>
  );
}

export default AddProjectPage;
