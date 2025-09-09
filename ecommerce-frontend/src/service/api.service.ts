import axios from "axios";

// USE ENV.VITE.API.URL
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// TOKEN ON EVERY REQUEST
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ITEMS
export const fetchItems = (filters?: any) => API.get("/items", { params: filters });
export const addToCart = (itemId: string) => API.post("/cart/add", { itemId });
export const getCart = () => API.get("/cart");
export const removeFromCart = (itemId: string) => API.post("/cart/remove", { itemId });

// AUTH FOR LOGIN/SIGNUP
export const signup = ({ name, email, password }: { name: string; email: string; password: string }) =>
  API.post("/api/auth/signup", { name, email, password });

export const login = (email: string, password: string) =>
  API.post("/api/auth/login", { email, password });
