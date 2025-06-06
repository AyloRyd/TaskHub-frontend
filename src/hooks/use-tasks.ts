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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
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

  return {
    createTask,
    update,
    remove,
    search,
    getUserTasks,
    getMyTasks,
  };
};
