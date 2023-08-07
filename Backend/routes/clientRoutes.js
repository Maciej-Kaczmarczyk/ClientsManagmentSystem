const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { verifyToken } = require("../middleware/verifyToken");

const { DATABASE_URL, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

const db = new Pool({
  host: DATABASE_URL,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  ssl: true,
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM clients");
    res.send(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { firstname, lastname, address, city, zip_code, email, phone } = req.body;
    await db.query("INSERT INTO clients (firstname, lastname, address, city, zip_code, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)", [
      firstname,
      lastname,
      address,
      city,
      zip_code,
      email,
      phone,
    ]);
    res.send(`Client with the name ${firstname} has been added`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { firstname, lastname, address, city, zip_code, email, phone } = req.body;
    const { id } = req.params;
    await db.query("UPDATE clients SET firstname = $1, lastname = $2, address = $3, city = $4, zip_code = $5, email = $6, phone = $7 WHERE id = $8", [
      firstname,
      lastname,
      address,
      city,
      zip_code,
      email,
      phone,
      id,
    ]);
    res.send(`Client with the ID ${id} has been updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM clients WHERE id = $1", [id]);
    res.send(`Client with the ID ${id} has been deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
