import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-gray-50'>
        {/* Página temporal de bienvenida */}
        <div className='flex items-center justify-center min-h-screen'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary mb-4'>
              🚀🚀 Che Tarea
            </h1>
            <p className='text-gray-600 text-lg'>
              Gestor de tareas para PyMEs Argentinas
            </p>
            <div className='mt-8 space-y-2'>
              <div className='inline-block px-4 py-2 bg-urgent text-white rounded-lg mr-2'>
                Alta Prioridad
              </div>
              <div className='inline-block px-4 py-2 bg-medium text-white rounded-lg mr-2'>
                Media Prioridad
              </div>
              <div className='inline-block px-4 py-2 bg-low text-white rounded-lg mr-2'>
                Baja Prioridad
              </div>
            </div>
            <p className='mt-8 text-sm text-gray-500'>
              ✅ Frontend configurado correctamente
            </p>
          </div>
        </div>

        {/* Sistema de notificaciones toast */}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
