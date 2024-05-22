const users = require('../models/users');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const router = require('express').Router();

// login by email/mobile
exports.login = async (req, res) => {
    try {
        const { emailOrMobile, password } = req.body;
        const user = await users.findOne({ 
            where: { 
                [Op.or]: [
                    { email: emailOrMobile },
                    { mobileNumber: emailOrMobile }
                ]
            } 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email/mobileNumber or password' });
        }

        console.log('User:', user);

        const isMatch = await bcrypt.compare(password, user.passkey);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email/mobileNumber or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { passkey, ...userDetails } = user.toJSON();
        console.log('User Details:', userDetails);

        res.status(200).json({ message: 'Login successful', token: token, user: userDetails });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
