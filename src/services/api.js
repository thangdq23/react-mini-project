import axios from "axios";

const API_BASE = "https://api-class-o1lo.onrender.com/api/thangdq23";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

export const authAPI = {
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data?.data || res.data;
  },
  register: async (email, password) => {
    const res = await api.post("/auth/register", { email, password });
    return res.data?.data || res.data;
  },
};

export const tasksAPI = {
  loadTasks: async (filters = {}) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const params = {
      userId: user?.user?._id || user?.id || user?.email,
      ...filters,
    };
    const res = await api.get("/tasks", { params });
    return res.data?.data || [];
  },
  createTask: async (payload) => {
    const res = await api.post("/tasks", payload);
    return res.data?.data || null;
  },
  updateTask: async (id, updates) => {
    const res = await api.patch(`/tasks/${id}`, updates);
    return res.data?.data || null;
  },
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    return true;
  },
};

export default api;
