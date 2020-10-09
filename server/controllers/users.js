const User = require('../models/User');
const Contest = require('../models/Contest');
const Submission = require('../models/Submission');
const validator = require('email-validator');
const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { avatarUpload } = require('../helpers/avatarUpload');

//POST - create user
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ msg: 'Name, email, and password are required.' });
  }

  if (!validator.validate(email)) {
    return res.status(400).json({ msg: 'Email provided is not valid.' });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: 'Password must have at least 6 characters.' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    user = new User({ ...req.body });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const result = {
      avatar: user.avatar,
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    //token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY);
    res.status(201).json({ user: result, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST -  verfiy Token - Logged in
exports.verifyToken = async (req, res, next) => {
  const search = await User.findOne({ _id: req.user.userId }).select(
    '-password'
  );
  const user = {
    avatar: search.avatar,
    _id: search._id,
    name: search.name,
    email: search.email,
  };
  return res.status(200).json(user);
};

//GET - Loggedin user - self
exports.getLoggedinUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).select(
      '-password'
    );
    if (!user) {
      return res.status(401).json({ msg: 'You are not authorized' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - log in user - auth
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Email invalid' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Password invalid' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY);
    const result = {
      avatar: user.avatar,
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({
      token,
      user: result,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get User by Id
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User ID does not exist' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get all Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');

    if (!users) {
      return res.status(404).json({ msg: 'No users exists' });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PUT - update User by Id - auth
exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.user.userId }).select('-password');

    //if avatar is provided
    if (req.file) {
      const reqFile = req.file;
      avatarUpload(user, reqFile, res);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//DELETE - delete loggedin user - auth
exports.deleteUser = async (req, res, next) => {
  try {
    await Submission.deleteMany({ user: req.user.userId });
    await Contest.deleteMany({ user: req.user.userId });
    await User.findOneAndRemove({ _id: req.user.userId });
    res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

//GET - all contests by user ID
exports.getAllContestsByUserId = async (req, res, next) => {
  try {
    const userId = await User.findOne({ _id: req.user.userId }).select(
      '-password'
    );
    const contests = await Contest.find({ user: userId });
    res.status(200).json(contests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

//GET - all submissions by user ID
exports.getAllSubmissionsByUserId = async (req, res, next) => {
  try {
    const userId = await User.findOne({ _id: req.params.id }).select(
      '-password'
    );
    const submissions = await Submission.find({ user: userId }).populate(
      'contest'
    );
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
