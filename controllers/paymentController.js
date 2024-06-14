const { v4: uuidv4 } = require('uuid');
const payment = require ('../models/payment');
const user = require ('../models/users');
const signupController = require('../controllers/signupController');
const paymentController = {};

paymentController.createPayment = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { paymentMethod, date, time, transactionId } = req.body;
        
        const user = await signupController.getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const currentDate = new Date();
        const currentTime = currentDate.toTimeString().slice(0, 8);
        const uuid = uuidv4();
        const paymentId = uuid.substr(0, 5);
        const payment = await Payment.create({
            paymentId:paymentId,
            userId,
            paymentMethod,
            date,
            time,
            transactionId
        });

        res.status(201).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all payments
paymentController.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get payment by ID
paymentController.getPaymentById = async (req, res) => {
    const { paymentId } = req.params;
    try {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a payment
paymentController.updatePayment = async (req, res) => {
    const { paymentId } = req.params;
    try {
        const [updatedRowsCount, updatedPayments] = await Payment.update(req.body, {
            where: { paymentId },
            returning: true 
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(updatedPayments[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a payment
paymentController.deletePayment = async (req, res) => {
    const { paymentId } = req.params;
    try {
        const deletedRowCount = await Payment.destroy({ where: { paymentId } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = paymentController;