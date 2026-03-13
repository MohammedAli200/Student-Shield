import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

// attach auth token if user logged in
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export const getSocketUrl = () =>
  import.meta.env.VITE_API_URL || "http://localhost:5005";