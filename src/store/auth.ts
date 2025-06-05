import { create } from "zustand";
import { type User } from "@/lib/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const getStoredUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("auth") === "true",
  user: getStoredUser(),

  setAuthenticated: (value) => {
    if (value) {
      localStorage.setItem("auth", "true");
    } else {
      localStorage.removeItem("auth");
    }
    set({ isAuthenticated: value });
  },

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));