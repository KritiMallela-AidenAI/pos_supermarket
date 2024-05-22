const { Sequelize } = require('sequelize');

// Initialize Sequelize with your MySQL database credentials
const sequelize = new Sequelize('pos_supermarket', 'root','CycloTech@1234', {
  host: '45.112.49.217',
  port : '3307',
  dialect: 'mysql',
});

module.exports = sequelize;
