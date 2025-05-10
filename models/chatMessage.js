const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },
    chatType : {
      type : String, 
      enum : ['Job Hunting', 'Resume Analysis', 'Mock Interview'], 
      required : true, 
      default : 'Resume Analysis'
    },
    sender: {
      type: String, // 'user' or 'assistant'
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
