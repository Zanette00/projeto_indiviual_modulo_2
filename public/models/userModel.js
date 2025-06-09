import pool from "../config/database.js";

export async function createUser(data) {
  const { name, email, password } = data;
  // Se quiser usar bcrypt, importe e aplique aqui, ou utilize registerUser
  const res = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id",
    [name, email, password]
  );
  return res.rows[0];
}

export async function getAllUsers() {
  const res = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
  );
  return res.rows;
}

export async function getUserById(id) {
  const res = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0];
}

export async function updateUser(id, data) {
  const { name, email } = data;
  await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
    name,
    email,
    id,
  ]);
}

export async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
}
