const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema(
  {
    userRef: {
      type: Number, // This matches User.randomInteger
      required: true,
    },
    title: {
      type: String, // e.g., "AI Mentor", "Job Hunting"
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ChatSession', chatSessionSchema);
