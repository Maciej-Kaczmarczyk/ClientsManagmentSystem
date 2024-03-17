const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const Client = require('./Clients');

const ClientNotes = sequelize.define('ClientNotes', {
    note_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    note_header: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note_body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
  
  // Define association with the Client model
  ClientNotes.belongsTo(Client, { foreignKey: 'client_id' });

module.exports = ClientNotes;