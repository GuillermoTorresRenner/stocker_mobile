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

export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response;
};

export const googlelogin = async () => {
  const response = await api.get("/auth/google");
  return response;
};

export const register = async (
  email: string,
  password: string,
  name?: string
) => {
  const response = await api.post("/auth/register", { email, password, name });
  return response;
};
