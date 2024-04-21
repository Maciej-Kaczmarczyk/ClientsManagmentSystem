const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Unit = require("./Units");

const Units = sequelize.define("Units", {
  unitId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kilograms: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Units;
