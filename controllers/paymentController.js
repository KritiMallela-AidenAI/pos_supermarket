
const Payment = require('../models/Payment');

exports.processUpiPayment = async (req, res) => {
  try {
    const { amount, upiId } = req.body;

    const payment = await Payment.create({
      method: 'UPI',
      amount,
      upiId,
    });

    res.status(201).json({ message: 'UPI payment processed successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.processCardPayment = async (req, res) => {
  try {
    const { amount, cardNumber, expiryDate } = req.body;

    const payment = await Payment.create({
      method: 'Card',
      amount,
      cardNumber,
      expiryDate,
    });

    res.status(201).json({ message: 'Card payment processed successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.processCashPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    const payment = await Payment.create({
      method: 'Cash',
      amount,
    });

    res.status(201).json({ message: 'Cash payment processed successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// retrive all the transactions 
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Payment.findAll();
    res.status(200).json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// retrive a single transaction by transactionId
exports.getPaymentByTransactionId = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ where: { transactionId } });

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

