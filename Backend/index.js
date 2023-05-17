require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());

dbUrl = process.env.DATABASE_URL;
dbUser = process.env.DATABASE_USER;
dbPassword = process.env.DATABASE_PASSWORD;
dbName = process.env.DATABASE_NAME;


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`server is running on port 8000`);
});


const db = mysql.createPool({
  host: dbUrl,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

app.get('/clients', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    
    connection.query('SELECT * FROM clients', (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    })
  })
})

app.post('/clients', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    
    const params = req.body;
    connection.query(`INSERT INTO clients (firstname, lastname, address, city, zip_code, email, phone) VALUES ('${params.firstname}', '${params.lastname}', '${params.address}', '${params.city}', '${params.zip_code}', '${params.email}', '${params.phone}')`, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(`Client with the name ${params.firstname} has been added`);
      } else {
        console.log(err);
      }
    })
  })
})

app.put('/clients/:id', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    
    const { firstname, lastname, address, city, zip_code, email, phone } = req.body;
    const { id } = req.params;
    connection.query(`UPDATE clients SET firstname = '${firstname}', lastname = '${lastname}', address = '${address}', city = '${city}', zip_code = '${zip_code}', email = '${email}', phone = '${phone}' WHERE id = ${id}`, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(`Client with the ID ${id} has been updated`);
      } else {
        console.log(err);
      }
    })
  })
})

app.delete('/clients/:id', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as ID: ${connection.threadId}`);
    
    const { id } = req.params;
    connection.query(`DELETE FROM clients WHERE id = ${id}`, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(`Client with the ID ${id} has been deleted`);
      } else {
        console.log(err);
      }
    })
  })
})