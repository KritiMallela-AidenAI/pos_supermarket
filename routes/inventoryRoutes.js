// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/inventoryController');
const multer = require('multer');
const upload = multer();

// Route to create a new item
router.post('/items',upload.single('photo'), itemController.createItem);

// Route to get all items
router.get('/items', itemController.getAllItems);

// Route to get items by category
router.get('/items/:category', itemController.getItemsByCategory);

// Route to search for items by name
router.get('/item/:name', itemController.searchItemsByName);

// Route to update an item by ID
router.put('/item/:itemId', itemController.updateItem);

// Route to delete an item by ID
router.delete('/item/:itemId', itemController.deleteItem);

module.exports = router;
