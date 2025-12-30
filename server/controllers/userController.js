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
    const usuarios = await User.find()
      .select("-password")
      .sort({createdAt: -1});

    res.status(200).json({success: true, cantidad: usuarios.length, usuarios});
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
    const usuario = await User.findById(req.params.id).select("-password");

    if (!usuario) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    res.status(200).json({success: true, usuario});
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
    const {nombre, email, password, rol} = req.body;

    // Verificar si ya existe
    const usuarioExistente = await User.findOne({email});
    if (usuarioExistente) {
      return res
        .status(400)
        .json({success: false, message: "El email ya está registrado"});
    }

    const usuario = await User.create({nombre, email, password, rol});

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
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
    const usuario = await User.findById(req.params.id);

    if (!usuario) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    // Campos permitidos para actualizar
    const camposPermitidos = ["nombre", "email", "rol", "activo"];
    const actualizaciones = {};

    Object.keys(req.body).forEach((key) => {
      if (camposPermitidos.includes(key)) {
        actualizaciones[key] = req.body[key];
      }
    });

    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      actualizaciones,
      {new: true, runValidators: true}
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      usuario: usuarioActualizado,
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
    const usuario = await User.findById(req.params.id);

    if (!usuario) {
      return res
        .status(404)
        .json({success: false, message: "Usuario no encontrado"});
    }

    // No permitir que un admin se elimine a sí mismo
    if (usuario._id.toString() === req.user.id) {
      return res
        .status(400)
        .json({success: false, message: "No puedes eliminar tu propia cuenta"});
    }

    // Desactivar en lugar de eliminar (soft delete)
    usuario.activo = false;
    await usuario.save();

    res
      .status(200)
      .json({success: true, message: "Usuario desactivado exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
