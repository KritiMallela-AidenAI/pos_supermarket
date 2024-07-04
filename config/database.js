const { Sequelize } = require('sequelize');

// Initialize Sequelize with your MySQL database credentials
const sequelize = new Sequelize('pos_supermarket', 'root','Charan@7711', {
  // host: 'localhost',
  host: '103.164.70.170',
  port : '3307',
  dialect: 'mysql',
});

module.exports = sequelize;
