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
    const {nombre, email, password, rol} = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await User.findOne({email});
    if (usuarioExistente) {
      return res
        .status(400)
        .json({success: false, message: "El email ya está registrado"});
    }

    // Crear usuario
    const usuario = await User.create({
      nombre,
      email,
      password,
      rol: rol || "Usuario Estándar",
    });

    // Generar token
    const token = generateToken(usuario._id);

    res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      token,
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
        message: "Por favor ingrese email y contraseña",
      });
    }

    // Buscar usuario (incluir password)
    const usuario = await User.findOne({email}).select("+password");

    if (!usuario) {
      return res
        .status(401)
        .json({success: false, message: "Credenciales inválidas"});
    }

    // Verificar contraseña
    const esPasswordCorrecta = await usuario.matchPassword(password);

    if (!esPasswordCorrecta) {
      return res
        .status(401)
        .json({success: false, message: "Credenciales inválidas"});
    }

    // Verificar si está activo
    if (!usuario.activo) {
      return res
        .status(401)
        .json({success: false, message: "Cuenta desactivada"});
    }

    // Generar token
    const token = generateToken(usuario._id);

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        avatar: usuario.avatar,
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
    const usuario = await User.findById(req.user.id);

    res.status(200).json({success: true, usuario});
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
    const camposPermitidos = ["nombre", "avatar", "notificaciones"];
    const actualizaciones = {};

    // Filtrar solo campos permitidos
    Object.keys(req.body).forEach((key) => {
      if (camposPermitidos.includes(key)) {
        actualizaciones[key] = req.body[key];
      }
    });

    const usuario = await User.findByIdAndUpdate(req.user.id, actualizaciones, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Perfil actualizado exitosamente",
      usuario,
    });
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
    const {passwordActual, passwordNueva} = req.body;

    // Obtener usuario con password
    const usuario = await User.findById(req.user.id).select("+password");

    // Verificar contraseña actual
    const esPasswordCorrecta = await usuario.matchPassword(passwordActual);
    if (!esPasswordCorrecta) {
      return res
        .status(400)
        .json({success: false, message: "Contraseña actual incorrecta"});
    }

    // Actualizar contraseña
    usuario.password = passwordNueva;
    await usuario.save();

    res
      .status(200)
      .json({success: true, message: "Contraseña actualizada exitosamente"});
  } catch (error) {
    res.status(500).json({success: false, message: error.message});
  }
};
