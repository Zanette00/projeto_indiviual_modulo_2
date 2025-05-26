// routes/index.js
const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const eventController = require("../controllers/eventController");
const reminderController = require("../controllers/reminderController");

// ----- Auth Routes -----
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/refresh", authController.refreshToken);

// ----- User Routes -----
router.get("/users", userController.listUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// ----- Task Routes -----
router.post("/tasks", taskController.createTask);
router.get("/tasks", taskController.listTasks);
router.get("/tasks/:id", taskController.getTaskById);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

// ----- Event Routes -----
router.post("/events", eventController.createEvent);
router.get("/events", eventController.listEvents);
router.get("/events/:id", eventController.getEventById);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

// ----- Reminder Routes -----
router.post("/reminders", reminderController.createReminder);
router.get("/reminders", reminderController.listReminders);
router.get("/reminders/:id", reminderController.getReminderById);
router.put("/reminders/:id", reminderController.updateReminder);
router.delete("/reminders/:id", reminderController.deleteReminder);

module.exports = router;
