import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { auth } from "@/lib/auth";
import { type ApiError } from "@/lib/axios";
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
    mutationFn: (userData) => auth.register(userData),
  });
};

export const useLogin = () => {
  const { setAuthenticated, setUser } = useAuthStore();

  return useMutation<
    LoginResponse,
    AxiosError<ApiError>,
    LoginRequest
  >({
    mutationFn: (credentials) => auth.login(credentials),
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
    mutationFn: (payload) => auth.forgotPassword(payload),
  });
};

export const useResetPassword = () => {
  return useMutation<
    ResetPasswordResponse,
    AxiosError<ApiError>,
    ResetPasswordRequest
  >({
    mutationFn: (payload) => auth.resetPassword(payload),
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
    mutationFn: () => auth.delete(),
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
    queryFn: () => auth.current(),
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
      await auth.logout();
      logout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });
};
