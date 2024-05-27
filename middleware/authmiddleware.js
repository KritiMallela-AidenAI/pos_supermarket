const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  try {
    const verified = jwt.verify(token, jwt_secret);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Token Verification Error:', error);
    res.status(400).json({ error: 'Token is not valid' });
  }
};

module.exports = { verifyToken };