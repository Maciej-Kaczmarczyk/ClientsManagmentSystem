const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Clients = require("./Clients").default;

const ClientNotes = sequelize.define("ClientNotes", {
  noteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  header: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ClientNotes;
