import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { tasks } from "@/lib/tasks";
import {
  type CreateTaskRequest,
  type CreateTaskResponse,
  type GetUserTasksResponse,
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

  const getUserTasks = (pid: string) =>
    useQuery<GetUserTasksResponse, AxiosError<ApiError>>({
      queryKey: ["userTasks", pid],
      queryFn: () => tasks.getUserTasks(pid),
    });

  const getMyTasks = useQuery<GetUserTasksResponse, AxiosError<ApiError>>({
    queryKey: ["myTasks"],
    queryFn: () => tasks.getMyTasks(),
  });

  return {
    createTask,
    getUserTasks,
    getMyTasks,
  };
};
