const Contest = require('../models/Contest');
const User = require('../models/User');
const Submissions = require('../models/Submission');

//GET - All one submitter's submissions under a contest Id - auth
exports.getSubmissions = async (req, res, next) => {
  const contestId = req.params.contestId;
  const user = req.user;

  try {
    //get all submissions under the same contest Id
    const submissions = await Submissions.find({
      contest: contestId,
    });

    if (!submissions) {
      res.status(404).json({ msg: 'This contest Id does not exist.' });
    }

    //filter out submission(s) by the logged in user
    const SubmissionsBySubmitter = submissions.filter(
      (sub) => sub.user == user.userId
    );

    res.status(200).json(SubmissionsBySubmitter);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

//GET - Dynamic getContest route
exports.dynamicGetSubmissions = async (req, res, next) => {
  const contestId = req.params.contestId;
  const loggedUser = req.user;
  const loggedUserId = loggedUser.userId;

  const contest = await Contest.findOne({ _id: contestId });
  const contestUserId = contest.user;

  let filteredSubmissions = [];

  try {
    let submissions = await Submissions.find({
      contest: contestId,
    }).populate('user');

    if (loggedUserId != contestUserId) {
      filteredSubmissions = submissions.filter(
        (submission) => submission.user._id == loggedUserId
      );
    } else {
      filteredSubmissions = submissions;
    }
    res.status(200).json(filteredSubmissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
