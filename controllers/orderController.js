const { v4: uuidv4 } = require('uuid');
const Item = require('../models/item'); 
const Order = require('../models/order');

// Function to generate numeric orderId with 5 characters
function generateNumericOrderId() {
  let orderId = '';
  for (let i = 0; i < 5; i++) {
    orderId += Math.floor(Math.random() * 10); // Generate a random number between 0 and 9
  }
  return orderId;
}

const orderController = {
  async placeOrder(req, res) {
    const orders = req.body.orders; // Assuming req.body.orders is an array of { itemId, quantity }

    try {
      // Generate a single orderId for all the orders
      const orderId = generateNumericOrderId(); // Generate numeric orderId with 5 characters

      let totalOrderPrice = 0;
      const createdOrders = [];
      for (const orderData of orders) {
        const { itemId, quantity } = orderData;

        // Find the item in the inventory
        const item = await Item.findByPk(itemId);

        if (!item) {
          return res.status(404).json({ error: `Item with ID ${itemId} not found` });
        }

        if (item.quantity < quantity) {
          return res.status(400).json({ error: `Not enough quantity available for item with ID ${itemId}` });
        }

        // Calculate total price for this item
        const totalPriceForItem = item.price * quantity;
        totalOrderPrice += totalPriceForItem;
        item.quantity -= quantity;

        await item.save();

        // Create the order using the generated orderId
        const order = await Order.create({
          orderId, // Use the same orderId for all orders
          itemId, // Store itemId for each order
          quantity,
          totalPrice: totalPriceForItem,
          orderDate: new Date()
        });

        createdOrders.push(order);
      }

      return res.status(201).json({ createdOrders, totalOrderPrice, orderId }); // Return orderId along with other details
    } catch (error) {
      console.error('Failed to place order:', error);
      return res.status(500).json({ error: 'Failed to place order' });
    }
  },


// get all the orders 
async getOrders(req, res) {
    try {
        const { orderId } = req.params;
        const order = await Order.findAll({ where: { orderId } });
      return res.status(200).json(order);
    } catch (error) {
      console.error("Error getting items:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = orderController;
