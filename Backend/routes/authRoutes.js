const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../services/db");

const router = express.Router();


function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const checkIfAlreadyExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkIfAlreadyExist.rows[0]) {
      return res.status(401).send("User with given email already exists");
    }

    const result = await db.query("IF NOT EXISTS INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);


    const findedUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    const user = findedUser.rows[0];
    console.log(user);

    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
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

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ accessToken, refreshToken});
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    
    const refreshToken = req.body.refreshToken

    if (!refreshToken) {
      return res.status(401).send("No refresh token provided");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid refresh token");
      }

      // Generate a new access token
      const accessToken = generateAccessToken(user);

      res.status(200).json({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
