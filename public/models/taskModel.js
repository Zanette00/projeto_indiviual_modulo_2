// public/models/taskModel.js
import pool from "../config/database.js";

export async function createTask(data) {
  console.log('Criando tarefa com dados:', data);
  const { title, description, category, due_date, status } = data;
  
  try {
    const res = await pool.query(
      "INSERT INTO tasks(title, description, category, due_date, status) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [title, description, category, due_date, status || 'pendente']
    );
    console.log('Tarefa criada com sucesso:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }
}

export async function getAllTasks() {
  console.log('Buscando todas as tarefas');
  try {
    const res = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
    console.log('Tarefas encontradas:', res.rows.length);
    return res.rows;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
}

export async function getTaskById(id) {
  console.log('Buscando tarefa por ID:', id);
  try {
    const res = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    console.log('Tarefa encontrada:', res.rows[0] ? 'Sim' : 'Não');
    return res.rows[0];
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    throw error;
  }
}

export async function updateTask(id, data) {
  console.log('Atualizando tarefa:', { id, data });
  const { title, description, category, due_date, status } = data;
  try {
    const res = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, category = $3, due_date = $4, status = $5 WHERE id = $6 RETURNING *",
      [title, description, category, due_date, status, id]
    );
    console.log('Tarefa atualizada:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
}

export async function updateTaskStatus(id, status) {
  console.log('Atualizando status da tarefa:', { id, status });
  try {
    const res = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    console.log('Status atualizado:', res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
}

export async function deleteTask(id) {
  console.log('Excluindo tarefa:', id);
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    console.log('Tarefa excluída com sucesso');
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw error;
  }
}
