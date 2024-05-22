// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');
const multer = require('multer');
const upload = multer();

// Route to create 
router.post('/signup',upload.single('photo'), signupController.signup);

// Route to get all users
router.get('/users', signupController.getAllUsers);

// Route to get single user
router.get('/users/:userId', signupController.getUserbyuserId);
// Route to update 
router.put('/user/:userId', signupController.updateUser);

// Route to delete 
router.delete('/user/:userId', signupController.deleteUser);

module.exports = router;
