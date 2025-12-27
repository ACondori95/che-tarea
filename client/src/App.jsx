import {Route, Navigate, Routes} from "react-router-dom";
import {useAuth} from "./hooks/useAuth";
import ComponentTest from "./pages/ComponentTest";

function App() {
  const {loading, isAuthenticated} = useAuth();

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
        {/* Ruta temporal de prueba de componentes */}
        <Route path='/test' element={<ComponentTest />} />
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
                  Visita
                  <a href='/test' className='text-primary hover:underline'>
                    /test
                  </a>
                  para ver los componentes UI.
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
