const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const app = express();
const artworkRoutes = require('./routes/artworks');
const authRoutes = require('./routes/auth'); // Correct path to auth.js

mongoose.connect('mongodb://localhost/digitalartgallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Serve the home page first
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html')); // Adjust the path as necessary
});

// Serve the upload artworks page
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html')); // Adjust the path as necessary
});

app.get('/login-signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login-signup.html')); // Serve the login/signup page
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gallery.html')); // Serve the gallery page
});

// Serve static files from the public directory
app.use(express.static('public'));

// Artwork API routes
app.use('/api', artworkRoutes);
app.use('/api', authRoutes); // Add this line for auth routes

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
