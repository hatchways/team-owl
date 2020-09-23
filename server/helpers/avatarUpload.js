const aws = require('aws-sdk');
const fs = require('fs');

exports.avatarUpload = (user, reqFile, res) => {
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
    Body: fs.createReadStream(reqFile.path),
    Key: `userAvatar/${reqFile.originalname}`,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.log('Error occured while trying to upload to S3 bucket', err);
    }

    if (data) {
      fs.unlinkSync(reqFile.path); // Empty temp folder
      user.avatar = data.Location;
      await user.save();
      res.status(200).json(user);
    }
  });
};
