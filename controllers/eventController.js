// controllers/eventController.js
require("dotenv").config();
const poolEvent = require("../config/database");

// POST /api/events
async function createEvent(req, res) {
  const { user_id, title, description, start_time, end_time, location } =
    req.body;
  try {
    const { rows } = await poolEvent.query(
      "INSERT INTO events(user_id, title, description, start_time, end_time, location) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, title, description, start_time, end_time, location]
    );
    return res.status(201).json({ event: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/events
async function listEvents(req, res) {
  const userId = req.user.id;
  try {
    const { rows } = await poolEvent.query(
      "SELECT * FROM events WHERE user_id = $1",
      [userId]
    );
    return res.json({ events: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/events/:id
async function getEventById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await poolEvent.query(
      "SELECT * FROM events WHERE id = $1",
      [id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Evento não encontrado" });
    return res.json({ event: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// PUT /api/events/:id
async function updateEvent(req, res) {
  const { id } = req.params;
  const { title, description, start_time, end_time, location } = req.body;
  try {
    const { rows } = await poolEvent.query(
      "UPDATE events SET title=$1, description=$2, start_time=$3, end_time=$4, location=$5 WHERE id=$6 RETURNING *",
      [title, description, start_time, end_time, location, id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Evento não encontrado" });
    return res.json({ event: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// DELETE /api/events/:id
async function deleteEvent(req, res) {
  const { id } = req.params;
  try {
    await poolEvent.query("DELETE FROM events WHERE id = $1", [id]);
    return res.json({ message: "Evento excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

module.exports = {
  createEvent,
  listEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
