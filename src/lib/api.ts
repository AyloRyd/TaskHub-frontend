// import { useAuthStore } from "@/store/auth";
import axios, { type AxiosInstance, AxiosError } from "axios";

export interface ApiError {
  error: string;
  description: string;
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};
export type RegisterResponse = unknown; // TODO: replace `unknown` with real type later

export type LoginRequest = {
  email: string;
  password: string;
};
export interface LoginResponse {
  pid: string;
  name: string;
  is_verified: boolean;
}

export type ForgotPasswordRequest = {
  email: string;
};
export type ForgotPasswordResponse = unknown; // TODO: replace `unknown` with real type later

export type ResetPasswordRequest = {
  token: string;
  password: string;
};
export type ResetPasswordResponse = unknown; // TODO: replace `unknown` with real type later

export interface User {
  pid: string;
  name: string;
  email: string;
  is_verified: boolean;
}
export type CurrentUserResponse = User;

export type LogoutResponse = unknown; // TODO: replace `unknown` with real type later

const _axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://taskhub.linerds.us/api",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

// _axios.interceptors.response.use(
//   (resp) => resp,
//   (err) => {
//     if (axios.isAxiosError(err) && err.response?.status === 401) {
//       useAuthStore.getState().logout();
//     }
//     return Promise.reject(err);
//   }
// );

export class api {
  private static client = _axios;

  static async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      const { data } = await this.client.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, RegisterRequest>;
    }
  }

  static async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await this.client.post<LoginResponse>(
        "/auth/login",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, LoginRequest>;
    }
  }

  static async forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    try {
      const { data } = await this.client.post<ForgotPasswordResponse>(
        "/auth/forgot",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, ForgotPasswordRequest>;
    }
  }

  static async resetPassword(
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    try {
      const { data } = await this.client.post<ResetPasswordResponse>(
        "/auth/reset",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, ResetPasswordRequest>;
    }
  }

  static async currentUser(): Promise<CurrentUserResponse> {
    try {
      const { data } = await this.client.get<CurrentUserResponse>(
        "/auth/current"
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, undefined>;
    }
  }

  static async logout(): Promise<LogoutResponse> {
    try {
      // const { data } = await this.client.post<LogoutResponse>(
      //   "/auth/logout"
      // );
      // return data;
      return null;
    } catch (e) {
      throw e as AxiosError<ApiError, undefined>;
    }
  }
}