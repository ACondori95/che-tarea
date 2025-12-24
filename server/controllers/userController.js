/**
 * Controlador de Usuarios
 * Gestión de usuarios por parte del Admin
 */

const User = require("../models/User");

/**
 * @desc    Obtener todos los usuarios
 * @route   GET /api/users
 * @access  Private (Admin only)
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({createdAt: -1});

    res.status(200).json({success: true, quantity: users.length, users});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Obtener usuario por ID
 * @route   GET /api/users/:id
 * @access  Private (Admin only)
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    res.status(200).json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Crear nuevo usuario (Admin)
 * @route   POST /api/users
 * @access  Private (Admin only)
 */
exports.createUser = async (req, res) => {
  try {
    const {name, email, password, rol} = req.body;

    // Verificar si ya existe
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res
        .status(400)
        .json({success: false, message: "El email ya está registrado"});
    }

    const user = await User.create({name, email, password, rol});

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      user: {id: user._id, name: user.name, email: user.email, rol: user.rol},
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Actualizar usuario
 * @route   PUT /api/users/:id
 * @access  Private (Admin only)
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    // Campos permitidos para actualizar
    const allowedFields = ["name", "email", "rol", "active"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Eliminar/Desactivar usuario
 * @route   DELETE /api/users/:id
 * @access  Private (Admin only)
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    // No permitir que un admin se elimine a sí mismo
    if (user._id.toString() === req.user.id) {
      return res
        .status(400)
        .json({success: false, message: "No puedes eliminar tu propia cuenta"});
    }

    // Desactivar en lugar de eliminar (soft delete)
    user.active = false;
    await user.save();

    res
      .status(200)
      .json({success: true, message: "Usuario desactivado exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
