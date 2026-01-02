/**
 * Componente Badge
 * Etiquetas y badges para estados y prioridades
 */

const Badge = ({
  children,
  variant = "default",
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  // Variantes de color
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    urgente: "bg-red-100 text-red-800",
    alta: "bg-amber-100 text-amber-800",
    media: "bg-yellow-100 text-yellow-800",
    baja: "bg-green-100 text-green-800",
  };

  // Tamaños
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  const baseStyles = `inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={baseStyles.trim()} {...props}>
      {icon && <span className='mr-1'>{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
