const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  contest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contest',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now(),
  },
  urlAWS: String,
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
