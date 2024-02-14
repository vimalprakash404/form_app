const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true 
  },
  district: {
    type: String,
    required: true
  },
  zone: {
    type: String,
    required: true
  }
});

const College = mongoose.model('College', collegeSchema);
module.exports = College;
