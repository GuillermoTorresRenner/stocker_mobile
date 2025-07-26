import { api } from "@/api/api";
import { login, register } from "@/api/auth";
import { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
const AuthContext = createContext<AuthProps>({});
1;
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useState(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };

    loadToken();
  }, []);

  const onRegister = async (email: string, password: string) => {
    register(email, password);
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response?.data?.token) {
        setAuthState({
          token: response.data.token,
          authenticated: true,
        });
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        // Guarda el token de autenticación de forma segura
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      }
    } catch (error) {}
  };

  const onLogout = async () => {
    SecureStore.deleteItemAsync(TOKEN_KEY);
    api.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    onRegister,
    onLogin,
    onLogout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
