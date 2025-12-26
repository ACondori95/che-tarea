/**
 * API de Usuarios
 * Endpoints para gestión de usuarios (Admin only)
 */

import axios from "./axios";

/**
 * Obtener todos los usuarios
 */
export const getUsers = async () => {
  const response = await axios.get("/users");
  return response.data;
};

/**
 * Obtener usuario específico
 */
export const getUser = async (id) => {
  const response = await axios.get(`/users/${id}`);
  return response.data;
};

/**
 * Crear nuevo usuario
 */
export const createUser = async (userData) => {
  const response = await axios.post("/users", userData);
  return response.data;
};

/**
 * Actualizar usuario
 */
export const updateUser = async (id, userData) => {
  const response = await axios.put(`/users/${id}`, userData);
  return response.data;
};

/**
 * Desactivar usuario
 */
export const deleteUser = async (id) => {
  const response = await axios.delete(`/users/${id}`);
  return response.data;
};
