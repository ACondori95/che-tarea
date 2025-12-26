/**
 * useTasks Hook
 * Hook personalizado para acceder al contexto de tareas
 */

import {useContext} from "react";
import {TaskContext} from "../context/TaskContext";

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe darse dentro de un TaskProvider");
  }

  return context;
};
