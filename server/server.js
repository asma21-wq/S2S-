const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth'); // Adjust the path if necessary
const projectRoutes = require('./routes/project'); // Adjust path as necessary
const feedback = require('./routes/feedback');
const educationRoutes = require('./routes/education'); // Path to your education route
const experienceRoutes = require('./routes/experience'); // Path to your experience route
const serviceRoutes = require('./routes/serviceRoutes'); // Import the new service routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploads directory
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', feedback);
app.use('/api', projectRoutes);
app.use('/api', educationRoutes);
app.use('/api', experienceRoutes);
app.use('/api', serviceRoutes); // Add the new service routes

// MongoDB connectionmongodb+srv://asma:<servicetoservice>@cluster0.a8e06.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect('mongodb+srv://ranachouchen4:LTtOwbpHu6GOhkCO@cluster0.xufwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// HTTP Server
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });
  ws.send('Welcome to the WebSocket server');
});

// Start the server (REST API + WebSocket)
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});