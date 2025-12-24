/**
 * Middleware de Autenticación
 * Protege rutas y verifica tokens JWT
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Verificar que el usuario esté autenticado
 */
exports.protect = async (req, res, next) => {
  let token;

  // Verificar si el token está en el header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Verificar si existe el token
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No autorizado para acceder a esta ruta",
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario por ID del token
    req.user = await User.findById(decoded.id);

    if (!req.user || !req.user.active) {
      return res
        .status(401)
        .json({success: false, message: "Usuario no encontrado o inactivo"});
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({success: false, message: "Token inválido o expirado"});
  }
};

/**
 * Verificar que el usuario sea Admin
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({
        success: false,
        message: `El rol '${req.user.rol}' no tiene autorización para acceder a esta ruta`,
      });
    }
    next();
  };
};
