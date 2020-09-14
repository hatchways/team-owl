const Contest = require('../models/Contest');

//POST - create contest - auth
exports.createContest = async (req, res, next) => {
  return res.status(200).json({ msg: 'Create contest' });
};

//GET - get contest by Id
exports.getContestById = async (req, res, next) => {
  return res.status(200).json({ msg: 'Get contest by Id' });
};

//GET - get all contests
exports.getAllContests = async (req, res, next) => {
  return res.status(200).json({ msg: 'Get all contests' });
};

//PUT - update contest by Id - auth
exports.updateContest = async (req, res, next) => {
  return res.status(200).json({ msg: 'Update contest' });
};

//DELETE - create contest by Id - auth
exports.deleteContest = async (req, res, next) => {
  return res.status(200).json({ msg: 'Delete contest' });
};
