// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let todos = []; // In-memory store (resets on restart)
let id = 1;

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: id++, task };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== todoId);
  res.json({ message: "Deleted" });
});

// (Optional) Update todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const { task } = req.body;
  const todo = todos.find((t) => t.id === todoId);
  if (todo) {
    todo.task = task;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
