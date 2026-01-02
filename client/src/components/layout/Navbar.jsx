/**
 * Navbar Component
 * Barra superior con búsqueda y menú de usuario
 */

import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Bell, LogOut, Menu, Search, Settings, User} from "lucide-react";
import {useAuth} from "../../hooks/useAuth";
import {Avatar} from "../ui";

const Navbar = ({onMenuClick}) => {
  const navigate = useNavigate();
  const {user, logout} = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdow al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='bg-white border-b border-gray-200 px-4 py-3 lg:px-6'>
      <div className='flex items-center justify-between'>
        {/* Lado izquierdo: Menú hamburguesa + Búsqueda */}
        <div className='flex items-center space-x-4 flex-1'>
          {/* Botón menú (solo mobile) */}
          <button
            onClick={onMenuClick}
            className='lg:hidden text-gray-500 hover:text-gray-700'>
            <Menu className='w-6 h-6' />
          </button>

          {/* Barra de búsqueda */}
          <div className='hidden md:flex items-center flex-1 max-w-md'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder='Buscar tareas...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              />
            </div>
          </div>
        </div>

        {/* Lado derecho: Notificaciones + Usuario */}
        <div className='flex items-center space-x-4'>
          {/* Botón de notificaciones */}
          <button className='relative text-gray-500 hover:text-gray-700'>
            <Bell className='w-6 h-6' />
            {/* Badge de botificaciones */}
            <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
              3
            </span>
          </button>

          {/* Menú de usuario */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center space-x-3 focus:outline-none'>
              <Avatar name={user?.nombre} size='md' src={user?.avatar} />
              <div className='hidden md:block text-left'>
                <p className='text-sm font-medium text-gray-900'>
                  {user?.nombre}
                </p>
                <p className='text-xs text-gray-500'>{user?.rol}</p>
              </div>
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fade-in'>
                {/* Info del usuario */}
                <div className='px-4 py-3 border-b border-gray-100'>
                  <p className='text-sm font-medium text-gray-900'>
                    {user?.nombre}
                  </p>
                  <p className='text-xs text-gray-500 truncate'>
                    {user?.email}
                  </p>
                </div>

                {/* Opciones */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className='w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'>
                  <User className='w-4 h-4' />
                  <span>Mi Perfil</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsDropdownOpen(false);
                  }}
                  className='w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'>
                  <Settings className='w-4 h-4' />
                  <span>Configuración</span>
                </button>

                <hr className='my-1 border-gray-100' />

                <button
                  onClick={handleLogout}
                  className='w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50'>
                  <LogOut className='w-4 h-4' />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Barra de búsqueda mobile */}
      <div className='md:hidden mt-3'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
          <input
            type='text'
            placeholder='Buscar tareas...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
