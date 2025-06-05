export type Visibility = "Private" | "Public" | "Paid" | null;

export type Task = {
  id: number;
  name: string;
  visibility: Exclude<Visibility, null>;
};

export type TaskTemplate = {
  id: number;
  name: string;
  visibility: Visibility;
};

export type CreateTaskRequest = {
  name: string;
  visibility: Visibility;
};

export type CreateTaskResponse = Task;

export type GetUserTasksResponse = Task[];

export type GetMyTasksResponse = Task[];

export type UpdateTaskRequest = TaskTemplate;

export type UpdateTaskResponse = TaskTemplate;

export type DeleteTaskRequest = {
  id: number;
};

export type DeleteTaskResponse = void;