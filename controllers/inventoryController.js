// controllers/itemController.js
const item = require('../models/item'); 
const { Op } = require('sequelize');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid'); 

// Configure multer to handle file uploads
const upload = multer();

const inventoryController = {
 // Create a new item
async createItem(req, res) {
  try {
    const { name, quantity, category, price, availability } = req.body;
    
    // Check if file upload succeeded
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image.' });
    }

    const uuid = uuidv4();
    const itemId = uuid.substr(0, 5);
    // Read the image file and convert it to base64
    const base64Photo = req.file.buffer.toString('base64');
    const newItem = await item.create({
      itemId: itemId,
      name, 
      quantity, 
      category,
      price,
      availability,
      photo: base64Photo
    });

    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
},

// Get all items
  async getAllItems(req, res) {
    try {
      const items = await item.findAll();
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

   // Get items by category
   async getItemsByCategory(req, res) {
    try {
      const { category } = req.params;
      const items = await item.findAll({ where: { category } });
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error getting items by category:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Search for items by name
  async searchItemsByName(req, res) {
    try {
      const { name } = req.params;
      const items = await item.findAll({ where: { name: { [Op.like]: `%${name}%` } } });

      return res.status(200).json(items);
    } catch (error) {
      console.error('Error searching items by name:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

  // Update an item by its itemId
  async updateItem(req, res) {
    try {
      const { itemId } = req.params;
      const { name, quantity, category, price, availability } = req.body;
      const items = await item.update({ name, quantity, category, price, availability }, { where: { itemId } });
      if (!item) {
        return res.status(404).json({ error: 'Item not found.' });
        }
        return res.status(200).json(item);
        } catch (error) {
          console.error('Error updating item:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
          }
        },

  // Delete an item by itemId
  async deleteItem(req, res) {
    try {
      const { itemId } = req.params;
        if (!itemId) {
        return res.status(400).json({ error: 'Item ID is required.' });
      }
        const deletedCount = await item.destroy({ where: { itemId: itemId } });
        if (deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found.' });
      }
      // Return success response
      return res.status(200).json({ message: 'Item deleted successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}  

  
module.exports = inventoryController;
