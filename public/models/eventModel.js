// public/models/eventModel.js
import pool from "../config/database.js";

export async function createEvent(data) {
  const { user_id, title, description, start_time, end_time, location } = data;
  const res = await pool.query(
    "INSERT INTO events(user_id, title, description, start_time, end_time, location) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
    [user_id, title, description, start_time, end_time, location]
  );
  return res.rows[0];
}

export async function getAllEvents() {
  const res = await pool.query("SELECT * FROM events ORDER BY start_time DESC");
  return res.rows;
}

export async function getEventById(id) {
  const res = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
  return res.rows[0];
}

export async function updateEvent(id, data) {
  const { title, description, start_time, end_time, location } = data;
  await pool.query(
    "UPDATE events SET title = $1, description = $2, start_time = $3, end_time = $4, location = $5 WHERE id = $6",
    [title, description, start_time, end_time, location, id]
  );
}

export async function deleteEvent(id) {
  await pool.query("DELETE FROM events WHERE id = $1", [id]);
}
