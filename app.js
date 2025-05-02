const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const errorHandler = require('./middleware/errorMiddleware');


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/forms', require('./routes/formRoutes')); 

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (custom)
// app.use(errorHandler);

module.exports = app;
