/**
 * Rutas de Tareas
 * Endpoints para gestión completa del sistema Kanban
 */

const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  addComment,
  updateSubtask,
} = require("../controllers/taskController");
const {protect} = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas CRUD principales
router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

// Rutas específicas
router.post("/:id/comments", addComment);
router.put("/:id/subtasks/:subtaskId", updateSubtask);

module.exports = router;
