const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const  ClientNote  = require("../services/database/models/ClientNotes"); // Import the ClientNote model

// Get all notes for a client
router.get("/:id/notes", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const clientNotes = await ClientNote.findAll({ where: { client_id: id } });
    res.json(clientNotes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a specific note for a client
router.get("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { note_id } = req.params;
    const clientNote = await ClientNote.findByPk(note_id);
    if (!clientNote) {
      return res.status(404).send("Note not found");
    }
    res.json(clientNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Create a new note for a client
router.post("/:id/notes", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { note_header, note_body, note_date } = req.body;
    const newNote = await ClientNote.create({
      client_id: id,
      note_header,
      note_body,
      note_date,
    });
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update a note for a client
router.put("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { id, note_id } = req.params;
    const { note_header, note_body, note_date } = req.body;
    const clientNote = await ClientNote.findByPk(note_id);
    if (!clientNote) {
      return res.status(404).send("Note not found");
    }
    await clientNote.update({ note_header, note_body, note_date });
    res.send(`Note with the ID ${note_id} has been updated for client with the ID ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete a note for a client
router.delete("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { id, note_id } = req.params;
    const clientNote = await ClientNote.findByPk(note_id);
    if (!clientNote) {
      return res.status(404).send("Note not found");
    }
    await clientNote.destroy();
    res.send(`Note with the ID ${note_id} has been deleted for client with the ID ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;

