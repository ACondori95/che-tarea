/**
 * TaskCard Component
 * Tarjeta individual de tarea en el tablero Kanban
 */

import {
  CheckSquare,
  MessageSquare,
  MoreVertical,
  Paperclip,
} from "lucide-react";
import {Avatar, Badge} from "../ui";
import {formatDate} from "../../utils/formatters";
import {useEffect, useRef, useState} from "react";

const TaskCard = ({task, onClick, onEdit, onDelete}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calcular progreso de subtarea
  const subtareasCompletadas =
    task.subtareas?.filter((st) => st.completada).length || 0;
  const totalSubtareas = task.subtareas?.length || 0;
  const progresoSubtareas =
    totalSubtareas > 0
      ? Math.round((subtareasCompletadas / totalSubtareas) * 100)
      : 0;

  // Determinar variante del badge según prioridad
  const getPriorityVariant = (prioridad) => {
    const variants = {
      Urgente: "urgente",
      Alta: "alta",
      Media: "media",
      Baja: "baja",
    };
    return variants[prioridad] || "default";
  };

  return (
    <div
      className='bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group'
      onClick={() => onClick && onClick(task)}>
      {/* Header: Badge de prioridad + Menú */}
      <div className='flex items-start justify-between mb-3'>
        <Badge variant={getPriorityVariant(task.prioridad)} size='sm'>
          {task.prioridad}
        </Badge>

        {/* Menú de opciones */}
        <div className='relative' ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className='opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 p-1 rounded'>
            <MoreVertical className='w-4 h-4' />
          </button>

          {showMenu && (
            <div className='absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit && onEdit(task);
                  setShowMenu(false);
                }}
                className='w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50'>
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(task);
                  setShowMenu(false);
                }}
                className='w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50'>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título */}
      <h3 className='text-sm font-semibold text-gray-900 mb-2 line-clamp-2'>
        {task.titulo}
      </h3>

      {/* Descripción (is existe) */}
      {task.descripcion && (
        <p className='text-xs text-gray-600 mb-3 line-clamp-2'>
          {task.descripcion}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className='flex flex-wrap gap-1 mb-3'>
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag._id}
              className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium'
              style={{backgroundColor: `${tag.color}20`, color: tag.color}}>
              {tag.nombre}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className='text-xs text-gray-500'>
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer: Metadata */}
      <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
        {/* Indicadores de actividad */}
        <div className='flex items-center space-x-3 text-xs text-gray-500'>
          {/* Subtareas */}
          {totalSubtareas > 0 && (
            <div className='flex items-center space-x-1'>
              <CheckSquare className='w-3.5 h-3.5' />
              <span>
                {subtareasCompletadas}/{totalSubtareas}
              </span>
            </div>
          )}

          {/* Comentarios */}
          {task.comentarios && task.comentarios.length > 0 && (
            <div className='flex items-center space-x-1'>
              <MessageSquare className='w-3.5 h-3.5' />
              <span>{task.comentarios.length}</span>
            </div>
          )}

          {/* Adjuntos */}
          {task.adjuntos && task.adjuntos.length > 0 && (
            <div className='flex items-center space-x-1'>
              <Paperclip className='w-3.5 h-3.5' />
              <span>{task.adjuntos.length}</span>
            </div>
          )}

          {/* Fecha Límite */}
          {task.fechaLimite && (
            <div className='flex items-center space-x-1'>
              <Calend className='w-3.5 h-3.5' />
              <span>{formatDate(task.fechaLimite)}</span>
            </div>
          )}

          {/* Avatar del asignado */}
          {task.asignadoA && (
            <Avatar
              name={task.asignadoA.nombre}
              src={task.asignadoA.avatar}
              size='sm'
            />
          )}
        </div>

        {/* Barra de progreso de subtareas */}
        {totalSubtareas > 0 && (
          <div className='mt-3'>
            <div className='w-full bg-gray-200 rounded-full h-1.5'>
              <div
                className='bg-primary h-1.5 rounded-full transition-all duration-300'
                style={{width: `${progresoSubtareas}`}}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
