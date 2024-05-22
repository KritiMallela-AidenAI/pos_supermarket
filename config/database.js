const { Sequelize } = require('sequelize');

// Initialize Sequelize with your MySQL database credentials
const sequelize = new Sequelize('pos', 'root','20913524@Tony', {
  host: 'localhost',
  port : '3306',
  dialect: 'mysql',
});

module.exports = sequelize;
