const Contest = require('../models/Contest');
const User = require('../models/User');
const Submissions = require('../models/Submission');
const { userCheck } = require('../helpers/userCheck');

//POST - create contest - auth
exports.createContest = async (req, res, next) => {
  const { title, description, prize, deadline, contestPics } = req.body;

  //problem: possible to have unlimited contests and identical contests by the same user
  //potential solution: store total contests in array as user property in DB

  try {
    //const user = await User.findOne({ _id: '5f61089819261d0d5680307f' });
    const user = await User.findOne({ _id: req.user.userId });

    const contest = new Contest({
      title,
      description,
      prize,
      deadline,
      contestPics,
      user,
    });

    await contest.save();
    res.status(201).json(contest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get contest by Id
exports.getContestById = async (req, res, next) => {
  try {
    const contest = await Contest.findOne({ _id: req.params.id }).populate(
      'user'
    );

    if (!contest) {
      return res.status(404).json({ msg: 'This contest ID does not exist' });
    }
    res.status(200).json(contest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get all contests
exports.getAllContests = async (req, res, next) => {
  try {
    const contests = await Contest.find().populate('user');

    if (!contests) {
      return res.status(404).json({ msg: 'There are no contests' });
    }
    res.status(200).json(contests);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PUT - update contest by Id - auth
exports.updateContest = async (req, res, next) => {
  try {
    const contest = await Contest.findOne({ _id: req.params.id });
    if (!contest) {
      return res.status(404).json({ msg: 'This contest ID does not exist' });
    }
    const user = req.user;
    const verify = userCheck(contest, user);
    if (!verify) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to modify this contest' });
    }

    const { title, description, prize, deadline } = req.body;
    contest.title = title;
    contest.description = description;
    contest.prize = prize;
    contest.deadline = deadline;

    await contest.save();
    res.status(200).json(contest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//DELETE - create contest by Id - auth
exports.deleteContest = async (req, res, next) => {
  try {
    const contest = await Contest.findOne({ _id: req.params.id });
    if (!contest) {
      return res.status(404).json({ msg: 'This contest ID does not exist' });
    }
    const user = req.user;
    const verify = userCheck(contest, user);
    if (!verify) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to delete this contest' });
    }
    await Contest.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Contest removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - All submissions by contest Id - auth
exports.getAllSubmissionsByContestId = async (req, res, next) => {
  //5f6a8f01fdeb0e1ab02947c5 - creator: Shiv
  const contestId = req.params.contestId;
  const user = req.user;

  //get all submissions under the same contest Id
  const submissions = await Submissions.find({ contest: req.params.contestId });

  //make sure only the creator gets to view the data
  const contest = await Contest.findOne({ _id: contestId });

  const verify = userCheck(contest, user);

  if (!verify) {
    return res.status(401).json({
      msg:
        'You are not authorized to view this page. Only the contest creator can see all submissions.',
    });
  }

  res.status(200).json(submissions);
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
