/**
 * Modelo de Usuario
 * Define el esquema para usuarios del sistema (Admin y Usuario Estándar)
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      maxlength: [100, "El nombre no puede exceder 100 caracteres"],
    },

    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Ingrese un email válido",
      ],
    },

    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      select: false,
    },

    // Rol del usuario
    rol: {
      type: String,
      enum: ["Usuario Estándar", "Admin"],
      default: "Usuario Estándar",
    },

    // Avatar/foto de perfil
    avatar: {type: String, default: null},

    // Preferencias de notificaciones
    notifications: {
      email: {type: Boolean, default: true},
      app: {type: Boolean, default: true},
    },

    // Estado de la cuenta
    active: {type: Boolean, default: true},
  },
  {timestamps: true}
);

// Middleware: Hashear password antes de guardar
userSchema.pre("save", async function (next) {
  // Solo hashear si el password fue modificado
  if (!this.isModified("password")) {
    return next();
  }

  // Generar salt y hashear
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método: Comparar password ingresado con el hasheado
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
