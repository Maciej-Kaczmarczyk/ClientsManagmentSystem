const express = require("express");
const router = express.Router();
const Client = require("../models/clients");

//Get all clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

//Get a single client
router.get("/:id", getClient, async (req, res) => {
    res.json(res.client);
});

//Create a client
router.post("/", async (req, res) => {

    if (req.body.email == null) {
        req.body.email = "";}


    const client = new Client({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        zip_code: req.body.zip_code,
        city: req.body.city,
    });
    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Update a client
router.patch("/:id", getClient, async (req, res) => {
    if (req.body.firstname != null) {
        res.client.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
        res.client.lastname = req.body.lastname;
    }
    if (req.body.email != null) {
        res.client.email = req.body.email;
    }
    if (req.body.phone != null) {
        res.client.phone = req.body.phone;
    }
    if (req.body.address != null) {
        res.client.address = req.body.address;
    }
    if (req.body.zip_code != null) {
        res.client.zip_code = req.body.zip_code;
    }
    if (req.body.city != null) {
        res.client.city = req.body.city;
    }
    try {
        const updatedClient = await res.client.save();
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a client
router.delete("/:id", getClient, async (req, res) => {
    try {
        await res.client.remove();
        res.status(200).json({ message: "Client deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function getClient(req, res, next) {
    let client;
    try {
        client = await Client.findById(req.params.id);
        if (client == null) {
            return res.status(404).json({ message: "Cannot find client" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.client = client;
    next();
}

module.exports = router;