-- migrations/init.sql
-- Garante extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'pendente',
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de compromissos (Events)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  location VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de lembretes (Reminders)
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  related_id UUID,
  related_type VARCHAR(20), -- 'task' ou 'event'
  remind_at TIMESTAMPTZ NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir categorias padrão
INSERT INTO categories (name, description) VALUES
('Trabalho', 'Tarefas relacionadas ao emprego ou projetos profissionais'),
('Estudos', 'Atividades acadêmicas, cursos e leituras'),
('Pessoal', 'Compromissos pessoais e metas individuais'),
('Saúde', 'Consultas médicas, exercícios e bem-estar'),
('Financeiro', 'Controle de gastos e planejamento orçamentário')
ON CONFLICT DO NOTHING;

-- Habilita RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Permite que cada usuário só veja/crie/atualize/exclua suas próprias tarefas
CREATE POLICY "User can manage own tasks"
  ON tasks
  FOR ALL
  USING (auth.uid() = user_id);

