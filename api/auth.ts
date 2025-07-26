import { api } from "./api";

export const register = async (email: string, password: string) => {
  try {
    return await api.post("/auth/register", { email, password });
  } catch (error) {
    console.error("Registration error:", error);
  }
};
export const login = async (email: string, password: string) => {
  try {
    return await api.post("/auth/login", { email, password });
  } catch (error) {
    console.error("Registration error:", error);
  }
};

export const logout = async () => {
  // Implement logout logic here
  // Clear the token and authenticated state
};
1;
