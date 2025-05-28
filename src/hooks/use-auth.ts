import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api, type ApiError } from "@/lib/api";
import {
  type User,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type DeleteUserRequest,
  type DeleteUserResponse,
  type CurrentUserResponse,
  type LogoutRequest,
  type LogoutResponse,
} from "@/lib/types";
import { useAuthStore } from "../store/auth";

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<ApiError>,
    RegisterRequest
  >({
    mutationFn: (userData) => api.register(userData),
  });
};

export const useLogin = () => {
  const { setAuthenticated, setUser } = useAuthStore();

  return useMutation<
    LoginResponse,
    AxiosError<ApiError>,
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
        role: data.role,
      } as User);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<
    ForgotPasswordResponse,
    AxiosError<ApiError>,
    ForgotPasswordRequest
  >({
    mutationFn: (payload) => api.forgotPassword(payload),
  });
};

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    AxiosError<ApiError>,
    ResetPasswordRequest
  >({
    mutationFn: (payload) => api.resetPassword(payload),
  });
};

export const useDelete = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<
    DeleteUserResponse,
    AxiosError<ApiError>,
    DeleteUserRequest
  >({
    mutationFn: () => api.delete(),
    onSuccess: () => {
      logout();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useCurrent = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery<
    CurrentUserResponse,
    AxiosError<ApiError>
  >({
    queryKey: ["currentUser"],
    queryFn: () => api.current(),
    enabled: isAuthenticated !== false,
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<
    LogoutResponse,
    AxiosError<ApiError>,
    LogoutRequest
  >({
    mutationFn: async () => {
      await api.logout();
      logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
