import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
} from "../models/reminderModel.js";

export async function listReminders(req, res) {
  try {
    const reminders = await getAllReminders();
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getReminder(req, res) {
  try {
    const reminder = await getReminderById(req.params.id);
    if (!reminder) return res.sendStatus(404);
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createReminderController(req, res) {
  try {
    const id = await createReminder(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateReminderController(req, res) {
  try {
    await updateReminder(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteReminderController(req, res) {
  try {
    await deleteReminder(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  listReminders,
  getReminder,
  createReminderController,
  updateReminderController,
  deleteReminderController,
};
