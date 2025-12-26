/**
 * API de Etiquetas
 * Endpoints para gestión de tags
 */

import axios from "./axios";

/**
 * Obtener todas las etiquetas
 */
export const getTags = async () => {
  const response = await axios.get("/tags");
  return response.data;
};

/**
 * Crear nueva etiqueta (Admin only)
 */
export const createTag = async (tagData) => {
  const response = await axios.post("/tags", tagData);
  return response.data;
};

/**
 * Actualizar etiqueta (Admin only)
 */
export const updateTag = async (id, tagData) => {
  const response = await axios.put(`/tags/${id}`, tagData);
  return response.data;
};

/**
 * Eliminar etiqueta (Admin only)
 */
export const deleteTag = async (id) => {
  const response = await axios.delete(`/tags/${id}`);
  return response.data;
};
