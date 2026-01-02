/**
 * Componente Card
 * Contenedor tipo tarjeta reutilizable
 */

const Card = ({
  children,
  title,
  subtitle,
  actions,
  className = "",
  padding = true,
  hover = false,
  ...props
}) => {
  const baseStyles = `bg-white rounded-lg border border-gray-200 ${
    padding ? "p-4" : ""
  } ${
    hover ? "hover:shadow-md transition-shadow duration-200" : "shadow-sm"
  } ${className}`;

  return (
    <div className={baseStyles.trim()} {...props}>
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex-1'>
            {title && (
              <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
            )}
            {subtitle && (
              <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>
            )}
          </div>
          {actions && <div className='ml-4'>{actions}</div>}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

export default Card;
