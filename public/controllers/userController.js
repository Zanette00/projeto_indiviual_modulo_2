import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUserController(req, res) {
  try {
    const id = await createUser(req.body);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUserController(req, res) {
  try {
    await updateUser(req.params.id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUserController(req, res) {
  try {
    await deleteUser(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default {
  listUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
};