/**
 * Modelo de Etiqueta
 * Define tags/etiquetas personalizables para categorizar tareas
 */

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la etiqueta es obligatorio"],
      trim: true,
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },

    color: {
      type: String,
      required: [true, "El color es obligatorio"],
      match: [
        /^#[0-9A-F]{6}$/i,
        "Debe ser un código de color hexadecimal válido",
      ],
      default: "#6B7280", // gray-500
    },

    // Referencia al usuario creador (solo Admin puede crear)
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true}
);

// Índice compuesto: evitar tags duplicados
tagSchema.index({nombre: 1}, {unique: true});

module.exports = mongoose.model("Tag", tagSchema);
