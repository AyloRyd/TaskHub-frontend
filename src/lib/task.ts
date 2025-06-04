import { AxiosError } from "axios";
import _axios from "./axios";
import { type ApiError } from "@/lib/axios";

export class task {
  private static client = _axios;

  static async register(payload: any): Promise<any> {
    try {
      const { data } = await this.client.post<any>(
        "/auth/register",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }
}