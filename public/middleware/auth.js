import jwt from "jsonwebtoken";
import { findUserById } from "../models/userModel.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const parts = authHeader.split(" ");
    
    if (parts.length !== 2) {
      return res.status(401).json({ error: "Token mal formatado" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUserById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
} 