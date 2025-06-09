import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// —— ATENÇÃO AQUI: sirva estáticos diretamente da pasta views ——
app.use("/css", express.static(path.join(__dirname, "public", "views", "css")));
app.use("/js", express.static(path.join(__dirname, "views", "js")));
app.use("/images", express.static(path.join(__dirname, "views", "images")));
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "views", "favicon.ico"))
);

// Body parsers

// Páginas
app.get("/", (req, res) => res.render("pages/homePage"));
app.get("/about", (req, res) => res.render("pages/aboutPage"));
app.get("/features", (req, res) => res.render("pages/featuresPage"));
app.get("/tasks", (req, res) => res.render("pages/tasksPage", { tasks: [] }));
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskDetails = {
    id,
    title: "Exemplo de Tarefa",
    category: "Pessoal",
    status: "Pendente",
    description: "Descrição detalhada da tarefa de exemplo...",
    timeline: [
      { date: "2025-06-01", event: "Criou a tarefa" },
      { date: "2025-06-03", event: "Editou detalhes" },
    ],
    benefits: [
      "Melhor organização",
      "Cumprir prazos",
      "Atingir metas pessoais",
    ],
  };
  return res.render("pages/taskDetailsPage", { task: taskDetails });
});

// API (controllers + router)
app.use("/api", router);

// 404
app.use((req, res) => res.status(404).send("Page not found"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
