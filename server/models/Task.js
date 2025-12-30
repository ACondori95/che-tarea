/**
 * Modelo de Tarea
 * Esquema principal para las tareas del sistema Kanban
 */

const mongoose = require("mongoose");

// Sub-esquema para subtareas
const subtareaSchema = new mongoose.Schema({
  titulo: {type: String, required: true, trim: true},
  completada: {type: Boolean, default: false},
});

// Sub-esquema para comentarios
const comentarioSchema = new mongoose.Schema({
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  texto: {type: String, required: true, trim: true},
  fecha: {type: Date, default: Date.now},
});

// Sub-esquema para historial de cambios
const historialSchema = new mongoose.Schema({
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  accion: {
    type: String,
    required: true, // ej: "movió a En Progreso", "cambió la prioridad"
  },
  fecha: {type: Date, default: Date.now},
});

const taskSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [200, "El título no puede exceder 200 caracteres"],
    },

    descripcion: {
      type: String,
      trim: true,
      maxlength: [2000, "La descripción no puede exceder 2000 caracteres"],
    },

    // Estado de la columna Kanban
    estado: {
      type: String,
      enum: [
        "Por Hacer",
        "En Progreso",
        "Pendiente de Revisión",
        "Finalizadas",
      ],
      default: "Por Hacer",
    },

    // Prioridad de la tarea
    prioridad: {
      type: String,
      enum: ["Baja", "Media", "Alta", "Urgente"],
      default: "Media",
    },

    // Usuario asignado
    asignadoA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Tags asociados
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],

    // Subtareas
    subtareas: [subtareaSchema],

    // Fecha límite (opcional)
    fechaLimite: {type: Date, default: null},

    // Comentarios
    comentarios: [comentarioSchema],

    // Historial de cambios
    historial: [historialSchema],

    // Archivos adjuntos (URLs)
    adjuntos: [{nombre: String, url: String, tipo: String}],

    // Usuario creador
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Auto-borrado: fecha de finalización (para tareas completadas)
    fechaFinalizacion: {type: Date, default: null},
  },
  {timestamps: true}
);

// Índice para búsquedas eficientes
taskSchema.index({estado: 1, prioridad: 1});
taskSchema.index({asignadoA: 1});
taskSchema.index({fechaFinalizacion: 1});

// Middleware: Actualizar fecha de finalización al cambiar a "Finalizadas"
taskSchema.pre("save", function () {
  if (
    this.isModified("state") &&
    this.state === "Finalizadas" &&
    !this.fechaFinalizacion
  ) {
    this.fechaFinalizacion = new Date();
  }
});

module.exports = mongoose.model("Task", taskSchema);
