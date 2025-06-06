import { AxiosError } from "axios";
import _axios from "./axios";
import { type ApiError } from "@/lib/axios";
import {
  type CreateTaskRequest,
  type CreateTaskResponse,
  type DeleteTaskRequest,
  type DeleteTaskResponse,
  type GetUserTasksResponse,
  type SearchTasksRequest,
  type SearchTasksResponse,
  type UpdateTaskRequest,
  type UpdateTaskResponse,
  type GetTaskFullRequest,
  type GetTaskFullResponse,
  type AddAttachmentRequest,
  type AddAttachmentResponse,
} from "@/lib/types/tasks";

export class tasks {
  private static client = _axios;

  static async create(payload: CreateTaskRequest): Promise<CreateTaskResponse> {
    try {
      const { data } = await this.client.post<CreateTaskResponse>(
        "/tasks",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async getUserTasks(pid: string): Promise<GetUserTasksResponse> {
    try {
      const { data } = await this.client.get<GetUserTasksResponse>(
        `/user/tasks/${pid}`
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async getMyTasks(): Promise<GetUserTasksResponse> {
    try {
      const { data } = await this.client.get<GetUserTasksResponse>(
        `/user/tasks/me`
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async getTaskFull(payload: GetTaskFullRequest): Promise<GetTaskFullResponse> {
    try {
      const { data } = await this.client.post<GetTaskFullResponse>(
        "/tasks/full",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async update(payload: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    try {
      const { data } = await this.client.put<UpdateTaskResponse>(
        `/tasks/${payload.id}`,
        { name: payload.name, visibility: payload.visibility }
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async remove(payload: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    try {
      await this.client.delete(`/tasks/${payload.id}`);
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async search(payload: SearchTasksRequest): Promise<SearchTasksResponse> {
    try {
      const { data } = await this.client.post<SearchTasksResponse>(
        "/tasks/search",
        payload
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }

  static async addAttachment(payload: AddAttachmentRequest): Promise<AddAttachmentResponse> {
    try {
      const formData = new FormData();
      formData.append('attachment_type', payload.attachment_type);
      formData.append('data', payload.data);
      
      if (payload.file) {
        formData.append('file', payload.file);
      }

      const { data } = await this.client.post<AddAttachmentResponse>(
        `/tasks/attachments/${payload.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (e) {
      throw e as AxiosError<ApiError>;
    }
  }
}