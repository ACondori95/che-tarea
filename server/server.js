const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Bienvenido a Che Tarea API",
    version: "1.0.0",
    status: "active",
    database: "connected",
    endpoints: {auth: "/api/auth", tasks: "/api/tasks", health: "/health"},
  });
});

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({success: false, message: "Ruta no encontrada"});
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
  console.log(`🌎 Entorno: ${process.env.NODE_ENV || "development"}`);
});
