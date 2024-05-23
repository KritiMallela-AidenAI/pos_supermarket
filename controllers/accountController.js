const Account = require('../models/account'); // Assuming your model is named 'Account'
const { Op } = require('sequelize');

const accountController = {
    // Add account 
    addAccount: async (req, res) => {
        try {
            const { number, ifsc, name } = req.body;
            console.log(req.body);
            const account = await Account.create({ number, ifsc, name }); // Use Account instead of bankAccount
            res.status(200).json({ message: 'Account created successfully', account });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    // Get all accounts
    getAllAccounts: async (req, res) => {
        try {
            const accounts = await Account.findAll();
            res.status(200).json(accounts);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = accountController;
