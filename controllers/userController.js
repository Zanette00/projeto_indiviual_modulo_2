// controllers/userController.js
require("dotenv").config();
const pool = require("../config/database");

// GET /api/users
async function listUsers(req, res) {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, created_at FROM users"
    );
    return res.json({ users: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/users/:id
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// PUT /api/users/:id
async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at",
      [name, email, id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return res.json({ message: "Usuário excluído com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

module.exports = { listUsers, getUserById, updateUser, deleteUser };
