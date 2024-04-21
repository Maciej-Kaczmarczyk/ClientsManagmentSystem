const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Client = require("./Clients").default;
const OrderItem = require("./OrderItems");

const Orders = sequelize.define("Orders", {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Orders;
