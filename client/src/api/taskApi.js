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

  if (filters.status) params.append("status", filters.status);
  if (filters.priority) params.append("priority", filters.priority);
  if (filters.assignedTo) params.append("assignedTo", filters.assignedTo);

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
export const addComment = async (taskId, comment) => {
  const response = await axios.post(`/tasks/${taskId}/comments`, {
    text: comment,
  });
  return response.data;
};

/**
 * Actualizar estado de subtarea
 */
export const updateSubtask = async (taskId, subtaskId, completed) => {
  const response = await axios.put(`/tasks/${taskId}/subtasks/${subtaskId}`, {
    completed,
  });
  return response.data;
};

/**
 * Mover tarea a otra columna
 */
export const moveTask = async (taskId, newStatus) => {
  const response = await axios.put(`/tasks/${taskId}`, {status: newStatus});
  return response.data;
};
