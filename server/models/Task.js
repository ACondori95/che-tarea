/**
 * Modelo de Tarea
 * Esquema principal para las tareas del sistema Kanban
 */

const mongoose = require("mongoose");

// Sub-esquema para subtareas
const subtaskSchema = new mongoose.Schema({
  title: {type: String, required: true, trim: true},
  completed: {type: Boolean, default: false},
});

// Sub-esquema para comentarios
const commentSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  text: {type: String, required: true, trim: true},
  date: {type: Date, default: Date.now},
});

// Sub-esquema para historial de cambios
const historySchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  action: {type: String, required: true},
  date: {type: Date, default: Date.now},
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      trim: true,
      maxlength: [200, "El título no puede exceder 200 caracteres"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "La descripción no puede exceder 2000 caracteres"],
    },

    // Estado de la columna Kanban
    state: {
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
    priority: {
      type: String,
      enum: ["Baja", "Media", "Alta", "Urgente"],
      default: "Media",
    },

    // Usuario asignado
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Tags asociados
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],

    // Subtareas
    subtasks: [subtaskSchema],

    // Fecha límite (opcional)
    limitDate: {type: Date, default: null},

    // Comentarios
    comments: [commentSchema],

    // Historial de cambios
    history: [historySchema],

    // Archivos adjustos (URLs)
    attachments: [{name: String, url: String, type: String}],

    // Usuario creador
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Ato-borrado: fecha de finalización (para tareas completadas)
    endDate: {type: Date, default: null},
  },
  {timestamps: true}
);

// Índice para búsquedas eficientes
taskSchema.index({estado: 1, prioridad: 1});
taskSchema.index({assignedTo: 1});
taskSchema.index({endDate: 1});

// Middleware: Actualizar fecha de finalización al cambiar a "Finalizadas"
taskSchema.pre("save", function (next) {
  if (
    this.isModified("state") &&
    this.state === "Finalizadas" &&
    !this.endDate
  ) {
    this.endDate = new Date();
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
