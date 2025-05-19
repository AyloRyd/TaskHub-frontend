import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import { useAuthStore, type User } from "../store/auth";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type ForgotPasswordPayload = {
  email: string;
};

type ResetPasswordPayload = {
  token: string;
  password: string;
};

type LoginResponse = {
  pid: string;
  name: string;
  is_verified: boolean;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: RegisterPayload) =>
      api.post("/auth/register", userData),
  });
};

export const useLogin = () => {
  const { setAuthenticated, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      const { data } = await api.post<LoginResponse>("/auth/login", credentials);
      return data;
    },
    onSuccess: (data, variables) => {
      setAuthenticated(true);
      setUser({
        pid: data.pid,
        name: data.name,
        email: variables.email,
        is_verified: data.is_verified,
      } as User);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) =>
      api.post("/auth/forgot", payload),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) =>
      api.post("/auth/reset", payload),
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/current");
      return data;
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
