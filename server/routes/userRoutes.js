/**
 * Rutas de Usuarios
 * Endpoints para gestión de usuarios (Admin only)
 */

const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {protect, authorize} = require("../middleware/auth");

// Todas las rutas requieren Admin
router.use(protect);
router.use(authorize("Admin"));

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
