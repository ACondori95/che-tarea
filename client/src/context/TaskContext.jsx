/**
 * TaskContext
 * Gestión global del estado de tareas (Kanban)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  moveTask as moveTaskApi,
  addComment as addCommentApi,
  updateSubtask as updateSubtaskApi,
} from "../api/taskApi";
import {AuthContext} from "./AuthContext";
import {toast} from "react-toastify";

export const TaskContext = createContext();

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    estado: null,
    prioridad: null,
    asignadoA: null,
  });

  const {isAuthenticated} = useContext(AuthContext);

  /**
   * Cargar tareas con filtros
   */
  const loadTasks = useCallback(
    async (customFilters = {}) => {
      if (!isAuthenticated) return;

      setLoading(true);
      try {
        const appliedFilters = {...filters, ...customFilters};
        const response = await getTasks(appliedFilters);

        if (response.success) {
          setTasks(response.tasks);
        }
      } catch (error) {
        console.error("Error al cargar tareas:", error);
        toast.error("Error al cargar las tareas");
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, filters]
  );

  /**
   * Cargar tareas al montar el componente
   */
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Crear nueva tarea
   */
  const createTask = async (taskData) => {
    try {
      const response = await createTaskApi(taskData);

      if (response.success) {
        setTasks((prev) => [response.tarea, ...prev]);
        toast.success("Tarea creada exitosamente");
        return {success: true, tarea: response.tarea};
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error al crear tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Actualizar tarea
   */
  const updateTask = async (taskId, taskData) => {
    try {
      const response = await updateTaskApi(taskId, taskData);

      if (response.success) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? response.tarea : task))
        );
        toast.success("Tarea actualizada exitosamente");
        return {success: true, tarea: response.tarea};
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al actualizar tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Eliminar tarea
   */
  const deleteTask = async (taskId) => {
    try {
      const response = await deleteTaskApi(taskId);

      if (response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
        toast.success("Tarea eliminada exitosamente");
        return {success: true};
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al eliminar tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Mover tarea entre columnas
   */
  const moveTask = async (taskId, nuevoEstado) => {
    try {
      const response = await moveTaskApi(taskId, nuevoEstado);

      if (response.success) {
        setTasks((prev) =>
          prev.map((task) => (task._id === taskId ? response.tarea : task))
        );
        return {success: true, tarea: response.tarea};
      }
    } catch (error) {
      const message = error.response?.data?.message || "Error al mover tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Agregar comentario
   */
  const addComment = async (taskId, comentario) => {
    try {
      const response = await addCommentApi(taskId, comentario);

      if (response.success) {
        // Actualizar la tarea con los nuevos comentarios
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? {...task, comentarios: response.comentarios}
              : task
          )
        );
        toast.success("Comentario agregado");
        return {success: true};
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al agregar comentario";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Actualizar subtarea
   */
  const updateSubtask = async (taskId, subtaskId, completada) => {
    try {
      const response = await updateSubtaskApi(taskId, subtaskId, completada);

      if (response.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? {...task, subtareas: response.subtareas}
              : task
          )
        );
        return {success: true};
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al actualizar subtareas";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Obtener tareas por estado (para columnas Kanban)
   */
  const getTasksByEstado = (estado) => {
    return tasks.filter((task) => task.estado === estado);
  };

  /**
   * Actualizar filtros
   */
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({...prev, ...newFilters}));
    loadTasks(newFilters);
  };

  /**
   * Limpiar filtros
   */
  const clearFilters = () => {
    setFilters({estado: null, prioridad: null, asignadoA: null});
    loadTasks({});
  };

  const value = {
    tasks,
    loading,
    filters,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    addComment,
    updateSubtask,
    getTasksByEstado,
    updateFilters,
    clearFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
