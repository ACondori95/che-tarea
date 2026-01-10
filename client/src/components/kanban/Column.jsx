import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import {AlertCircle} from "lucide-react";

const Column = ({id, title, tasks, onTaskClick, isFinalized = false}) => {
  const {setNodeRef} = useDroppable({id});

  // Estilos específicos para cada columna
  const columnStyles = {
    por_hacer: "bg-gray-50",
    en_progreso: "bg-blue-50",
    pendiente_revision: "bg-amber-50",
    finalizada: "bg-green-50",
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Header de la columna */}
      <div className='mb-4'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='font-semibold text-gray-900 text-lg'>{title}</h3>
          <span className='px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium'>
            {tasks.length}
          </span>
        </div>

        {/* Mensaje especial para Pendiente de Revisión */}
        {id === "pendiente_revision" && tasks.length > 0 && (
          <div className='flex items-start gap-2 p-2 bg-amber-100 border border-amber-300 rounded text-xs text-amber-800'>
            <AlertCircle size={14} className='flex-shrink-0 mt-0.5' />
            <span>Tareas esperando aprobación de un administrador</span>
          </div>
        )}

        {/* Mensaje de auto-borrado para Finalizadas */}
        {isFinalized && (
          <div className='flex items-start gap-2 p-2 bg-amber-100 border border-amber-300 rounded text-xs text-amber-800'>
            ⏰ Auto-borrado en 10 días
          </div>
        )}
      </div>

      {/* Lista de tareas */}
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-lg p-3 ${columnStyles[id]} min-h-[200px]`}>
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}>
          <div className='space-y-3'>
            {tasks.length === 0 ? (
              <div className='text-center py-8 text-gray-400 text-sm'>
                No hay tareas aquí
              </div>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onClick={() => onTaskClick(task)}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
