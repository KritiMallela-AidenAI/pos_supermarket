const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Admin = sequelize.define('admin', {
    adminId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.INTEGER(20),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supermarketName: {
    type: DataTypes.STRING,
    allowNull:false,
  },
  address:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  designation:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  photo:{
    type: DataTypes.BLOB,
    allowNull:true
  }
});

module.exports = Admin;