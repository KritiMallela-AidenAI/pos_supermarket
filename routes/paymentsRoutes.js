// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/upi', paymentController.processUpiPayment);
router.post('/card', paymentController.processCardPayment);
router.post('/cash', paymentController.processCashPayment);
router.get('/transactions', paymentController.getAllTransactions);
router.get('/payment/:transactionId', paymentController.getPaymentByTransactionId);


module.exports = router;
