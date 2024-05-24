const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const orderController = require('../controllers/orderController');

router.use(bodyParser.json());

// Route to place an order
router.post('/place-order', orderController.placeOrder);
// Route to get all the orders or a specific order by orderId
router.get('/orders/:orderId?', orderController.getOrders);

module.exports = router;
