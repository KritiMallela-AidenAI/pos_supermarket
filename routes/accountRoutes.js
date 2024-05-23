
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/add',accountController.addAccount);
router.get('/get',accountController.getAllAccounts);

module.exports = router;