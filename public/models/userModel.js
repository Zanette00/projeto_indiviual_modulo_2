import pool from "../config/database.js";
import bcrypt from "bcrypt";

export async function createUser(data) {
  const { name, email, password } = data;
  
  // Verifica se o usuário já existe
  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email já cadastrado");
  }

  // Hash da senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const res = await pool.query(
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  
  return res.rows[0];
}

export async function getAllUsers() {
  const res = await pool.query(
    "SELECT id, name, email, created_at FROM users ORDER BY created_at DESC"
  );
  return res.rows;
}

export async function getUserById(id) {
  const res = await pool.query(
    "SELECT id, name, email, created_at FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0];
}

export async function updateUser(id, data) {
  const { name, email } = data;
  await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [
    name,
    email,
    id,
  ]);
}

export async function deleteUser(id) {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
}

export async function findUserByEmail(email) {
  console.log('Buscando usuário por email:', email);
  const res = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  console.log('Resultado da busca:', res.rows[0] ? 'Usuário encontrado' : 'Usuário não encontrado');
  return res.rows[0];
}

export async function findUserById(id) {
  const res = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1",
    [id]
  );
  return res.rows[0];
}

export async function verifyPassword(plainPassword, hashedPassword) {
  console.log('Verificando senha...');
  console.log('Senha fornecida:', plainPassword);
  console.log('Hash armazenado:', hashedPassword);
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  console.log('Resultado da verificação:', result ? 'Senha válida' : 'Senha inválida');
  return result;
}
