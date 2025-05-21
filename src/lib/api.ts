import { AxiosError } from "axios";
import { _axios, _axios_cred } from "./axios";

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
  private static client_cred = _axios_cred;

  private static async fetch<
    TResponse,
    TPayload = undefined,
    TParams = undefined
  >(
    method: "get" | "post" | "put" | "delete",
    url: string,
    payload?: TPayload,
    params?: TParams,
    credentials: boolean = false
  ): Promise<TResponse> {
    try {
      const client = credentials === true ? this.client_cred : this.client
      const response =
        method === "get"
          ? await client.get<TResponse>(url, { params })
          : method === "post"
          ? await client.post<TResponse>(url, payload)
          : method === "put"
          ? await client.put<TResponse>(url, payload)
          : method === "delete"
          ? await client.delete<TResponse>(url, { data: payload, params })
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
