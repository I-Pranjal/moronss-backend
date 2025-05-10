const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const {createAudioStreamFromText} = require('./controllers/textToSpeech'); // Assuming this is the correct path
// const errorHandler = require('./middleware/errorMiddlew are');


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

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/audio', async (req, res) => {
  const text = req.query.text ; 

  try {
    const buffer = await createAudioStreamFromText(text);
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="output.mp3"',
      'Content-Length': buffer.length,
    });
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Audio generation failed');
  }
});


// Error handling middleware (custom)
// app.use(errorHandler);

module.exports = app;
