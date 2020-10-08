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
  contestPics: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  submissions: {
    type: Array,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Contest = mongoose.model('Contest', ContestSchema);

module.exports = Contest;
