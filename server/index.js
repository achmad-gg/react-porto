import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
  })
);
app.use(express.json());

const __dirname = path.resolve();
const DATA_PATH = path.join(__dirname, "data.json");

app.get("/api/locales/:lang", (req, res) => {
  const lang = req.params.lang;
  const filePath = path.join(__dirname, "locales", `${lang}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Language not found" });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(data);
});

app.get("/api/projects", (req, res) => {
  const lang = req.query.lang || "id"; // default bahasa Indonesia

  if (!fs.existsSync(DATA_PATH)) return res.json([]);

  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

  const projects = (data.projects || []).map((p) => ({
    id: p.id,
    title: p.title?.[lang] || p.title?.id || "",
    desc: p.desc?.[lang] || p.desc?.id || "",
    tech: p.tech || []
  }));

  res.json(projects);
});

app.post("/api/projects", (req, res) => {
  const { title, desc, tech } = req.body; 
  // title = { id: "...", en: "..." }

  const data = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
    : { projects: [] };

  const newProject = {
    id: Date.now(),
    title,
    desc,
    tech,
  };

  data.projects.push(newProject);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

  res.json({ success: true, project: newProject });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
