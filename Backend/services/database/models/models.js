const ClientNotes = require("./ClientNotes");
const Clients = require("./Clients");
const OrderItems = require("./OrderItems");
const Orders = require("./Orders");
const Products = require("./Products");
const Users = require("./Users");
const Units = require("./Units");
const Stocks = require("./Stocks");

// Many-to-one relationship between Orders and Clients
Orders.belongsTo(Clients, { foreignKey: "clientId" });

// One-to-many relationship between Orders and OrderItems
Orders.hasMany(OrderItems, { foreignKey: "orderId" });

// Many-to-one relationship between OrderItems and Products
OrderItems.belongsTo(Products, { foreignKey: "productId" });

// Many-to-one relationship between OrderItems and Orders
OrderItems.belongsTo(Orders, { foreignKey: "orderId" });

// Many-to-many relationship between Stocks and Products
Stocks.belongsToMany(Products, { through: "StockProducts", foreignKey: "stockId" });
Products.belongsToMany(Stocks, { through: "StockProducts", foreignKey: "productId" });

// Many-to-one relationship between Stocks and Units
Stocks.belongsTo(Units, { foreignKey: "unitId" });

ClientNotes.belongsTo(Clients, { foreignKey: "clientId" }); // Many-to-one relationship between ClientNotes and Clients

module.exports = {
  ClientNotes,
  Clients,
  OrderItems,
  Orders,
  Products,
  Users,
  Units,
  Stocks,
};
