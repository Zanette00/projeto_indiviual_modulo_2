import { register, login, logout } from '../controllers/authController.js';
import userController from "../controllers/userController.js";
import taskController from "../controllers/taskController.js";
import reminderController from "../controllers/reminderController.js";
import eventController from "../controllers/eventController.js";
import Router from 'router';

const router = Router();

// Auth
router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);

// Users
router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUser);
router.post("/users", userController.createUserController);
router.put("/users/:id", userController.updateUserController);
router.delete("/users/:id", userController.deleteUserController);

// Tasks
router.get("/tasks", taskController.listTasks);
router.get("/tasks/:id", taskController.getTask);
router.post("/tasks", taskController.createTaskController);
router.put("/tasks/:id", taskController.updateTaskController);
router.delete("/tasks/:id", taskController.deleteTaskController);

// Reminders
router.get("/reminders", reminderController.listReminders);
router.get("/reminders/:id", reminderController.getReminder);
router.post("/reminders", reminderController.createReminderController);
router.put("/reminders/:id", reminderController.updateReminderController);
router.delete("/reminders/:id", reminderController.deleteReminderController);

// Events
router.get("/events", eventController.listEvents);
router.get("/events/:id", eventController.getEvent);
router.post("/events", eventController.createEventController);
router.put("/events/:id", eventController.updateEventController);
router.delete("/events/:id", eventController.deleteEventController);

export default router;
