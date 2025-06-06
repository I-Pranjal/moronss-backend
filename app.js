const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const axios = require('axios');
const { signInWithLinkedIn } = require('./controllers/userController');



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/forms', require('./routes/formRoutes')); 
app.use('/api/chat', chatRoutes);
app.use('/api/linkedin/callback', signInWithLinkedIn) ; 
app.use('/api/resumemaker', require('./routes/resumeRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});



module.exports = app;
