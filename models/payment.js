const { DataTypes, Transaction } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./users");

const payment = sequelize.define("payment", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "userId",
    },
  },
  paymentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull:true,
  }
});
module.exports = payment;
