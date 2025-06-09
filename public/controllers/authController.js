import { registerUser, loginUser } from "../models/authModel.js";

export async function register(req, res) {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function login(req, res) {
  try {
    const { token } = await loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export async function logout(req, res) {
  // Se tiver lógica de modelo para logout, chame-a aqui.
  // Por enquanto, apenas retorne sucesso.
  res.status(200).json({ message: "Deslogado com sucesso" });
};
