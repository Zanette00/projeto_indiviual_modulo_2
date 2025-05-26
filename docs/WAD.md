# Documentação do Projeto-Individual-Modulo-2

## Introdução
Este projeto tem como objetivo desenvolver um sistema web para auxiliar no gerenciamento de tarefas, onde os usuários poderão cadastrar, organizar e acompanhar tarefas do dia a dia, com categorização flexível e controle de status. O sistema armazena os dados de forma estruturada e acessível em um banco de dados relacional, com integração via backend e interface web. O gerenciamento de tarefas é pensado para ser simples, personalizado e funcional.

## Modelo Relacional
O modelo relacional foi planejado para garantir a escalabilidade e permitir que cada usuário tenha categorias personalizadas e tarefas associadas, com controle de status e data de entrega.

Tabelas principais:
Usuários: representam quem acessa o sistema.

Categorias: cada usuário pode criar categorias próprias para suas tarefas; o sistema também inclui 5 categorias padrão (sem vínculo com usuário).

Tarefas: itens organizados pelos usuários, com status, descrição, data de entrega e categoria opcional.

![Modelo do Banco](assets/diagrama_do_banco_de_dados.png)

## Modelo Físico (Código SQL)
```
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  user_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO categories (name, description, user_id) VALUES
('Trabalho', 'Tarefas relacionadas ao emprego ou projetos profissionais', NULL),
('Estudos', 'Atividades acadêmicas, cursos e leituras', NULL),
('Pessoal', 'Compromissos pessoais e metas individuais', NULL),
('Saúde', 'Consultas médicas, exercícios e bem-estar', NULL),
('Financeiro', 'Controle de gastos e planejamento orçamentário', NULL);

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  status ENUM('pendente', 'em andamento', 'concluída') DEFAULT 'pendente',
  due_date DATE,
  user_id INT NOT NULL,
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

## Modelo M.V.C.

A arquitetura MVC (Model-View-Controller) é a base estruturante deste sistema de organização e agenda, garantindo clareza lógica, facilidade de manutenção e escalabilidade. O padrão separa a aplicação em três camadas principais:

- **Model**: encapsula a lógica de acesso e manipulação dos dados, mapeando as entidades do Supabase (tabelas `users`, `tasks`, `events` e `reminders`). Cada Model corresponde a uma tabela e expõe métodos de consulta e persistência via SDK do Supabase.

- **View**: embora não haja templates HTML, as Views são representadas pelos objetos JSON padronizados retornados pela API RESTful. Elas estruturam a resposta que o cliente (navegador, app móvel ou serviço) recebe, traduzindo dados brutos em formatos de fácil consumo.

- **Controller**: atuam como intermediários entre as requisições HTTP vindas das Views e as operações nos Models. Cada Controller (`authController`, `userController`, `taskController`, `eventController`, `reminderController`) recebe parâmetros, aplica validações (por exemplo, verificando JWT ou formatos de data), chama os métodos do Model/Supabase e formata o resultado em JSON.

## Servidor de Banco de Dados

Utilizamos o PostgreSQL gerenciado pelo Supabase. A conexão é feita tanto pelo SDK do Supabase (para Auth e CRUD direto nas tabelas) quanto, quando necessário, por um Pool PostgreSQL tradicional (via `pg`) para scripts de migração.

## Configuração do Banco de Dados

As credenciais são mantidas no arquivo `.env` na raiz do projeto:

```ini
DATABASE_URL=postgresql://postgres.pclmxfodzyegvmjuthxb:cFR6XileMIVzeZz3@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
DB_HOST=aws-0-sa-east-1.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.xfvwejuemuhrjzjbwebe
DB_PASSWORD=cFR6XileMIVzeZz3
DB_NAME=postgres
DB_DATABASE=postgres
PORT=3000
DB_SSL=true
```

Em `config/database.js`, instanciamos o Pool:

```js
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

## Migrações (migrate.js)

Executamos um script único (`npm run migrate`) que cria as tabelas com UUID, relacionamentos e campos necessários:
- **users** (id, email, password, created_at)
- **tasks** (id, user_id, title, description, due_date, status)
- **events** (id, user_id, title, description, start_time, end_time, location)
- **reminders** (id, user_id, related_id, related_type, remind_at, message)

## Testes da API
Para garantir a qualidade, testei cada endpoint no Postman, incluindo cenários de sucesso e falha:

**Users**
- `POST /api/auth/register` → cadastro de usuário (201)
- `POST /api/auth/login`    → login e sessão JWT (200)
- `POST /api/auth/refresh`  → renovação de token (200)
- `POST /api/auth/logout`   → encerramento da sessão (200)

**Tasks**
- `POST /api/tasks`         → criação (201)
- `GET  /api/tasks`         → listagem das tarefas do usuário (200)
- `GET  /api/tasks/:id`     → detalhes (200)
- `PUT  /api/tasks/:id`     → atualização (200)
- `DELETE /api/tasks/:id`   → exclusão (200)

**Events**
- `POST /api/events`        → criação de evento (201)
- `GET  /api/events`        → listagem de eventos (200)
- `GET  /api/events/:id`    → detalhes (200)
- `PUT  /api/events/:id`    → atualização (200)
- `DELETE /api/events/:id`  → exclusão (200)

**Reminders**
- `POST /api/reminders`     → criação de lembrete (201)
- `GET  /api/reminders`     → listagem de lembretes (200)
- `GET  /api/reminders/:id` → detalhes (200)
- `PUT  /api/reminders/:id` → atualização (200)
- `DELETE /api/reminders/:id` → exclusão (200)