/**
 * PrivateRoute Component
 * Protege rutas que requieren autenticación
 */

import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const PrivateRoute = ({children, adminOnly = false}) => {
  const {isAuthenticated, user, loading} = useAuth();

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto' />
          <p className='mt-4 text-gray-600'>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Si la ruta requiere admin y el usuario no es admin
  if (adminOnly && user?.rol !== "Admin") {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center max-w-md'>
          <div className='bg-red-100 text-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Acceso Denegado
          </h2>
          <p className='text-gray-600 mb-4'>
            No tienes permisos suficientes para acceder a esta página.
          </p>
          <a
            href='/dashboard'
            className='inline-flex items-center text-primary hover:underline'>
            ← Volver al Dashboard
          </a>
        </div>
      </div>
    );
  }

  // Si todo está bien, renderizar el componente hijo
  return children;
};

export default PrivateRoute;
