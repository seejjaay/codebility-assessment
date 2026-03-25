const express = require("express");
const app = express();
const PORT = process.env.PORT || 10533;

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

let todos = [
  {
    id: 1,
    title: "title1",
    completed: true,
    createdAt: "01-01-2026",
  },
  {
    id: 2,
    title: "title2",
    completed: true,
    createdAt: "03-23-2026",
  },
];

//get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

//get a single todo
app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => {
    return t.id === id;
  });

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  res.json(todo);
});

//posts a new Todo Item
app.post("/api/todos", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//updates a Todo Item
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((todo) => {
    return todo.id === id;
  });

  if (!todo) {
    return res.status(400).json({ message: "Todo not found" });
  }

  const { title, completed } = req.body;

  //updates todo Item if values are provided
  if (title !== undefined) {
    todo.title = title;
  }
  if (completed !== undefined) {
    todo.completed = completed;
  }

  res.json(todo);
});
