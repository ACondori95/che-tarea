/**
 * DashboardLayout Component
 * Layout principal con Sidebar y Navbar
 */

import {useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='flex h-screen overflow-hidden bg-gray-50'>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Contenido principal */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Área de contenido */}
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
