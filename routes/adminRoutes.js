// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const upload = multer();

// Route to create a new admin
router.post('/admin',upload.single('photo'), adminController.admin);

// Route to get all admins
router.get('/admin', adminController.viewAllAdmins);
// Route to get single admin by id
router.get('/admin/:adminId', adminController.viewSingleAdmin);

// Route to get admin by name
router.get('/admins/:supermarketName', adminController.getadminBysupermarketName);

// Route to update an admin by ID
router.put('/admin/:adminId', adminController.updateAdmin);

// Route to delete an admin by ID
router.delete('/admin/:adminId', adminController.deleteAdmin);

module.exports = router;
