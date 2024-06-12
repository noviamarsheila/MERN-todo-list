import express from "express";
import {
	getTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/TodoController.js";
import isAuthenticated from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/todos", isAuthenticated, getTodos);
router.get("/todos/:uuid", isAuthenticated, getTodoById);
router.post("/todos", isAuthenticated, createTodo);
router.patch("/todos/:uuid", isAuthenticated, updateTodo);
router.delete("/todos/:uuid", isAuthenticated, deleteTodo);

export default router;
