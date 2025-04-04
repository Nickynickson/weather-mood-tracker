const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const moodRoutes = require('./routes/moodRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/moods', moodRoutes);


app.use(express.static('src/public')); // Serve static files from the public directory

module.exports = app; // Export the app for testing purposes

