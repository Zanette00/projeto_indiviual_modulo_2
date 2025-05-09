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