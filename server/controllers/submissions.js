const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const User = require('../models/User');
const aws = require('aws-sdk');
const fs = require('fs');
const { userCheck } = require('../helpers/userCheck');

//POST - create contest - auth
exports.createSubmission = async (req, res, next) => {
  req.params.id = req.id;
  try {
    const contest = await Contest.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: req.user.userId });

    if (!user.stripeBankAcct) {
      return res
        .status(400)
        .json({ msg: 'Please upload your banking information first.' });
    }

    const dateNow = Date.now();
    const deadlineJS = new Date(contest.deadline);
    const deadlineEpoch = deadlineJS.getTime();

    if (deadlineEpoch < dateNow) {
      return res
        .status(400)
        .json({ msg: 'The deadline to submit to this contest has passed.' });
    }

    let uploads = req.files;
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION,
    });

    const s3 = new aws.S3();

    const picArray = [];
    const locationURL = [];

    let submission = new Submission({
      contest,
      user,
    });

    uploads.forEach((upload) => {
      let params = {
        ACL: 'public-read',
        Bucket: process.env.BUCKET_NAME,
        Body: fs.createReadStream(upload.path),
        Key: `submissionPic/${upload.originalname}`,
      };
      s3.upload(params, async (err, data) => {
        if (err) {
          res.json({ msg: err });
        }

        fs.unlinkSync(upload.path);

        if (data) {
          picArray.push(data);
          locationURL.push(data.Location);
        }

        //submissionPic only created when all uploads are completed
        //submission only gets saved then
        if (picArray.length == uploads.length) {
          console.log('Files are uploaded');

          //this line below for S3 URL
          submission.submissionPic = locationURL;
          await submission.save();

          //this subObj is to be saved onto contest data
          const subObj = {
            user: user.id,
            name: user.name,
            id: submission.id,
            submissionPic: {
              url: locationURL,
              name: user.name,
            },
          };
          contest.submissions.push(subObj);
          await contest.save();
          res.status(201).json(submission);
        }
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get submission by Id
exports.getSubmissionById = async (req, res, next) => {
  try {
    const submission = await Submission.findOne({ _id: req.params.id });

    if (!submission) {
      return res.status(404).json({ msg: 'This submission does not exist' });
    }
    res.status(200).json(submission);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get all submissions
exports.getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find();

    if (!submissions) {
      return res.status(404).json({ msg: 'There are no submissions' });
    }
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//PUT - update submission by Id - auth
exports.updateSubmission = async (req, res, next) => {
  return res.status(200).json({ msg: 'Update submission' });
};

//DELETE - create submission by Id - auth
exports.deleteSubmission = async (req, res, next) => {
  //todo: go to corresponding contest and delete the submission obj there as well
  try {
    const submission = await Submission.findOne({ _id: req.params.id });
    const user = req.user;
    const verify = userCheck(submission, user);
    if (!verify) {
      return res
        .status(401)
        .json({ msg: 'You are not authorized to delete this submission' });
    }
    await Submission.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Submission removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

//UPDATE - update submission 'winner' field by Id - auth
exports.updateSubmission = async (req, res, next) => {
  const { winner } = req.body;
  try {
    const submission = await Submission.findOne({ _id: req.params.id });
    submission.winner = winner;
    res.json({ msg: 'This submissions is selected as the winner.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
