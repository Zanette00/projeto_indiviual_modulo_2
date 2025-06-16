import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { getAllTasks, getTaskById } from "./models/taskModel.js";
import methodOverride from "method-override";
import './config/migrations.js'; // Importa e executa as migrações

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Configuração dos arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "views/css")));
app.use("/js", express.static(path.join(__dirname, "views/js")));

// Rotas
app.use("/", router);

// Rotas para as páginas
app.get("/", (req, res) => {
    res.render("pages/homePage");
});

app.get("/about", (req, res) => {
    res.render("pages/aboutPage");
});

app.get("/features", (req, res) => {
    res.render("pages/featuresPage");
});

app.get("/login", (req, res) => {
    res.render("pages/login");
});

app.get("/register", (req, res) => {
    res.render("pages/register");
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.render("pages/tasksPage", { tasks });
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.render("pages/tasksPage", { tasks: [] });
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const task = await getTaskById(req.params.id);
        if (!task) {
            return res.status(404).send("Tarefa não encontrada");
        }
        res.render("pages/taskDetailsPage", { task });
    } catch (error) {
        console.error("Erro ao buscar detalhes da tarefa:", error);
        res.status(500).send("Erro ao buscar detalhes da tarefa");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});