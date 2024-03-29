require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/clientsRoutes");
const noteRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cookieParser = require("cookie-parser");

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
