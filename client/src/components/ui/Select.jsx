/**
 * Componente Select
 * Dropdown selector reutilizable
 */

import {forwardRef} from "react";
import {ChevronDown} from "lucide-react";

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = "Seleccionar...",
      disabled = false,
      required = false,
      fullWidth = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles = `px-3 py-2 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
      fullWidth ? "w-full" : ""
    } ${
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-primary"
    } ${className}`;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {/* Label */}
        {label && (
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className='relative'>
          <select
            ref={ref}
            disabled={disabled}
            className={baseStyles.trim()}
            {...props}>
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Icono de flecha */}
          <div className='absolute inset-0 right-0 flex items-center pr-3 pointer-events-none'>
            <ChevronDown className='w-4 h-4 text-gray-400' />
          </div>
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

Select.displayName = "Select";

export default Select;
