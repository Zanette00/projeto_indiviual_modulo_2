import jwt from "jsonwebtoken";
import { createUser, findUserByEmail, verifyPassword } from "../models/userModel.js";

// Chave secreta fixa para assinatura do JWT
const JWT_SECRET = "task-manager-secret-key-2024";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const user = await createUser({ name, email, password });
    
    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    if (error.message === "Email já cadastrado") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log('Tentativa de login:', { email });

    // Validação básica
    if (!email || !password) {
      console.log('Campos obrigatórios faltando');
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Busca o usuário
    const user = await findUserByEmail(email);
    console.log('Usuário encontrado:', user ? 'Sim' : 'Não');

    if (!user) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Verifica a senha
    const validPassword = await verifyPassword(password, user.password);
    console.log('Senha válida:', validPassword ? 'Sim' : 'Não');

    if (!validPassword) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

export async function logout(req, res) {
  // Se tiver lógica de modelo para logout, chame-a aqui.
  // Por enquanto, apenas retorne sucesso.
  res.status(200).json({ message: "Deslogado com sucesso" });
};
