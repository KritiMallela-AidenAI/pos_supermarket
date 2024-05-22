const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const item = sequelize.define('item', {
  itemId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availability:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  photo:{
    type: DataTypes.BLOB,
    allowNull: true
  }
  
});

module.exports = item;