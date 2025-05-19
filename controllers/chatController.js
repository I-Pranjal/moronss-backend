const ChatSession = require('../models/chatSession');
const ChatMessage = require('../models/chatMessage');

// Create a new chat session
exports.createSession = async (req, res) => {
    try {
        const { userRef, title } = req.body;
        let session = await ChatSession.findOne({ userRef, title });
        
        if (session) {
            return res.status(200).json(session);
        }
        
        session = await ChatSession.create({ userRef, title });
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a message to a session
exports.addMessage = async (req, res) => {
  try {
    const { sessionId, sender, content, chatType } = req.body;
    const message = await ChatMessage.create({ sessionId, sender, content, chatType });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all sessions for a user
exports.getUserSessions = async (req, res) => {
  try {
    const { userRef } = req.params;
    const sessions = await ChatSession.find({ userRef }).sort({ createdAt: -1 });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all messages for a session
exports.getSessionMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



