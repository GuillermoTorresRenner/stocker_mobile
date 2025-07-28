import axios from "axios";
import { Platform } from "react-native";

// Configurar base URL según el entorno
const getBaseURL = () => {
  if (__DEV__) {
    // Desarrollo
    if (Platform.OS === "android") {
      return "http://192.168.0.10:3000/api"; // Emulador Android usa esta IP especial
    } else if (Platform.OS === "web") {
      return "http://localhost:3000/api"; // Web
    } else {
      return "http://localhost:3000/api"; // iOS Simulator
    }
  } else {
    // Producción - reemplaza con tu URL de producción
    return "https://tu-api-production.com/api";
  }
};

export const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(
      `❌ ${
        error.response?.status || "Network"
      } ${error.config?.method?.toUpperCase()} ${error.config?.url}`
    );
    return Promise.reject(error);
  }
);
