const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
  addComment,
  restoreTask,
  manualCleanup,
} = require("../controllers/taskController");
const {protect} = require("../middleware/authMiddleware");
const {isAdmin} = require("../middleware/roleMiddleware");

// Todas las rutas requieren autenticación
router.use(protect);

// Rotas principales de tareas
router.route("/").get(getTasks).post(createTask);

// Limpieza manual (solo admin)
router.post("/cleanup", isAdmin, manualCleanup);

router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

// Ruta de subtareas
router.post("/:id/subtasks", addSubtask);
router.put("/:id/subtasks/:subtaskId", updateSubtask);
router.delete("/:id/subtasks/:subtaskId", deleteSubtask);

// Rutas de comentarios
router.post("/:id/comments", addComment);

// Restaurar tarea
router.put("/:id/restore", restoreTask);

module.exports = router;
