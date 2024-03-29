const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { verifyToken } = require("../middleware/verifyToken");
const db = require("../services/database");

router.get("/:id/notes", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const results = await db.query("SELECT * FROM notes WHERE client_id = $1", [id]);
    res.send(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.get("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { note_id } = req.params;
    const results = await db.query("SELECT * FROM notes WHERE note_id = $1", [note_id]);
    res.send(results.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.post("/:id/notes", verifyToken, async (req, res) => {
  try {
    const { client_id, note_header, note_body, note_date } = req.body;
    console.log(client_id, note_header, note_body, note_date);
    await db.query("INSERT INTO notes (client_id, note_header, note_body, note_date) VALUES ($1, $2, $3, $4)", [client_id, note_header, note_body, note_date]);
    res.send(`Note has been added for client with the ID ${client_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.put("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { id, note_id } = req.params;
    const { note_header, note_body, note_date } = req.body;
    await db.query(`UPDATE notes SET note_header = $1, note_body = $2, note_date = $3 WHERE note_id = ${note_id} `, [note_header, note_body, note_date]);

    res.send(`Note with the ID ${note_id} has been updated for client with the ID ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

router.delete("/:id/notes/:note_id", verifyToken, async (req, res) => {
  try {
    const { id, note_id } = req.params;
    await db.query("DELETE FROM notes WHERE note_id = $1 AND client_id = $2", [note_id, id]);
    res.send(`Note with the ID ${note_id} has been deleted for client with the ID ${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
