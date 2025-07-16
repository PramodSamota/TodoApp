import { Router } from "express";
import { verifyUser } from "../middleware/user.middleware";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controller";


const router = Router();

router.get("/all-todo",verifyUser,getTodos);
router.post("/create-todo",verifyUser,createTodo);
router.patch("/update-todo/:id",verifyUser,updateTodo);
router.delete("/delete-todo/:id",verifyUser,deleteTodo);

export default router;