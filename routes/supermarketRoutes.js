const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authmiddleware')
const { isSupermarket } = require('../middleware/supermarketmiddleware')

router.get('/supermarket-data', verifyToken, isSupermarket, (req, res) => {
  const supermarketName = req.supermarketName;
  res.json({ supermarketName });
});

module.exports = router;
