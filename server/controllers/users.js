const User = require('../models/User');
const validator = require('email-validator');
const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const fs = require('fs');

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

    if (req.file) {
      //if avatar is provided
      aws.config.setPromisesDependency();
      aws.config.update({
        accessKeyId: process.env.ACCESSKEYID,
        secretAccessKey: process.env.SECRETACCESSKEY,
        region: process.env.REGION,
      });

      const s3 = new aws.S3();

      const params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(req.file.path),
        Key: `userAvatar/${req.file.originalname}`,
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          console.log('Error occured while trying to upload to S3 bucket', err);
        }

        if (data) {
          fs.unlinkSync(req.file.path); // Empty temp folder
          user = new User({ ...req.body, avatar: data.Location });

          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          await user.save();

          res.status(201).json(user);
        }
      });
    } else {
      //if no avatar is provided
      user = new User({ ...req.body });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(201).json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//POST - log in user - missing JWT
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password required' });
    }

    const user = User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Email invalid' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Password invalid' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get User by Id
exports.getUserById = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  try {
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
  const users = await User.find();

  try {
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
  return res.status(200).json({ msg: 'Update User' });
};

//DELETE - delete User by Id - auth
exports.deleteUser = async (req, res, next) => {
  return res.status(200).json({ msg: 'Delete User' });
};
