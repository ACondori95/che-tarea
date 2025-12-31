/**
 * AuthContext
 * Gestión global del estado de autenticación
 */

import {createContext, useEffect, useState} from "react";
import {
  getCurrentUser,
  login as loginApi,
  logout as logoutApi,
} from "../api/authApi";
import {toast} from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay un usuario en localStorage al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = getCurrentUser();
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /**
   * Iniciar sesión
   */
  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);

      if (response.success) {
        setUser(response.usuario);
        setIsAuthenticated(true);
        toast.success("¡Bienvenido a Che Tarea!");
        return {success: true};
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      toast.error(message);
      return {success: false, message};
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    logoutApi();
    setUser(null);
    setIsAuthenticated(false);
    toast.info("Sesión cerrada correctamente");
  };

  /**
   * Actualizar usuario en el estado
   */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  /**
   * Verificar si el usuario es Admin
   */
  const isAdmin = () => {
    return user?.rol === "Admin";
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
