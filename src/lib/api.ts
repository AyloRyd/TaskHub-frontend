import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://taskhub.linerds.us/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, 
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 401 || 
        (error.response.data && 
         error.response.data.error === "unauthorized")
      ) {
        // useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;