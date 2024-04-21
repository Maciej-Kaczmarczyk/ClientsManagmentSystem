const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Stocks = sequelize.define(`Stocks`, {
  stockId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Stocks;
