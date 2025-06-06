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
  type Oauth2Response,
} from "@/lib/types/auth";
import { useAuthStore } from "../store/auth";

export const useAuth = () => {
  const { setAuthenticated, setUser, logout: storeLogout } = useAuthStore();
  const queryClient = useQueryClient();

  const register = useMutation<
    RegisterResponse,
    AxiosError<ApiError>,
    RegisterRequest
  >({
    mutationFn: (payload) => auth.register(payload),
  });

  const login = useMutation<LoginResponse, AxiosError<ApiError>, LoginRequest>({
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

  const forgotPassword = useMutation<
    ForgotPasswordResponse,
    AxiosError<ApiError>,
    ForgotPasswordRequest
  >({
    mutationFn: (payload) => auth.forgotPassword(payload),
  });

  const resetPassword = useMutation<
    ResetPasswordResponse,
    AxiosError<ApiError>,
    ResetPasswordRequest
  >({
    mutationFn: (payload) => auth.resetPassword(payload),
  });

  const deleteAccount = useMutation<
    DeleteUserResponse,
    AxiosError<ApiError>,
    DeleteUserRequest
  >({
    mutationFn: () => auth.delete(),
    onSuccess: () => {
      storeLogout();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });

  const currentUser = useQuery<CurrentUserResponse, AxiosError<ApiError>>({
    queryKey: ["currentUser"],
    queryFn: () => auth.current(),
  });

  const logout = useMutation<
    LogoutResponse,
    AxiosError<ApiError>,
    LogoutRequest
  >({
    mutationFn: async () => {
      await auth.logout();
      storeLogout();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentUser"] });
    },
  });

  const oauth2 = useMutation<Oauth2Response, AxiosError<ApiError>>({
    mutationFn: () => auth.oauth2(),
  });

  return {
    register,
    login,
    forgotPassword,
    resetPassword,
    deleteAccount,
    currentUser,
    logout,
    oauth2,
  };
};
