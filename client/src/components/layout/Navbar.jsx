import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Bell, ChevronDown, LogOut, User} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-30'>
      <div className='flex items-center justify-between px-6 py-4'>
        {/* Título o breadcrumb */}
        <div>
          <h2 className='text-xl font-semibold text-gray-800'>
            Bienvenido, {user?.name?.split(" ")[0]}
          </h2>
          <p className='text-sm text-gray-500'>
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Acciones del navbar */}
        <div className='flex items-center gap-4'>
          {/* Notifications */}
          <button className='relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition'>
            <Bell size={20} />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
          </button>

          {/* Dropdown de usuario */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-lg transition'>
              <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm'>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className='hidden md:block text-left'>
                <p className='text-sm font-medium text-gray-700'>
                  {user?.name}
                </p>
                <p className='text-xs text-gray-500'>
                  {user?.role === "admin" ? "Administrador" : "Usuario"}
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2'>
                <div className='px-4 py-3 border-b border-gray-100'>
                  <p className='text-sm font-medium text-gray-900'>
                    {user?.name}
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>{user?.email}</p>
                </div>

                <button
                  onClick={handleProfileClick}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition'>
                  <User size={16} />
                  Mi Perfil
                </button>

                <div className='border-t border-gray-100 my-2' />

                <button
                  onClick={handleLogout}
                  className='w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition'>
                  <LogOut size={16} />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
