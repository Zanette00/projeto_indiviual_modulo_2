// public/models/authModel.js
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretoEscolhido";

export async function registerUser({ name, email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const res = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id",
    [name, email, hash]
  );
  return res.rows[0];
}

export async function loginUser({ email, password }) {
  const res = await pool.query("SELECT id,password FROM users WHERE email=$1", [
    email,
  ]);
  const user = res.rows[0];
  if (!user) throw new Error("Usuário não encontrado");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Senha incorreta");
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return { token };
}
