require("dotenv").config();
const express = require("express");
const { Pool } = require('pg'); 
const cors = require("cors");
const app = express();

app.use(cors());

dbUrl = process.env.DATABASE_URL;
dbUser = process.env.DATABASE_USER;
dbPassword = process.env.DATABASE_PASSWORD;
dbName = process.env.DATABASE_NAME;

const db = new Pool({ 
  host: dbUrl,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  ssl: true
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`server is running on port 8000`);
});

app.get('/clients', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM clients');
    res.send(results.rows);
  } catch (err) {
    console.log(err);
  }
})

app.post('/clients', async (req, res) => {
  try {
    const params = req.body;
    await db.query(`INSERT INTO clients (firstname, lastname, address, city, zip_code, email, phone) VALUES ('${params.firstname}', '${params.lastname}', '${params.address}', '${params.city}', '${params.zip_code}', '${params.email}', '${params.phone}')`);
    res.send(`Client with the name ${params.firstname} has been added`);
  } catch (err) {
    console.log(err);
  }
})

app.put('/clients/:id', async (req, res) => {
  try {
    const { firstname, lastname, address, city, zip_code, email, phone } = req.body;
    const { id } = req.params;
    await db.query(`UPDATE clients SET firstname = '${firstname}', lastname = '${lastname}', address = '${address}', city = '${city}', zip_code = '${zip_code}', email = '${email}', phone = '${phone}' WHERE id = ${id}`);
    res.send(`Client with the ID ${id} has been updated`);
  } catch (err) {
    console.log(err);
  }
})

app.delete('/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM clients WHERE id = ${id}`);
    res.send(`Client with the ID ${id} has been deleted`);
  } catch (err) {
    console.log(err);
  }
})