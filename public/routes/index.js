import express from 'express';
import { register, login } from '../controllers/authController.js';
import taskController from "../controllers/taskController.js";

const router = express.Router();

// Rotas da API
router.post('/auth/register', register);
router.post('/auth/login', login);

// Rotas da API de tarefas
router.get("/api/tasks", taskController.listTasks);
router.get("/api/tasks/:id", taskController.getTask);
router.post("/api/tasks", taskController.createTaskController);
router.put("/api/tasks/:id", taskController.updateTaskController);
router.patch("/api/tasks/:id/status", taskController.updateTaskStatusController);
router.delete("/api/tasks/:id", taskController.deleteTaskController);

export default router;
