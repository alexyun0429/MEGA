import express from "express";
import Database from "better-sqlite3";
import cors from "cors";
import session from "express-session";

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
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE
  );
`);

app.use(cors(), express.json());

// 2) Session middleware
app.use(
  session({
    secret: "a very secret string here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set true if you use HTTPS
      httpOnly: true,
    },
  })
);

app.get("/", (_req, res) => {
  res.send("Pointing Poker API is up and running!");
});

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

// Handle form‐POST to /login
app.post("/login", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  // 1) Try to find existing user
  let user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

  // 2) If not found, create them
  if (!user) {
    try {
      const info = db
        .prepare("INSERT INTO users(username) VALUES(?)")
        .run(username);
      user = { id: info.lastInsertRowid, username };
    } catch (e) {
      return res.status(500).json({ error: "Could not create user" });
    }
  }

  // 3) Store their ID on the session
  req.session.userId = user.id;

  // 4) Return the “logged in” user
  res.json({ id: user.id, username: user.username });
});

app.get("/whoami", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const me = db
    .prepare("SELECT id, username FROM users WHERE id = ?")
    .get(req.session.userId);
  res.json(me);
});

// GET /users — returns all users, only if you’re logged in
app.get("/users", (req, res) => {
  // 1) Check authentication
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // 2) Query the database for all users
  const users = db.prepare("SELECT id, username FROM users").all();

  // 3) Return them in the shape your front-end expects
  res.json({ users });
});

app.listen(4000, () => console.log("API listening on http://localhost:4000"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
