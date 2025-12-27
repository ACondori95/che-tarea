/**
 * Componente Input
 * Campo de entrada reutilizable con validación visual
 */

import {forwardRef} from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      type = "text",
      placeholder,
      disabled = false,
      required = false,
      icon,
      fullWidth = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = `px-3 py-2 border rounded-lg
    focus:outline-none focus:ring-2 focus:border-transparent
    transition-colors duration-200
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${fullWidth ? "w-full" : ""}
    ${
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-primary"
    }
    ${icon ? "pl-10" : ""}
    ${className}`;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className='relative'>
          {/* Icon */}
          {icon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <span className='text-gray-400'>{icon}</span>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={baseStyles.trim()}
            {...props}
          />
        </div>

        {/* Helper Text o Error */}
        {(error || helperText) && (
          <p
            className={`mt-1 text-sm ${
              error ? "text-red-500" : "text-gray-500"
            }`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
