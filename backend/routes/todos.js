const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todosControllers.js");

router.get("/api/todos", getAllTodos);

router.get("/api/todos/:id", getTodoById);

router.post("/api/todos", createTodo);

router.put("/api/todos/:id", updateTodoById);

router.delete("/api/todos/:id", deleteTodoById);

module.exports = router;
