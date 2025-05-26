// controllers/authController.js
require("dotenv").config();
const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
      [name, email, hashed]
    );
    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === "23505")
      return res.status(400).json({ error: "Email já cadastrado" });
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );
    const user = rows[0];
    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Credenciais inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}

// POST /api/auth/logout
function logout(req, res) {
  // Stateless JWT: o cliente deve descartar o token
  return res.json({ message: "Logout realizado com sucesso." });
}

// POST /api/auth/refresh
function refreshToken(req, res) {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token necessário" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token: newToken });
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = { register, login, logout, refreshToken };
