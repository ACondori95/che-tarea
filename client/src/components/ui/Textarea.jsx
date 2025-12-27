/**
 * Componente Textarea
 * Área de texto multilínea reutilizable
 */

import {forwardRef} from "react";

const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      placeholder,
      disabled = false,
      required = false,
      rows = 4,
      maxLength,
      showCounter = false,
      fullWidth = true,
      className = "",
      value,
      ...props
    },
    ref
  ) => {
    const baseStyles = `px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none ${
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

        {/* Textarea */}
        <textarea
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={baseStyles.trim()}
          {...props}
        />

        {/* Footer: Helper Text / Error / Counter */}
        <div className='flex justify-between items-start mt-1'>
          <div className='flex-1'>
            {(error || helperText) && (
              <p
                className={`text-sm ${
                  error ? "text-red-500" : "text-gray-500"
                }`}>
                {error || helperText}
              </p>
            )}
          </div>
          {showCounter && maxLength && (
            <p className='text-xs text-gray-500 ml-2'>
              {value?.length || 0}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
