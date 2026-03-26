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
    title: "Cook pasta",
    completed: true,
    createdAt: "01-01-2026",
  },
  {
    id: 2,
    title: "Do homework",
    completed: true,
    createdAt: "03-23-2026",
  },
];

//get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

//get a single todo item
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

  const date = new Date();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title: title,
    completed: false,
    createdAt: date.toLocaleDateString("en-US"),
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

//updates a Todo Item
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((t) => {
    return t.id === id;
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

// deletes a todo item
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const todoIndex = todos.findIndex((t) => {
    t.id === id;
  });

  if (todoIndex !== -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deletedTodo = todos.splice(todoIndex, 1);

  res.json({
    message: "Deleted Todo successfully.",
    todo: deletedTodo[0],
  });
});
