const jwt = require('jsonwebtoken');

// authrisation middleware to verify user with correct access token

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['auth_token'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No authorisation Token' });
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ msg: 'Token Verification failed, authorization denied' });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err.message);
    res.send(500).json({ msg: 'Server error - 500' });
  }
};
