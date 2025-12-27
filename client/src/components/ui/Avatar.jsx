/**
 * Componente Avatar
 * Muestra foto de perfil o iniciales del usuario
 */

import {User} from "lucide-react";
import {getInitials} from "../../utils/formatters";

const Avatar = ({src, name, size = "md", className = "", ...props}) => {
  // Tamaños
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const baseStyles = `inline-flex items-center justify-center rounded-full bg-primary text-white font-medium ${sizes[size]} ${className}`;

  // Si hay imagen, mostrarla
  if (src) {
    return (
      <img
        src={src}
        alt={name || "Avatar"}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
        {...props}
      />
    );
  }

  // Si hay nombre, mostrar iniciales
  if (name) {
    return (
      <div className={baseStyles.trim()} {...props}>
        {getInitials(name)}
      </div>
    );
  }

  // Fallback: icono de usuario
  return (
    <div className={baseStyles.trim()} {...props}>
      <User className='w-1/2 h-1/2' />
    </div>
  );
};

export default Avatar;
