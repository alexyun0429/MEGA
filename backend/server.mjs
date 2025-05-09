import express from "express";
import Database from "better-sqlite3";
import cors from "cors";

const app = express();
const db = new Database("db.sqlite3");

db.exec(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    story_id INTEGER,
    value TEXT,
    FOREIGN KEY(story_id) REFERENCES stories(id)
  );
`);

app.use(cors(), express.json());

// Get all stories
app.get("/stories", (req, res) => {
  const rows = db.prepare("SELECT * FROM stories").all();
  res.json(rows);
});

// Add a story
app.post("/stories", (req, res) => {
  const { title } = req.body;
  const info = db.prepare("INSERT INTO stories(title) VALUES(?)").run(title);
  res.json({ id: info.lastInsertRowid, title });
});

// Cast a vote
app.post("/stories/:id/vote", (req, res) => {
  const { value } = req.body;
  db.prepare("INSERT INTO votes(story_id, value) VALUES(?,?)").run(
    req.params.id,
    value
  );
  res.sendStatus(201);
});

// Get results
app.get("/stories/:id/results", (req, res) => {
  const counts = db
    .prepare(
      `
    SELECT value, COUNT(*) as count
    FROM votes
    WHERE story_id = ?
    GROUP BY value
  `
    )
    .all(req.params.id);
  res.json(counts);
});

app.listen(4000, () => console.log("API listening on http://localhost:4000"));
