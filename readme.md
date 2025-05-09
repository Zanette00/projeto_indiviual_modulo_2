# Projeto_Individual_Módulo_2

## Gerenciador de Tarefas

O sistema escolhido para desenvolver será um sistema web completo, feito como projeto individual do segundo módulo do 1º ano do Inteli. Este sistema temm como objetivo principal auxiliar os usuários a organizar e gerenciar suas tarefas diárias, semanais ou mensais por meio de uma interface simples e intuitiva, com categorização e status de progresso.

## Descrição do Sistema

O "Gerenciador de Tarefas" permite que o usuário adicione, visualise, edite e exclua tarefas. Cada tarefa estará associada a alguma categoria, sendo elas "Trabalho", "Estudos", "Pessoal", "Saúde", "Financeiro", ou alguma outra personalizada pelo usuário. Além disso existirá um sistema de status de andamento (progressão da tarefa), estes sendo "Pendente", "Em andamento" ou "Concluída".

Funcionalidades previstas:

- Cadastro de usuários
- Login/logout de sessão
- CRUD de tarefas
- Classificação de tarefas por categorias
- Interface web responsiva

## Estrutura de Pastas e Arquivos

O sistema é construído utilizando o padrão de arquitetura MVC (Model-View-Controller), escolhido para padronização e melhor entendimento da estrutura do código:

    projeto_individual_modulo_2/
│
├── assets/                # Arquivos públicos como imagens e fontes
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── docs/                  # Documentação do projeto
│   ├─assets/              # Arquivos de imagens utilizadas na documentação
│   └── WAD.md
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Arquivo de exemplo para variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints (opcional)

## Como executar o projeto

A inicialização deste projeto, por enquanto, só pode ser efetuada, após a clonagem do repositório, apartir dos comandos "npm start" ou "node server.js", estes sendo executados em um novo terminal para inicializar o servidor do projeto. Após isso, pelo fato do servidor ser iniciado na port 3000, basta acessar o link http://localhost:3000 no navegador da sua escolha.