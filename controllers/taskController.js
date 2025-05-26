// controllers/taskController.js
require("dotenv").config();
const poolTask = require("../config/database");

// POST /api/tasks
async function createTask(req, res) {
  const { user_id, title, description, due_date } = req.body;
  try {
    const { rows } = await poolTask.query(
      "INSERT INTO tasks(user_id, title, description, due_date) VALUES($1, $2, $3, $4) RETURNING *",
      [user_id, title, description, due_date]
    );
    return res.status(201).json({ task: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/tasks
async function listTasks(req, res) {
  const userId = req.user.id;
  try {
    const { rows } = await poolTask.query(
      "SELECT * FROM tasks WHERE user_id = $1",
      [userId]
    );
    return res.json({ tasks: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// GET /api/tasks/:id
async function getTaskById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await poolTask.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    if (!rows.length)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    return res.json({ task: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  try {
    const { rows } = await poolTask.query(
      "UPDATE tasks SET title=$1, description=$2, due_date=$3, status=$4 WHERE id=$5 RETURNING *",
      [title, description, due_date, status, id]
    );
    if (!rows.length)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    return res.json({ task: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await poolTask.query("DELETE FROM tasks WHERE id = $1", [id]);
    return res.json({ message: "Tarefa excluída com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

module.exports = { createTask, listTasks, getTaskById, updateTask, deleteTask };
