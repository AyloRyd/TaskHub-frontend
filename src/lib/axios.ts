import { useAuthStore } from "@/store/auth";
import axios, { type AxiosInstance } from "axios";

const _axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

_axios.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(err);
  }
);

export interface ApiError {
  error: string;
  description: string;
}

export default _axios;