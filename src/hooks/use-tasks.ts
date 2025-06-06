import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { tasks } from "@/lib/tasks";
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
  type GetTaskFullResponse,
  type AddAttachmentRequest,
  type AddAttachmentResponse,
} from "@/lib/types/tasks";
import { type ApiError } from "@/lib/axios";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const createTask = useMutation<
    CreateTaskResponse,
    AxiosError<ApiError>,
    CreateTaskRequest
  >({
    mutationFn: (payload) => tasks.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });

  const update = useMutation<
    UpdateTaskResponse,
    AxiosError<ApiError>,
    UpdateTaskRequest
  >({
    mutationFn: (payload) => tasks.update(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
      queryClient.invalidateQueries({ queryKey: ["taskFull", data.id] });
    },
  });

  const getUserTasks = (pid: string) =>
    useQuery<GetUserTasksResponse, AxiosError<ApiError>>({
      queryKey: ["userTasks", pid],
      queryFn: () => tasks.getUserTasks(pid),
    });

  const getMyTasks = useQuery<GetUserTasksResponse, AxiosError<ApiError>>({
    queryKey: ["myTasks"],
    queryFn: () => tasks.getMyTasks(),
  });

  const getTaskFull = (taskId: number) =>
    useQuery<GetTaskFullResponse, AxiosError<ApiError>>({
      queryKey: ["taskFull", taskId],
      queryFn: () => tasks.getTaskFull({ task_id: taskId }),
      enabled: !!taskId,
    });

  const remove = useMutation<
    DeleteTaskResponse,
    AxiosError<ApiError>,
    DeleteTaskRequest
  >({
    mutationFn: (payload) => tasks.remove(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
    },
  });

  const search = useMutation<
    SearchTasksResponse,
    AxiosError<ApiError>,
    SearchTasksRequest
  >({
    mutationFn: (payload) => tasks.search(payload),
  });

  const addAttachment = useMutation<
    AddAttachmentResponse,
    AxiosError<ApiError>,
    AddAttachmentRequest
  >({
    mutationFn: (payload) => tasks.addAttachment(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["taskFull", data.task_id] });
    },
  });

  return {
    createTask,
    update,
    remove,
    search,
    getUserTasks,
    getMyTasks,
    getTaskFull,
    addAttachment,
  };
};