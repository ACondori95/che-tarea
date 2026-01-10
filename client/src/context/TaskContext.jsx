import {createContext, useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import {toast} from "react-toastify";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask debe ser usado dentro de TaskProvider");
  }
  return context;
};

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  // Obtener todas las tareas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get("/tasks");
      setTasks(data.data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      toast.error("Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  };

  // Obtener etiquetas
  const fetchTags = async () => {
    try {
      const {data} = await axios.get("/tags");
      setTags(data.data);
    } catch (error) {
      console.error("Error al cargar etiquetas:", error);
    }
  };

  // Crear tarea
  const createTask = async (taskData) => {
    try {
      const {data} = await axios.post("/tasks", taskData);
      setTasks((prev) => [data.data, ...prev]);
      toast.success("Tarea creada exitosamente");
      return {success: true, data: data.data};
    } catch (error) {
      const message = error.response?.data?.message || "Error al crear tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  // Actualizar tarea
  const updateTask = async (taskId, updates) => {
    try {
      const {data} = await axios.put(`/tasks/${taskId}`, updates);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data.data : task))
      );
      toast.success("Tarea actualizada exitosamente");
      return {success: true, data: data.data};
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al actualizar tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Tarea eliminada exitosamente");
      return {success: true};
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al eliminar tarea";
      toast.error(message);
      return {success: false, message};
    }
  };

  // Agregar subtarea
  const addSubtask = async (taskId, subtaskTitle) => {
    try {
      const {data} = await axios.post(`/tasks/${taskId}/subtasks`, {
        title: subtaskTitle,
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data.data : task))
      );
      toast.success("Subtarea agregada");
      return {success: true};
    } catch (error) {
      toast.error("Error al agregar subtarea");
      return {success: false};
    }
  };

  // Actualizar subtarea
  const updateSubtask = async (taskId, subtaskId, updates) => {
    try {
      const {data} = await axios.put(
        `/tasks/${taskId}/subtasks/${subtaskId}`,
        updates
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data.data : task))
      );
      return {success: true};
    } catch (error) {
      toast.error("Error al actualizar subtarea");
      return {success: false};
    }
  };

  // Agregar comentario
  const addComment = async (taskId, text) => {
    try {
      const {data} = await axios.post(`/tasks/${taskId}/comments`, {text});
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data.data : task))
      );
      toast.success("Comentario agregado");
      return {success: true};
    } catch (error) {
      toast.error("Error al agregar comentario");
      return {success: false};
    }
  };

  // Cargar datos al montar
  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  const value = {
    tasks,
    loading,
    tags,
    fetchTasks,
    fetchTags,
    createTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    addComment,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
