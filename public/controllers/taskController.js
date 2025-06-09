import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../models/taskModel.js";

export async function listTasks(req, res) {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTask(req, res) {
  try {
    const task = await getTaskById(req.params.id);
    if (!task) return res.sendStatus(404);
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createTaskController(req, res) {
  try {
    const id = await createTask(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateTaskController(req, res) {
  try {
    await updateTask(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteTaskController(req, res) {
  try {
    await deleteTask(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  listTasks,
  getTask,
  createTaskController,
  updateTaskController,
  deleteTaskController,
};
