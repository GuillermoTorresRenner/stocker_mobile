import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

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

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar datos de autenticación al iniciar
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const [token, userData] = await Promise.all([
          storage.getItem(TOKEN_KEY),
          storage.getItem(USER_KEY)
        ]);

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadAuthData();
  }, []);

  const onLogin = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular autenticación exitosa
      const mockUser: User = {
        id: Date.now().toString(),
        email: email,
        name: email.split('@')[0]
      };
      
      const mockToken = `token_${Date.now()}`;
      
      // Guardar en storage
      await Promise.all([
        storage.setItem(TOKEN_KEY, mockToken),
        storage.setItem(USER_KEY, JSON.stringify(mockUser))
      ]);
      
      setUser(mockUser);
      console.log('Login exitoso:', mockUser);
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Credenciales incorrectas');
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Limpiar storage
      await Promise.all([
        storage.removeItem(TOKEN_KEY),
        storage.removeItem(USER_KEY)
      ]);
      
      setUser(null);
      console.log('Logout exitoso');
    } catch (error) {
      console.error('Error during logout:', error);
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
