import {Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./context/AuthContext";
import {TaskProvider} from "./context/TaskContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Rutas protegidas con layout */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <TaskProvider>
                <MainLayout />
              </TaskProvider>
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='profile' element={<Profile />} />
          <Route
            path='archive'
            element={
              <div className='bg-white rounded-lg shadow p-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Archivo</h1>
                <p className='bg-gray-600'>Tareas archivadas</p>
              </div>
            }
          />
          <Route
            path='settings'
            element={
              <div className='bg-white rounded-lg shadow p-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>Configuración</h1>
                <p className='bg-gray-600'>Ajustes del sistema</p>
              </div>
            }
          />
          <Route
            path='team'
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Redirect para rutas no encontradas */}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>

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
    </AuthProvider>
  );
}

export default App;
