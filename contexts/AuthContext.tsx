import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/api";
import { login as apiLogin } from "../api/auth";
import { storage } from "../utils/storage";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar datos de autenticación al iniciar
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [token, userData] = await Promise.all([
          storage.getItem(TOKEN_KEY),
          storage.getItem(USER_KEY),
        ]);

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          // Configurar el header de autorización
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error loading auth data:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadAuthData();
  }, []);

  const onLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Llamar a la API real
      const response = await apiLogin(email, password);

      // Verificar que la respuesta contenga los datos necesarios
      if (!response.data || !response.data.token) {
        throw new Error("Respuesta de login inválida");
      }

      const { token, user: userData } = response.data;

      // Crear objeto de usuario
      const user: User = {
        id: userData.id || Date.now().toString(),
        email: userData.email || email,
        name: userData.name || userData.username || email.split("@")[0],
      };

      // Configurar header de autorización
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Guardar en storage
      await Promise.all([
        storage.setItem(TOKEN_KEY, token),
        storage.setItem(USER_KEY, JSON.stringify(user)),
      ]);

      setUser(user);
    } catch (error: any) {
      console.error("Error en login:", error);

      // Determinar el mensaje de error apropiado
      let errorMessage = "Error de conexión";

      if (error.response) {
        // Error de la API
        const status = error.response.status;
        if (status === 401) {
          errorMessage = "Credenciales incorrectas";
        } else if (status === 400) {
          errorMessage = "Datos inválidos";
        } else if (status >= 500) {
          errorMessage = "Error del servidor";
        } else {
          errorMessage = error.response.data?.message || "Error desconocido";
        }
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message.includes("Network Error")
      ) {
        errorMessage =
          "No se puede conectar al servidor. Verifica tu conexión.";
      }

      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Limpiar header de autorización
      api.defaults.headers.common["Authorization"] = "";

      // Limpiar storage
      await Promise.all([
        storage.removeItem(TOKEN_KEY),
        storage.removeItem(USER_KEY),
      ]);

      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isInitialized,
    onLogin,
    onLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
