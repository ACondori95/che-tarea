import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios";
import {toast} from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Sesión cerrada");
    navigate("/login");
  }, [navigate]);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
          // Verificar que el token siga siendo válido
          const {data} = await axios.get("/auth/me");
          setUser(data.data);
          localStorage.setItem("user", JSON.stringify(data.data));
        } catch (error) {
          console.error("Error al cargar usuario:", error);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [logout]);

  // Registro
  const register = async (userData) => {
    try {
      const {data} = await axios.post("/auth/register", userData);

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);

      toast.success("¡Cuenta creada exitosamente!");
      navigate("/dashboard");

      return {success: true};
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al crear la cuenta";
      toast.error(message);
      return {success: false, message};
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const {data} = await axios.post("/auth/login", credentials);

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);

      toast.success(`¡Bienvenido, ${data.data.name}!`);
      navigate("/dashboard");

      return {success: true};
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      toast.error(message);
      return {success: false, message};
    }
  };

  // Actualizar perfil
  const updateProfile = async (profileData) => {
    try {
      const {data} = await axios.put("/auth/profile", profileData);

      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));

      toast.success("Perfil actualizado exitosamente");
      return {success: true};
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al actualizar perfil";
      toast.error(message);
      return {success: false, message};
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
