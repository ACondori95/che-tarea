/**
 * Column Component
 * Columna del tablero Kanban
 */

import {Plus} from "lucide-react";
import TaskCard from "./TaskCard";
import {TaskCardSkeleton} from "../ui";

const Column = ({
  title,
  tasks = [],
  loading = false,
  onAddTask,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
  emptyMessage = "No hay tareas",
  highlight = false,
  warningMessage = null,
}) => {
  return (
    <div className='flex flex-col h-full bg-gray-50 rounded-lg'>
      {/* Header de la columna */}
      <div
        className={`p-4 border-b border-gray-200 ${
          highlight ? "bg-amber-50" : "bg-white"
        }`}>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>
            {title}
          </h2>
          <span className='inline-flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-700 text-xs font-medium rounded-full'>
            {tasks.length}
          </span>
        </div>

        {/* Mensaje de advertencia (para "Pendiente de Revisión") */}
        {warningMessage && (
          <div className='mt-2 p-2 bg-amber-100 border border-amber-200 rounded text-xs text-amber-800'>
            {warningMessage}
          </div>
        )}

        {/* Botón agregar tarea */}
        {onAddTask && (
          <button
            onClick={onAddTask}
            className='mt-3 w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50 transition-colors'>
            <Plus className='w-4 h-4' />
            <span>Agregar Tarea</span>
          </button>
        )}
      </div>

      {/* Lista de tareas */}
      <div className='flex-1 overflow-y-auto p-4 space-y-3'>
        {loading ? (
          // Skeletons mientras carga
          <>
            <TaskCardSkeleton />
            <TaskCardSkeleton />
          </>
        ) : tasks.length > 0 ? (
          // Tareas
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onClick={onTaskClick}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))
        ) : (
          // Estado vacío
          <div className='text-center py-8'>
            <p className='text-sm text-gray-500'>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
