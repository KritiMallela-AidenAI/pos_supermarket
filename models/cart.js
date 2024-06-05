const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const cart = sequelize.define('cart',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
        },
        userId:{
            type:DataTypes.INTEGER
            },
            productId:{
                type:DataTypes.INTEGER
                },
                quantity:{
                    type:DataTypes.INTEGER
                    },
                    price :{
                        type:DataTypes.FLOAT
                    },
                    total :{
                        type:DataTypes.FLOAT
                        }

});
module.exports = cart;