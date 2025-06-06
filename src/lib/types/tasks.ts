export type Visibility = "Private" | "Public" | "Paid" | null;

export type AttachmentType = 
  | "Description" 
  | "DueDate" 
  | "File" 
  | "Url" 
  | "Text" 
  | "Tip" 
  | "Hint" 
  | "Warning" 
  | "Progress" 
  | "Importance";

export type Attachment = {
  attachment_type: AttachmentType;
  data: string;
  task_id: number;
};

export type User = {
  email: string;
  is_verified: boolean;
  name: string;
  pid: string;
  role: string;
};

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

export type TaskFull = {
  id: number;
  name: string;
  visibility: Exclude<Visibility, null>;
  owner: User;
  attachments: Attachment[];
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

export type SearchTasksRequest = {
  name: string;
};

export type SearchTasksResponse = Task[];

export type GetTaskFullRequest = {
  task_id: number;
};

export type GetTaskFullResponse = TaskFull;

export type AddAttachmentRequest = {
  id: number;
  attachment_type: AttachmentType;
  data: string;
  file?: File | null;
};

export type AddAttachmentResponse = Attachment;