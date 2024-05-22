const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const users = sequelize.define('users', {
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mobileNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  passkey:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization:{
    type: DataTypes.STRING,
    allowNull: false
  },
  photo:{
    type: DataTypes.BLOB,
    allowNull: true
  }
  
});

module.exports = users;