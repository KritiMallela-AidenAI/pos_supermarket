
const cart = require("../models/cart");
const { Op } = require("sequelize");

const cartController = {
    // add items to cart
    async addItemsToCart(req, res) {
        try {
            const { itemId } = req.params;
            const { quantity } = req.body;
    
            const cartItem = await Cart.create({ ItemId: itemId, quantity });
    
            res.json(cartItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = cartController;
