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
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  urlAWS: {
    type: String,
    default: 'default url to AWS',
    required: true, //required??
  },
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
