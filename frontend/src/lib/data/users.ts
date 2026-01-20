import axios from "axios";

export const BACKEND_URL = (typeof window !== "undefined")
  ? `${window.location.protocol}//${window.location.hostname}:8080`
  : "http://localhost:8080";

const API = axios.create({
  baseURL: BACKEND_URL,
});

// Interceptor: attach JWT to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("enjoy-transport-token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  return config;
});

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  roles: string[];
  createdAt: string | null;
  lastLogin: string | null;
  isApproved: boolean;
}

export interface UpdateRoleRequest {
  role: string;
}

// API functions
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await API.get("/api/auth/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUserRole = async (userId: number, role: string): Promise<User> => {
  try {
    const response = await API.put(`/api/auth/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};