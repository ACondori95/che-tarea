/**
 * Rutas de Etiquetas
 * Endpoints para gestión de tags (Admin only)
 */

const express = require("express");
const router = express.Router();
const {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tagController");
const {authorize} = require("../middleware/auth");

// Todas las rutas requieren autenticación
router.use(protect);

// GET es público para los usuarios autenticados, resto solo Admin
router.get("/", getTags);

router.use(authorize("Admin")); // Todas las siguentes requieren Admin

router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
