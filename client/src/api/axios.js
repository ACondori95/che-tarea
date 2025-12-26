/**
 * Configuración de Axios
 * Instancia personalizada para comunicación con el backend
 */

import axios from "axios";

// URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": "application/json"},
  timeout: 1000, // 10 segundos
});

// Interceptor de Request: Agregar token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response: Manejo de errores globales
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el token expiró o es inválido
    if (error.response?.status === 401) {
      // Limpiar token y redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
