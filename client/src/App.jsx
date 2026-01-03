/**
 * Componente Principal de la Aplicación
 * Configuración de rutas y navegación
 */

import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";

// Páginas públicas
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Páginas protegidas
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import Archive from "./pages/Archive";
import Profile from "./pages/Profile";

// Páginas de pueba (temporales)
import ComponentTest from "./pages/ComponentTest";

function App() {
  const {loading, isAuthenticated} = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto' />
          <p className='mt-4 text-gray-600'>Cargando Che Tarea...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route
        path='/login'
        element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />}
      />
      <Route
        path='/register'
        element={isAuthenticated ? <Navigate to='/dashboard' /> : <Register />}
      />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      {/* Ruta de prueba de componentes */}
      <Route path='/test' element={<ComponentTest />} />

      {/* Rutas Protegidas */}
      <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path='/team'
        element={
          <PrivateRoute>
            <Team />
          </PrivateRoute>
        }
      />
      <Route
        path='/archive'
        element={
          <PrivateRoute>
            <Archive />
          </PrivateRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path='/settings'
        element={
          <PrivateRoute adminOnly>
            <div className='p-8'>
              <h1 className='text-2xl font-bold'>Configuración</h1>
              <p className='mt-2 text-gray-600'>Se implementará próximamente</p>
            </div>
          </PrivateRoute>
        }
      />
      <Route
        path='/tags'
        element={
          <PrivateRoute adminOnly>
            <div className='p-8'>
              <h1 className='text-2xl font-bold'>Gestión de Etiquetas</h1>
              <p className='mt-2 text-gray-600'>Se implementará próximamente</p>
            </div>
          </PrivateRoute>
        }
      />

      {/* Ruta raíz: redirigir según autenticación */}
      <Route
        path='/'
        element={
          isAuthenticated ? (
            <Navigate to='/dashboard' replace />
          ) : (
            <Navigate to='/login' replace />
          )
        }
      />

      {/* Ruta 404 */}
      <Route
        path='*'
        element={
          <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='text-center'>
              <h1 className='text-6xl font-bold text-gray-300 mb-4'>404</h1>
              <p className='text-xl text-gray-600 mb-8'>Página no encontrada</p>
              <a href='/' className='text-primary hover:underline font-medium'>
                Volver al inicio
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
