/**
 * API de Tareas
 * Endpoints para gestión del sistema Kanban
 */

import axios from "./axios";

/**
 * Obtener todas las tareas con filtros opcionales
 */
export const getTasks = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.estado) params.append("estado", filters.estado);
  if (filters.prioridad) params.append("prioridad", filters.prioridad);
  if (filters.asignadoA) params.append("asignadoA", filters.asignadoA);

  const response = await axios.get(`/tasks?${params.toString()}`);
  return response.data;
};

/**
 * Obtener una tarea específica
 */
export const getTask = async (id) => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Crear nueva tarea
 */
export const createTask = async (taskData) => {
  const response = await axios.post("/tasks", taskData);
  return response.data;
};

/**
 * Actualizar tarea
 */
export const updateTask = async (id, taskData) => {
  const response = await axios.put(`/tasks/${id}`, taskData);
  return response.data;
};

/**
 * Eliminar tarea
 */
export const deleteTask = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};

/**
 * Agregar comentario a tarea
 */
export const addComment = async (taskId, comentario) => {
  const response = await axios.post(`/tasks/${taskId}/comments`, {
    texto: comentario,
  });
  return response.data;
};

/**
 * Actualizar estado de subtarea
 */
export const updateSubtask = async (taskId, subtaskId, completada) => {
  const response = await axios.put(`/tasks/${taskId}/subtasks/${subtaskId}`, {
    completada,
  });
  return response.data;
};

/**
 * Mover tarea a otra columna
 */
export const moveTask = async (taskId, nuevoEstado) => {
  const response = await axios.put(`/tasks/${taskId}`, {estado: nuevoEstado});
  return response.data;
};
