import React,{ useState, useEffect, useRef } from 'react';
import "./ProfilePage.css";
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Network, 
  Send, 
  Paperclip, 
  X, 
  FileText 
} from 'lucide-react';

// Default props to prevent undefined errors
const defaultUser = {
  userType: 'Researcher',
  firstName: 'Rana',
  lastName: 'Chouchen',
  country: 'Tunisia',
  connections: 300,
  coverPhoto: 'https://www.shutterstock.com/image-vector/blue-color-abstract-background-banner-260nw-2273132357.jpg',
  profilePhoto: 'https://media.licdn.com/dms/image/v2/D4E03AQGtdxnRFA1lZQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1731932731750?e=1738195200&v=beta&t=KemNgWzjCs-2nJqHtPehsIiq0A_ZHYCX0Z38Zp1tetM',
  bio: "ICT engineering at SUP'COM | Top 3% on TryHackMe | CTF player | CyberSecurity Enthusiast",
  aboutMe:"jqsofhqihqn iohcsaoichasopc ihczspchiocnqk,c iqhdoaozh oizc hzch zcioahdio oishciozqhciopaz ioazhdpazhd w;, hcpiazhaoiz qxqhiodhaj qs,cxiaxhaopzhzolk wc ijcdazqhazd hoizdnazd  opjpoapzdpoazopdjopopn zdjzopdaznlknazq zdojpazd",
  experiences: [
    {
      title: 'Senior Research Scientist',
      company: 'AI Innovations Lab',
      location: 'San Francisco, CA',
      startDate: 'January 2021',
      endDate: 'Present',
      duration: '3 years',
      description: 'Leading advanced machine learning research projects focused on natural language processing and deep learning algorithms.',
      highlights: [
        'Developed breakthrough NLP models',
        'Published 5 peer-reviewed research papers',
        'Led a team of 6 research engineers'
      ]
    },
    {
      title: 'Research Assistant',
      company: 'Stanford University Computational Science Department',
      location: 'Stanford, CA',
      startDate: 'September 2018',
      endDate: 'December 2020',
      duration: '2 years 3 months',
      description: 'Supported cutting-edge research in machine learning and computational neuroscience.',
      highlights: [
        'Assisted in developing predictive algorithms',
        'Managed complex data analysis projects',
        'Collaborated with senior researchers'
      ]
    }
  ],
  education: [
    {
      degree: 'Ph.D. in Computer Science',
      institution: 'Massachusetts Institute of Technology (MIT)',
      location: 'Cambridge, MA',
      graduationYear: '2020',
      fieldOfStudy: 'Artificial Intelligence and Machine Learning',
      gpa: '3.92',
      honors: [
        'Dean\'s List (2016-2020)',
        'Outstanding Doctoral Research Award'
      ],
      thesis: {
        title: 'Advanced Deep Learning Techniques for Predictive Modeling',
        advisor: 'Dr. Emily Rodriguez'
      }
    },
    {
      degree: 'Master of Science in Data Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      graduationYear: '2016',
      fieldOfStudy: 'Data Science and Analytics',
      gpa: '3.85',
      highlights: [
        'Capstone Project: Predictive Analytics for Urban Transportation',
        'Research Assistant in Data Visualization Lab'
      ]
    },
    {
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'Carnegie Mellon University',
      location: 'Pittsburgh, PA',
      graduationYear: '2014',
      fieldOfStudy: 'Computer Engineering',
      gpa: '3.78',
      honors: [
        'Summa Cum Laude',
        'Outstanding Senior Project Award'
      ]
    }
  ],
  company: '',
  recruitmentStatus: '',
  openPositions: 0,
  preferredCandidateLevels: [],
  researchAreas:  ['CyberSecurity', 'AI', 'DEVOPS'],
  lookingForEmployment: true,
  preferredJobTypes: ['part-time'],
};

const ProfilePage = ({ user = defaultUser }) => {
  // Merge provided user with default values
  const userData = { ...defaultUser, ...user };

  // Updated posts state to include title and type
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: `${userData.firstName} ${userData.lastName}`,
      title: "Initial Research Update",
      type: "Research Paper",
      content: "Excited to share my latest research on AI and machine learning!",
      timestamp: new Date().toLocaleString(),
      attachments: []
    }
  ]);

  // State for new post input
  const [newPost, setNewPost] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postType, setPostType] = useState('Research Paper');
  
  // State for attachments
  const [attachments, setAttachments] = useState([]);

  // Ref for file input
  const fileInputRef = useRef(null);

  // Post type options
  const postTypeOptions = [
    "Research Paper",
    "Completed Project",
    "Ongoing Project",
    "Article"
  ];

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : null,
      name: file.name,
      type: file.type
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  // Function to remove an attachment
  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  // Function to add a new post
  const addPost = () => {
    if ((postTitle.trim() && newPost.trim()) || attachments.length > 0) {
      const postToAdd = {
        id: posts.length + 1,
        author: `${userData.firstName} ${userData.lastName}`,
        title: postTitle,
        type: postType,
        content: newPost,
        timestamp: new Date().toLocaleString(),
        attachments: attachments
      };
      setPosts([postToAdd, ...posts]);
      
      // Reset form
      setPostTitle('');
      setNewPost('');
      setPostType('Research Paper');
      setAttachments([]);
    }
  };
  // Function to render attachment preview
  const renderAttachmentPreview = (attachment) => {
    if (attachment.preview) {
      // Image preview
      return (
        <img 
          src={attachment.preview} 
          alt={attachment.name} 
          className="h-20 w-20 object-cover rounded-lg"
        />
      );
    } else {
      // File icon for non-image files
      return (
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <FileText size={20} className="mr-2" />
          <span className="text-sm truncate">{attachment.name}</span>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cover Photo and Profile Photo Section */}
      <div className="relative">
        <img 
          src={userData.coverPhoto || "/api/placeholder/1200/300"} 
          alt="Cover Photo" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img 
            src={userData.profilePhoto || "/api/placeholder/200/200"} 
            alt="Profile" 
            className="w-36 h-36 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      {/* Basic Profile Information */}
      <div className="pt-20 text-center">
        <h1 className="text-2xl font-bold">
          {userData.firstName} {userData.lastName}
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
              {/* Conditional Rendering Based on User Type */}
{userData.userType === 'Recruiter' && (
  <div className="p-6 bg-gray-50">
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center">
        <span className="font-medium mr-2">Company:</span>
        <p className="text-gray-600">{userData.company || 'Not specified'}</p>
      </div>
      <div className="flex items-center">
        <span className="font-medium mr-2">Status:</span>
        <span className={`
          inline-block px-2 py-1 rounded-full text-xs
          ${userData.recruitmentStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
        `}>
          {userData.recruitmentStatus || 'Not specified'}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-medium mr-2">Open Positions:</span>
        <p className="text-gray-600">{userData.openPositions || 0}</p>
      </div>
    </div>
  </div>
)}

{userData.userType === 'Researcher' && (
  <div className="p-6 text-center">
    {/* Research Areas Section */}
    <div className="mb-4">
      <div className="flex justify-center flex-wrap gap-2">
        {userData.researchAreas && userData.researchAreas.length > 0 
          ? userData.researchAreas.map((area, index) => (
              <span 
                key={index} 
                className="text-sm text-gray-800 bg-gray-100 px-3 py-1 rounded-full"
              >
                {area}
              </span>
            ))
          : <span className="text-sm text-gray-600">No areas specified</span>
        }
      </div>
    </div>
    
    {/* Employment Section */}
    <div>
      <div className="inline-flex items-center">
        <span className="text-sm font-medium text-gray-600 mr-2">Employment:</span>
        <span 
          className={`text-sm px-3 py-1 rounded-full ${
            userData.lookingForEmployment 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {userData.lookingForEmployment ? 'Actively Seeking' : 'Not Seeking'}
        </span>
      </div>
    </div>
  </div>
)}

      
        
     
      </div>

      {/* Posts Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        
        {/* Post Creation Input */}
        <div className="mb-4">
          {/* Post Title Input */}
          <input
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 border rounded-lg mb-2"
          />

          {/* Post Type Dropdown */}
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2"
          >
            {postTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a new post..."
            className="w-full p-2 border rounded-lg resize-none"
            rows="3"
          />
          
          {/* Attachment Preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative">
                  {renderAttachmentPreview(attachment)}
                  <button 
                    onClick={() => removeAttachment(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-2">
            <div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="mr-2 p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                title="Attach files"
              >
                <Paperclip size={20} />
              </button>
            </div>
            <button 
              onClick={addPost}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Posts List */}
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-gray-50 p-4 rounded-lg border"
              >
                <div className="flex items-center mb-2">
                <img 
            src={userData.profilePhoto || "/api/placeholder/200/200"} 
            alt="Profile" 
            className="w-14 h-14 rounded-full border-4 border-white object-cover"
          />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                
                {/* Post Title and Type */}
                <div className="mb-2">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {post.type}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-2">{post.content}</p>
                
                {/* Post Attachments */}
                {post.attachments && post.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.attachments.map((attachment, index) => (
                      <div key={index}>
                        {renderAttachmentPreview(attachment)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No posts yet</p>
        )}
      </div>


      {/* About Me Section */}
      {userData.aboutMe && (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-700">{userData.aboutMe}</p>
        </div>
      )}

  
     {/* Experiences Section */}
<div className="p-6">
  <h2 className="text-2xl font-bold mb-6">Professional Experiences</h2>
  {userData.experiences?.length > 0 ? (
    <div className="space-y-6">
      {userData.experiences.map((exp, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-4 mb-4 md:mb-0">
            <Briefcase size={24} />
          </div>

          {/* Experience Details */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
            <p className="text-gray-500 text-sm">
              {exp.company} • {exp.location || "Location not specified"}
            </p>
            <p className="text-gray-400 text-sm mb-2">{exp.duration}</p>
            <p className="text-gray-700">{exp.description}</p>
            
            {/* Highlights */}
            {exp.highlights?.length > 0 && (
              <ul className="mt-2 space-y-1 text-gray-600 text-sm list-disc list-inside">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-center">No experiences added yet</p>
  )}
</div>
{/* Education Section */}
<div className="p-6">
  <h2 className="text-2xl font-bold mb-6">Education</h2>
  {userData.education?.length > 0 ? (
    <div className="space-y-6">
      {userData.education.map((edu, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-start md:items-center bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mr-4 mb-4 md:mb-0">
            <GraduationCap size={24} />
          </div>

          {/* Education Details */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
            <p className="text-gray-500 text-sm">{edu.institution}</p>
            <p className="text-gray-400 text-sm">{edu.graduationYear}</p>

            {/* Additional Details */}
            {edu.details && (
              <p className="mt-2 text-gray-700 text-sm">{edu.details}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600 text-center">No education added yet</p>
  )}
</div>

    </div>
  );
};

export default ProfilePage;