// controllers/reminderController.js
require("dotenv").config();
const poolReminder = require("../config/database");

// POST /api/reminders
async function createReminder(req, res) {
  const { user_id, related_id, related_type, remind_at, message } = req.body;
  try {
    const { rows } = await poolReminder.query(
      "INSERT INTO reminders(user_id, related_id, related_type, remind_at, message) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [user_id, related_id, related_type, remind_at, message]
    );
    return res.status(201).json({ reminder: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/reminders
async function listReminders(req, res) {
  const userId = req.user.id;
  try {
    const { rows } = await poolReminder.query(
      "SELECT * FROM reminders WHERE user_id = $1",
      [userId]
    );
    return res.json({ reminders: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/reminders/:id
async function getReminderById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await poolReminder.query(
      "SELECT * FROM reminders WHERE id = $1",
      [id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Lembrete não encontrado" });
    return res.json({ reminder: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// PUT /api/reminders/:id
async function updateReminder(req, res) {
  const { id } = req.params;
  const { related_id, related_type, remind_at, message } = req.body;
  try {
    const { rows } = await poolReminder.query(
      "UPDATE reminders SET related_id=$1, related_type=$2, remind_at=$3, message=$4 WHERE id=$5 RETURNING *",
      [related_id, related_type, remind_at, message, id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Lembrete não encontrado" });
    return res.json({ reminder: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// DELETE /api/reminders/:id
async function deleteReminder(req, res) {
  const { id } = req.params;
  try {
    await poolReminder.query("DELETE FROM reminders WHERE id = $1", [id]);
    return res.json({ message: "Lembrete excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

module.exports = {
  createReminder,
  listReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
};
