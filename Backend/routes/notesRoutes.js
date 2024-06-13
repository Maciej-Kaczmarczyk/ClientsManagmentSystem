const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const  ClientNotes  = require("../services/database/models/ClientNotes");

// Get all notes for a client
router.get("/:clientId/notes", verifyToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    const clientNotes = await ClientNotes.findAll({ where: { clientId: clientId } });
    res.json(clientNotes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a specific note for a client
router.get("/:clientId/notes/:noteId", verifyToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const clientNote = await ClientNotes.findByPk(noteId);
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
router.post("/:clientId/notes", verifyToken, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { header, body, date } = req.body;
    const newNote = await ClientNotes.create({
      clientId: clientId,
      header,
      body,
      date,
    });
    res.json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Update a note for a client
router.put("/:clientId/notes/:noteId", verifyToken, async (req, res) => {
  try {
    const { id, note_id } = req.params;
    const { header, body, date } = req.body;
    const clientNote = await ClientNotes.findByPk(note_id);
    if (!clientNote) {
      return res.status(404).send("Note not found");
    }
    await clientNote.update({ header, body, date });
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
    const clientNote = await ClientNotes.findByPk(note_id);
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

