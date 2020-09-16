const Contest = require('../models/Contest');
const User = require('../models/User');

//POST - create contest - auth
exports.createContest = async (req, res, next) => {
  const { title, description, prize, deadline } = req.body;

  //const user = req.user; //to be implemented when authentication is available
  //for now, hardcoding user
  //problem: possible to have unlimited contests and identical contests by the same user
  //potential solution: store total contests in array as user property in DB

  const user = await User.findOne({ _id: '5f61089819261d0d5680307f' });

  //todo: convert local time to UTC time before saving to contest

  try {
    const contest = new Contest({
      title,
      description,
      prize,
      deadline,
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
  const contest = await Contest.findOne({ _id: req.params.id });

  try {
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
  const contests = await Contest.find();
  try {
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
  return res.status(200).json({ msg: 'Update contest' });
};

//DELETE - create contest by Id - auth
exports.deleteContest = async (req, res, next) => {
  return res.status(200).json({ msg: 'Delete contest' });
};
