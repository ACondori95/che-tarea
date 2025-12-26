/**
 * API de Autenticación
 * Endpoints para registro, login y gestión de perfil
 */

import axios from "./axios";

/**
 * Registrar nuevo usuario
 */
export const register = async (userData) => {
  const response = await axios.post("/auth/register", userData);
  return response.data;
};

/**
 * Iniciar sesión
 */
export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);

  // Guardar token y usuario en localStorage
  if (response.data.success) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.usuario));
  }

  return response.data;
};

/**
 * Cerrar sesión
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

/**
 * Obtener usuario actual
 */
export const getMe = async () => {
  const response = await axios.get("/auth/me");
  return response.data;
};

/**
 * Actualizar perfil
 */
export const updateProfile = async (profileData) => {
  const response = await axios.put("/auth/profile", profileData);

  // Actualizar usuario en localStorage
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.usuario));
  }

  return response.data;
};

/**
 * Cambiar contraseña
 */
export const changePassword = async (passwordData) => {
  const response = await axios.put("/auth/change-password", passwordData);
  return response.data;
};

/**
 * Verificar si el usuario está autenticado
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/**
 * Obtener usuario del localStorage
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
