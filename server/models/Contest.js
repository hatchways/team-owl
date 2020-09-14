const mongoose = require('mongoose');

const ContestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Contest = mongoose.model('Contest', ContestSchema);

module.exports = Contest;
