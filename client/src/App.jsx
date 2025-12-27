/**
 * Componente Principal de la Aplicación
 * Punto de entrada y configuración de rutas
 */

import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "./hooks/useAuth";

function App() {
  const {loading, isAuthenticated} = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto' />
          <p className='mt-4 text-gray-600'>Cargando Che Tarea</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Routes>
        {/* Rutas temporales */}
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <div className='p-8'>
                <h1 className='text-3xl font-bold text-primary'>
                  ¡Bienvenido a Che Tarea! 🎉
                </h1>
                <p className='mt-4 text-gray-600'>
                  El sistema está funcionando correctamente.
                </p>
                <p className='mt-2 text-sm text-gray-500'>
                  En la próxima fase implementaremos el Dashboard completo.
                </p>
              </div>
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='/login'
          element={
            <div className='p-8'>
              <h1 className='text-2xl font-bold'>Login Page</h1>
              <p className='mt-2 text-gray-600'>
                Se implementará en la siguiente fase
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
