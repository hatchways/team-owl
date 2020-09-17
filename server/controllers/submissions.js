const Submission = require('../models/Submission');
const Contest = require('../models/Contest');
const User = require('../models/User');
const aws = require('aws-sdk');
const fs = require('fs');

//POST - create contest - auth
exports.createSubmission = async (req, res, next) => {
  req.params.id = req.id;
  try {
    const contest = await Contest.findOne({ _id: req.params.id });
    const user = await User.findOne({ _id: '5f60095f5d46b01ceecd35a2' });

    //problem - same user can submit multiple submissions

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
          console.log('Files are supposed to be uploaded');
          submission.submissionPic = locationURL;
          await submission.save();
        }
      });
    });

    res.status(201).json({
      msg:
        'locationURL saved to submissionPic but not able to json them because of asynchronus issues',
      submission,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error - 500' });
  }
};

//GET - get submission by Id
exports.getSubmissionById = async (req, res, next) => {
  const submission = await Submission.findOne({ _id: req.params.id });

  try {
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
  const submissions = await Submission.find();

  try {
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
  return res.status(200).json({ msg: 'Delete submission' });
};
