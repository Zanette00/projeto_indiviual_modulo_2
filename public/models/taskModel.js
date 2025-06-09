// public/models/taskModel.js
import pool from "../config/database.js";

export async function createTask(data) {
  const { user_id, title, description, due_date, status } = data;
  const res = await pool.query(
    "INSERT INTO tasks(user_id, title, description, due_date, status) VALUES($1,$2,$3,$4,$5) RETURNING id",
    [user_id, title, description, due_date, status]
  );
  return res.rows[0];
}

export async function getAllTasks() {
  const res = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  return res.rows;
}

export async function getTaskById(id) {
  const res = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return res.rows[0];
}

export async function updateTask(id, data) {
  const { title, description, due_date, status } = data;
  await pool.query(
    "UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5",
    [title, description, due_date, status, id]
  );
}

export async function deleteTask(id) {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
}
