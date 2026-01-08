import {Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Rutas protegidas (próximamente) */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <div className='min-h-screen flex items-center justify-center bg-gray-50'>
                <h1 className='text-3xl font-bold text-primary'>
                  Dashboard - Próximamente
                </h1>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Redirect por defecto */}
        <Route path='/' element={<Navigate to='/login' replace />} />
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
