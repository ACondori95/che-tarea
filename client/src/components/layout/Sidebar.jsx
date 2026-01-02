/**
 * Sidebar Component
 * Barra de navegación lateral
 */

import {NavLink} from "react-router-dom";
import {
  Archive,
  LayoutDashboard,
  Package,
  Settings,
  Tag,
  Users,
  X,
} from "lucide-react";
import {useAuth} from "../../hooks/useAuth";

const Sidebar = ({isOpen, onClose}) => {
  const {user, isAdmin} = useAuth();

  // Elementos de navegación
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      adminOnly: false,
    },
    {
      name: "Equipo",
      path: "/team",
      icon: Users,
      adminOnly: false,
    },
    {
      name: "Etiquetas",
      path: "/tags",
      icon: Tag,
      adminOnly: true,
    },
    {
      name: "Archivo",
      path: "/archive",
      icon: Archive,
      adminOnly: false,
    },
    {
      name: "Configuración",
      path: "/settings",
      icon: Settings,
      adminOnly: true,
    },
  ];

  // Filtrar items según rol
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin()
  );

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-800'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center'>
              <Package className='w-6 h-6 text-white' />
            </div>
            <div>
              <h1 className='text-lg font-bold'>Che Tarea</h1>
              <p className='text-xs text-gray-400'>Task Manager</p>
            </div>
          </div>

          {/* Botón cerrar (solo mobile) */}
          <button
            onClick={onClose}
            className='lg:hidden text-gray-400 hover:text-white'>
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Navegación */}
        <nav className='flex-1 px-4 py-6 space-y-1'>
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({isActive}) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }>
                <Icon className='w-5 h-5' />
                <span className='font-medium'>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer con info del usuario */}
        <div className='p-4 border-t border-gray-800'>
          <div className='flex items-center space-x-3 px-2'>
            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-sm font-bold'>
              {user?.nombre?.substring(0, 2).toUpperCase() || "US"}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-white truncate'>
                {user?.nombre || "Usuario"}
              </p>
              <p className='text-xs text-gray-400 truncate'>
                {user?.email || "email@ejemplo.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
