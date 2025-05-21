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

  private static async fetch<
    TResponse,
    TPayload = undefined,
    TParams = undefined
  >(
    method: "get" | "post" | "put" | "delete",
    url: string,
    payload?: TPayload,
    params?: TParams
  ): Promise<TResponse> {
    try {
      const response =
        method === "get"
          ? await this.client.get<TResponse>(url, { params })
          : method === "post"
          ? await this.client.post<TResponse>(url, payload)
          : method === "put"
          ? await this.client.put<TResponse>(url, payload)
          : method === "delete"
          ? await this.client.delete<TResponse>(url, { data: payload, params })
          : (() => {
              throw new Error(`Unsupported method: ${method}`);
            })();
      return response.data;
    } catch (e) {
      throw e as AxiosError<ApiError, TPayload>;
    }
  }

  static register(payload: RegisterRequest): Promise<RegisterResponse> {
    return this.fetch<RegisterResponse, RegisterRequest>(
      "post",
      "/auth/register",
      payload
    );
  }

  static login(payload: LoginRequest): Promise<LoginResponse> {
    return this.fetch<LoginResponse, LoginRequest>(
      "post",
      "/auth/login",
      payload
    );
  }

  static forgotPassword(
    payload: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> {
    return this.fetch<ForgotPasswordResponse, ForgotPasswordRequest>(
      "post",
      "/auth/forgot",
      payload
    );
  }

  static resetPassword(
    payload: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> {
    return this.fetch<ResetPasswordResponse, ResetPasswordRequest>(
      "post",
      "/auth/reset",
      payload
    );
  }

  static currentUser(): Promise<CurrentUserResponse> {
    return this.fetch<CurrentUserResponse, undefined>("get", "/auth/current");
  }

  static logout(): Promise<LogoutResponse> {
    // return this.call<LogoutResponse>("post", "/auth/logout");
    return Promise.resolve(null);
  }
}
