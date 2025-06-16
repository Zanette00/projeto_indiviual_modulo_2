// migrations/migrate.js
import dotenv from 'dotenv';
import { Client } from 'pg';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function migrate() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
      rejectUnauthorized: false
    }
  });

  const query = `
  -- Tabela de usuários
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de categorias
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Tabela de tarefas
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Inserir categorias padrão
  INSERT INTO categories (name, description) VALUES
  ('Trabalho', 'Tarefas relacionadas ao emprego ou projetos profissionais'),
  ('Estudos', 'Atividades acadêmicas, cursos e leituras'),
  ('Pessoal', 'Compromissos pessoais e metas individuais'),
  ('Saúde', 'Consultas médicas, exercícios e bem-estar'),
  ('Financeiro', 'Controle de gastos e planejamento orçamentário')
  ON CONFLICT DO NOTHING;
  `;

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados");
    
    await client.query(query);
    console.log("✅ Tabelas criadas com sucesso");
  } catch (err) {
    console.error("❌ Erro ao criar tabelas:", err.message);
  } finally {
    await client.end();
    console.log("✅ Conexão encerrada");
  }
}

migrate().catch(console.error);
