import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../models/eventModel.js";

export async function listEvents(req, res) {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getEvent(req, res) {
  try {
    const event = await getEventById(req.params.id);
    if (!event) return res.sendStatus(404);
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createEventController(req, res) {
  try {
    const id = await createEvent(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateEventController(req, res) {
  try {
    await updateEvent(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteEventController(req, res) {
  try {
    await deleteEvent(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  listEvents,
  getEvent,
  createEventController,
  updateEventController,
  deleteEventController,
};
