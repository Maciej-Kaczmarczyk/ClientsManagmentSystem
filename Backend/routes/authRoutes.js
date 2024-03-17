const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../services/database/models/Users");

const router = express.Router();

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(401).send("User with given email already exists");
    }

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    // Generate tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = jwt.sign({ id: newUser.id }, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate an access token and a refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET);

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

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
