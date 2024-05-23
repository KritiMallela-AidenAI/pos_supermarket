const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const bankAccount = sequelize.define('bankAccount', {
  number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  ifsc: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});

module.exports = bankAccount;