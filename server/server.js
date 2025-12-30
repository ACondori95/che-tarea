/**
 * Servidor Principal de Che Tarea
 * Punto de entrada de la aplicación backend
 */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors()); // Habilitar CORS para el frontend
app.use(express.json()); // Parser de JSON
app.use(express.urlencoded({extended: true})); // Parser de URL-enconded

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/userRoutes");

// Montar rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/users", userRoutes);

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Che Tarea API funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({success: false, message: "Ruta no encontrada"});
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌎 Entorno: ${process.env.NODE_ENV}`);
});
