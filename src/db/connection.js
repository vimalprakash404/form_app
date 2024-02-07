const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost:27017/topTen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

