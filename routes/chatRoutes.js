const express = require('express');
const router = express.Router();
const {
  createSession,
  addMessage,
  getUserSessions,
  getSessionMessages,
} = require('../controllers/chatController');
const { getjobHunterResponse } = require('../controllers/jobhunterController');

// Create a new chat session
router.post('/session', createSession);

// Add message to a session
router.post('/message', addMessage);

// Get all sessions of a user
router.get('/sessions/:userRef', getUserSessions);

// Get all messages for a session
router.get('/messages/:sessionId', getSessionMessages);

// get response for the gemini job hunter 
router.post('/gemini', getjobHunterResponse); 



module.exports = router;
