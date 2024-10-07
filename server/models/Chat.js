const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp to the current date
  },
});

// Create the Chat model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;