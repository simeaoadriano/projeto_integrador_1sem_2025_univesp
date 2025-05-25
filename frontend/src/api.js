import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});

// Adiciona o token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default api;
