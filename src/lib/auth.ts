import { AxiosError } from "axios";
import _axios from "./axios";
import {
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
  type ForgotPasswordRequest,
  type ForgotPasswordResponse,
  type ResetPasswordRequest,
  type ResetPasswordResponse,
  type DeleteUserResponse,
  type CurrentUserResponse,
  type LogoutResponse,
  type Oauth2Response,
} from "@/lib/types/auth";
import { type ApiError } from "@/lib/axios";

export class auth {
  private static client = _axios;

  static async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      const { data } = await this.client.post<RegisterResponse>(
        "/auth/register",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
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
      throw e as AxiosError<ApiError>;
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
      throw e as AxiosError<ApiError>;
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
      throw e as AxiosError<ApiError>;
    }
  }

  static async delete(): Promise<DeleteUserResponse> {
    try {
      const { data } = await this.client.delete<DeleteUserResponse>(
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
      throw e as AxiosError<ApiError>;
    }
  }

  static async logout(): Promise<LogoutResponse> {
    try {
      const { data } = await this.client.post<LogoutResponse>("/auth/logout");
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async oauth2(): Promise<Oauth2Response> {
    try {
      const { data } = await this.client.get<string>("/oauth2/google");
      return { url: data };
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }
}
