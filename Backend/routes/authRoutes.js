const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkIfAlreadyExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkIfAlreadyExist.rows[0]) {
      return res.status(401).send("User with given email already exists");
    }

    const result = await db.query("IF NOT EXISTS INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);

    console.log(result); 

    const findedUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    const user = findedUser.rows[0];
    console.log(user);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
