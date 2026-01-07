// Verificar si el usuario es Admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Acceso denegado. Se requieren permisos de administrador.",
    });
  }
};

// Verificar si el usuario es el propietario del recurso o es admin
const isOwnerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (
      req.user.role === "admin" ||
      req.user._id.toString() === resourceUserId.toString()
    ) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Acceso denegado. No tienes permisos para este recurso.",
      });
    }
  };
};

module.exports = {isAdmin, isOwnerOrAdmin};
