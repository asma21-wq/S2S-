import React, { useState, useEffect } from 'react';
import "./ProfilePage.css";
import { Edit, Camera, Plus, MapPin, Network } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  // State for user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for experiences and education
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  // State for modals
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);

  // State for editing user details
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    prenom: "",
    dateOfBirth: "",
    bio: "",
    country: "",
    town: "",
    aboutMe: "",
    userType: "researcher",
    researcher: {
      researchAreas: [],
      lookingForEmployment: false,
      skills: [],
      preferredJobTypes: []
    }
  });

  // Get user ID from localStorage
  const userId = localStorage.getItem('userId');

  // Fetch user data on mount
  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/auth/users/${userId}`)
        .then(response => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to fetch user data');
          setLoading(false);
        });
    } else {
      setError('User ID not found');
      setLoading(false);
    }
  }, [userId]);

  // Fetch experiences on mount
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/experiences/${userId}`)
        .then(response => {
          setExperiences(response.data.experiences);
        })
        .catch(error => {
          console.error('Error fetching experiences:', error);
        });
    }
  }, [userId]);

  // Fetch education on mount
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/education/${userId}`)
        .then(response => {
          setEducation(response.data.education);
        })
        .catch(error => {
          console.error('Error fetching education:', error);
        });
    }
  }, [userId]);

  // Sync editedUserData with userData when userData changes
  useEffect(() => {
    if (userData) {
      setEditedUserData({
        ...userData,
        researcher: {
          ...userData.researcher
        }
      });
    }
  }, [userData]);

  // Save User Details
  const saveUserDetails = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/users/${userId}`, editedUserData);
      setUserData(response.data);
      setShowUserDetailsModal(false);
    } catch (err) {
      console.error('Error updating user details', err);
      setError('Failed to save user details');
    }
  };

  // Handle Cover Image Upload
  const handleCoverImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('coverPhoto', file);

      axios.post(`http://localhost:5000/api/auth/users/${userId}/upload-cover`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setUserData({ ...userData, coverPhoto: response.data.coverPhoto });
      })
      .catch(error => {
        console.error('Error uploading cover photo', error);
      });
    }
  };

  // Handle Profile Image Upload
  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      axios.post(`http://localhost:5000/api/auth/users/${userId}/upload-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setUserData({ ...userData, PDP: response.data.profilePhoto });
      })
      .catch(error => {
        console.error('Error uploading profile photo', error);
      });
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 relative max-h-[90vh] overflow-y-auto">
          <button onClick={onClose} className="absolute top-2 right-2">
      
          </button>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    );
  };
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cover Photo and Profile Photo Section */}
      <div className="relative">
        <img 
src={require("../src/cover1.png")}
alt="Cover Photo" 
          className="w-full h-48 object-cover"
        />
        <label className="absolute top-2 right-2 cursor-pointer">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleCoverImageUpload}
          />
          <div className="bg-white/70 p-2 rounded-full hover:bg-white/90">
            <Camera size={24} />
          </div>
        </label>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img 
src={require("../src/User.jpg")}
alt="Profile Photo" 
            className="w-36 h-36 rounded-full border-4 border-white object-cover"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleProfileImageUpload}
            />
            <div className="bg-white/70 p-2 rounded-full hover:bg-white/90">
              <Camera size={24} />
            </div>
          </label>
        </div>
      </div>

      {/* Basic Profile Information */}
      <div className="pt-20 text-center">
        <h1 className="text-2xl font-bold">
          {userData.name} {userData.prenom}
          <button 
            onClick={() => setShowUserDetailsModal(true)}
            className="ml-2 text-gray-500 hover:text-blue-500"
          >
            <Edit size={20} />
          </button>
        </h1>
        <p className="text-gray-600">{userData.userType}</p>
        <p className="text-gray-600">{userData.bio}</p>

        {/* Location and Connections */}
        <div className="flex justify-center gap-4 mt-2 text-gray-500">
          {userData.country && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{userData.country}</span>
            </div>
          )}
          <div className="flex items-center">
            <Network size={16} className="mr-1" />
            <span>{userData.connections || 0} Connections</span>
          </div>
        </div>
      </div>

      {/* Experiences Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Experiences</h2>
          <Link
            to="/add-experience" // Navigate to AddExperiencePage
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <Plus size={20} />
          </Link>
        </div>
        {experiences.map((exp, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <h3 className="font-bold">{exp.title} at {exp.companyName}</h3>
            <p>{exp.description}</p>
            <div className="text-gray-600">
              {exp.startDate} - {exp.endDate || 'Present'}
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <Link
            to="/add-education" // Navigate to AddEducationPage
            className="bg-blue-500 text-white p-2 rounded-full"
          >
            <Plus size={20} />
          </Link>
        </div>
        {education.map((edu, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <h3 className="font-bold">{edu.degree}</h3>
            <p>{edu.school}</p>
            <div className="text-gray-600">
              {edu.startDate} - {edu.endDate || 'Present'}
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal 
        isOpen={showUserDetailsModal} 
        onClose={() => setShowUserDetailsModal(false)}
        title="Edit Profile Details"
      >
        {/* User Details Form */}
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="First Name" 
            value={editedUserData.name}
            onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={editedUserData.prenom}
            onChange={(e) => setEditedUserData({ ...editedUserData, prenom: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="date" 
            placeholder="Date of Birth" 
            value={editedUserData.dateOfBirth}
            onChange={(e) => setEditedUserData({ ...editedUserData, dateOfBirth: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea 
            placeholder="Bio" 
            value={editedUserData.bio}
            onChange={(e) => setEditedUserData({ ...editedUserData, bio: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="Country" 
            value={editedUserData.country}
            onChange={(e) => setEditedUserData({ ...editedUserData, country: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="Town" 
            value={editedUserData.town}
            onChange={(e) => setEditedUserData({ ...editedUserData, town: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea 
            placeholder="About Me" 
            value={editedUserData.aboutMe}
            onChange={(e) => setEditedUserData({ ...editedUserData, aboutMe: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={saveUserDetails}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </Modal>
      <div className="p-6">
        <button 
          onClick={signOut} 
          className="mt-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {/* Add the rest of the JSX code for Experiences, Education, and Modals here... */}

   
    </div>
  );
};

export default ProfilePage;