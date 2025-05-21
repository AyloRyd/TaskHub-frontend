import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  api,
  type ApiError,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type CurrentUserResponse,
  type LogoutResponse,
} from "@/lib/api";
import { useAuthStore, type User } from "../store/auth";

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<ApiError, RegisterRequest>,
    RegisterRequest
  >({
    mutationFn: (userData) => api.register(userData),
  });
};

export const useLogin = () => {
  const { setAuthenticated, setUser } = useAuthStore();

  return useMutation<
    LoginResponse,
    AxiosError<ApiError, LoginRequest>,
    LoginRequest
  >({
    mutationFn: (credentials) => api.login(credentials),
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
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ApiError, ForgotPasswordRequest>,
    ForgotPasswordRequest
  >({
    mutationFn: (payload) => api.forgotPassword(payload),
  });
};

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    AxiosError<ApiError, ResetPasswordResponse>,
    ResetPasswordRequest
  >({
    mutationFn: (payload) => api.resetPassword(payload),
  });
};

export const useCurrentUser = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery<CurrentUserResponse, AxiosError<ApiError, undefined>>({
    queryKey: ["currentUser"],
    queryFn: () => api.currentUser(),
    enabled: isAuthenticated !== false,
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, AxiosError<ApiError, undefined>>({
    mutationFn: async () => {
      await api.logout();
      logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
