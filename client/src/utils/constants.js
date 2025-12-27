/**
 * Constantes de la aplicación
 * Valores reutilizables en toda la app
 */

// Estados de las columnas Kanban (deben coincidir con el backend)
export const ESTADOS_KANBAN = [
  "Por Hacer",
  "En Progreso",
  "Pendiente de Revisión",
  "Finalizadas",
];

// Niveles de prioridad
export const PRIORIDADES = [
  {value: "Baja", label: "Baja", color: "bg-green-100 text-green-800"},
  {value: "Media", label: "Media", color: "bg-yellow-100 text-yellow-800"},
  {value: "Alta", label: "Alta", color: "bg-amber-100 text-amber-800"},
  {value: "Urgente", label: "Urgente", color: "bg-red-100 text-red-100"},
];

// Roles de usuario
export const ROLES = [
  {value: "Usuario Estándar", label: "Usuario Estándar"},
  {value: "Admin", label: "Admin"},
];

// Configuración de días para auto-borrado
export const AUTO_DELETE_DAYS = 10;

// Colores predefinidos para tags
export const TAG_COLORS = [
  "#ef4444", // red-500
  "#f59e0b", // amber-500
  "#eab308", // yellow-500
  "#22c55e", // green-500
  "#3b82f6", // blue-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#6b7280", // gray-500
];

// Mensajes de la aplicación
export const MESSAGES = {
  TASK_DELETED_WARNING: `Las tareas finalizadas se eliminan automáticamente después de ${AUTO_DELETE_DAYS} días`,
  PENDING_REVIEW_INFO: "Esta tarea está esperando aprobación de un Admin",
  NO_TASKS: "No hay tareas en esta columna",
  EMPTY_BOARD: "¡Comenzá creando tu primera tarea!",
};
