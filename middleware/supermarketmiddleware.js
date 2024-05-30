const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.SECRET_KEY;

const isSupermarket = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, jwt_secret);
    const admin = await Admin.findOne({ where: { adminId: decodedToken.adminId } });
    if (admin && admin.supermarketName) {
      req.supermarketName = admin.supermarketName;
      next();
    } else {
      res.status(403).json({ error: 'Access denied, not associated with a supermarket!' });
    }
  } catch (error) {
    console.error('Supermarket Middleware Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { isSupermarket };
