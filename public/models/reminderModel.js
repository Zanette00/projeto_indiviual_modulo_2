// public/models/reminderModel.js
import pool from "../config/database.js";

export async function createReminder(data) {
  const { user_id, related_id, related_type, remind_at, message } = data;
  const res = await pool.query(
    "INSERT INTO reminders(user_id, related_id, related_type, remind_at, message) VALUES($1,$2,$3,$4,$5) RETURNING id",
    [user_id, related_id, related_type, remind_at, message]
  );
  return res.rows[0];
}

export async function getAllReminders() {
  const res = await pool.query(
    "SELECT * FROM reminders ORDER BY remind_at ASC"
  );
  return res.rows;
}

export async function getReminderById(id) {
  const res = await pool.query("SELECT * FROM reminders WHERE id = $1", [id]);
  return res.rows[0];
}

export async function updateReminder(id, data) {
  const { remind_at, message } = data;
  await pool.query(
    "UPDATE reminders SET remind_at = $1, message = $2 WHERE id = $3",
    [remind_at, message, id]
  );
}

export async function deleteReminder(id) {
  await pool.query("DELETE FROM reminders WHERE id = $1", [id]);
}
