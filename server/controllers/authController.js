/**
 * Controlador de Autenticación
 * Maneja registro, login y gestión de sesiones
 */

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * Generar token JWT
 */
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @desc    Registrar nuevo usuario
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  try {
    const {name, email, password, rol} = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({email});
    if (userExists) {
      return res
        .status(400)
        .json({success: false, message: "El email ya está registrado"});
    }

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password,
      rol: rol || "Usuario Estándar",
    });

    // Generar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      token,
      user: {id: user._id, name: user.name, email: user.email, rol: user.rol},
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Login de usuario
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Por favor, ingrese email y contraseña",
      });
    }

    // Buscar usuario (incluir password)
    const user = await User.findOne({email}).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({success: false, message: "Credenciales inválidas"});
    }

    // Verificar contraseña
    const isCorrectPassword = await user.matchPassword(password);

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({success: false, message: "Credenciales inválidas"});
    }

    // Verificar si está activo
    if (!user.active) {
      return res
        .status(401)
        .json({success: false, message: "Cuenta desactivada"});
    }

    // Generar token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        rol: user.rol,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Obtener usuario actual
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({success: true, user});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Actualizar perfil
 * @route   PUT /api/auth/profile
 * @access  Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "avatar", "notifications"];
    const updates = {};

    // Filtrar solo campos permitidos
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({success: true, message: "Perfil actualizado exitosamente", user});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};

/**
 * @desc    Cambiar contraseña
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
exports.changePassword = async (req, res) => {
  try {
    const {currentPassword, newPassword} = req.body;

    // Obtener usuario con password
    const user = await User.findById(req.user.id).select("+password");

    // Verificar contraseña actual
    const isCorrectPassword = await user.matchPassword(currentPassword);
    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({success: false, message: "Contraseña actual incorrecta"});
    }

    // Actualizar contraseña
    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({success: true, message: "Contraseña actualizada exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
