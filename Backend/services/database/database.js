const { Sequelize } = require("sequelize");
const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
  host: DATABASE_URL,
  dialect: "postgres",
  ssl: false,
});

module.exports = sequelize;
