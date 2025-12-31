/**
 * Funciones de formateo
 * Helpers para formatear fechas, textos, etc.
 */

/**
 * Formatear fecha a texto legible
 */
export const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now - d);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Si fue hoy
  if (diffDays === 0) {
    return "Hoy";
  }

  // Si fue ayer
  if (diffDays === 1) {
    return "Ayer";
  }

  // Si fue hace menos de 7 días
  if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  }

  // Formato normal
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Formatear fecha completa con hora
 */
export const formatDateTime = (date) => {
  if (!date) return "";

  const d = new Date(date);
  return d.toLocaleString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calcular días restantes hasta una fecha
 */
export const daysUntil = (date) => {
  if (!date) return null;

  const d = new Date(date);
  const now = new Date();
  const diffTime = d - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Truncar texto largo
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Capitalizar primera letra
 */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Obtener iniciales de un nombre
 */
export const getInitials = (name) => {
  if (!name) return "??";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
