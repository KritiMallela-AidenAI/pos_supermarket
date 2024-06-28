const { Sequelize } = require('sequelize');

// Initialize Sequelize with your MySQL database credentials
const sequelize = new Sequelize('pos_supermarket', 'root','Ravi@1819', {
  // host: 'localhost',
  host: '192.168.1.6',
  port : '3307',
  dialect: 'mysql',
});

module.exports = sequelize;
