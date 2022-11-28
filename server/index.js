require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());

dbUrl = process.env.DATABASE_URL;

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use(express.json());

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to database");
  } catch (error) {
    console.log(console.error(error));
  }
}
connect();

const clients = require("./routes/clients");
app.use("/clients", clients);

app.get("/", (req, res) => {
  res.send(`server is running on port 8000`);
});
