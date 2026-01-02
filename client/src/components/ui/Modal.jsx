/**
 * Componente Modal
 * Diálogo modal reutilizable con overlay
 */

import {useEffect} from "react";
import {X} from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
}) => {
  // Cerrar modal con la tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Tamaños del modal
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in'
      onClick={handleOverlayClick}>
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizes[size]} animate-slide-in`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className='flex items-center justify-between p-4 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100'>
                <X className='w-5 h-5' />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className='p-6 max-h-[70vh] overflow-y-auto'>{children}</div>

        {/* Footer */}
        {footer && (
          <div className='flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50'>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
