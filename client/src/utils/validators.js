/**
 * Funciones de validación
 * Helpers para validar formularios
 */

/**
 * Validar email
 */
export const isValidEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

/**
 * Validar contraseña (mínimo 6 caracteres)
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validar que un campo no esté vacío
 */
export const isNotEmpty = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validar color hexadecimal
 */
export const isValidHexColor = (color) => {
  const regex = /^#[0-9A-F]{6}$/i;
  return regex.test(color);
};
