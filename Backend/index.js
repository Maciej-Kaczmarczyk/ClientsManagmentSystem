require("dotenv").config();
const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clientsRoutes");
const noteRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");
const sequelize = require("./services/database/database");
const { Clients, ClientNotes, Users, Stocks, Units, Products, Orders, OrderItems } = require("./services/database/models/models");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/clients", clientRoutes);
app.use("/clients", noteRoutes);
app.use(authRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send(`Server is running on port 8000`);
});

// sequelize
//   .sync({ alter: true, force: true, models: [Clients, ClientNotes, Users, Stocks, Units, Products, Orders, OrderItems] })
//   .then(() => {
//     console.log("Database synchronized successfully.");
//   })
//   .catch((error) => {
//     console.error("Error synchronizing database:", error);
//   });

module.exports = sequelize;
