const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const Clients = require("../services/database/models/Clients")

// Get all clients
router.get("/", verifyToken, async (req, res) => {
  try {
    const clients = await Clients.findAll();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Create a new client
router.post("/", verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, address, city, zipCode, email, phone } = req.body;
    const newClient = await Clients.create({
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      zipCode: zipCode,
      email: email,
      phone: phone,
    });
    res.json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update a client
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, address, city, zip_code, email, phone } = req.body;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).send("Client not found");
    }
    await client.update({
      firstName: firstname,
      lastName: lastname,
      address: address,
      city: city,
      zipCode: zip_code,
      email: email,
      phone: phone,
    });
    res.send(`Client with the ID ${id} has been updated`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete a client
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    if (!client) {
      return res.status(404).send("Client not found");
    }
    await client.destroy();
    res.send(`Client with the ID ${id} has been deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
