/**
 * EmptyState Component
 * Muestra un estado vacío con ilustración y mensaje
 */

import {Button} from "../ui";

const EmptyState = ({
  icon: Icon,
  title,
  descrption,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {/* Icono */}
      {Icon && (
        <div className='inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6'>
          <Icon className='w-10 h-10 text-gray-400' />
        </div>
      )}

      {/* Título */}
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>{title}</h3>

      {/* Descripción */}
      {descrption && (
        <p className='text-gray-500 mb-8 max-w-md mx-auto'>{descrption}</p>
      )}

      {/* Botón de acción */}
      {actionLabel && onAction && (
        <Button variant='primary' onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
