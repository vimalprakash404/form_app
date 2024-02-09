const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
