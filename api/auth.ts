import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    username?: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<{ data: AuthResponse }> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response;
};

export const register = async (
  email: string,
  password: string,
  name?: string
): Promise<{ data: AuthResponse }> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
    name,
  });
  return response;
};
