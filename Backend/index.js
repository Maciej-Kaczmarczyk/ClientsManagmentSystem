require("dotenv").config();
const path = require('path');
const express = require("express");
const cors = require("cors");
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use('/clients', clientRoutes);
app.use(authRoutes); // use authentication routes

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.get("/", (req, res) => {
  res.send(`Server is running on port 8000`);
});












  
