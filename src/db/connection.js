const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

