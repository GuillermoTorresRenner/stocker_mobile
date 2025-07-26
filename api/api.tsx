import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // http en lugar de https
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // Añadir timeout
});
