import { AxiosError } from "axios";
import _axios from "./axios";

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

  static async delete(): Promise<unknown> {
    try {
      const { data } = await this.client.post<unknown>(
        "/auth/delete"
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async current(): Promise<CurrentUserResponse> {
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
      const { data } = await this.client.post<LogoutResponse>("/auth/logout");
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError, undefined>;
    }
  }
}
