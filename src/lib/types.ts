// General types

export interface User {
  pid: string;
  name: string;
  email: string;
  is_verified: boolean;
  role: "User" | "Admin";
}


// Authentication types

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};
export type RegisterResponse = void; 

export type LoginRequest = {
  email: string;
  password: string;
};
export type LoginResponse = Omit<User, "email">;

export type ForgotPasswordRequest = {
  email: string;
};
export type ForgotPasswordResponse = void; 

export type ResetPasswordRequest = {
  token: string;
  password: string;
};
export type ResetPasswordResponse = void; 

export type CurrentUserResponse = Omit<User, "is_verified">;
export type CurrentUserRequest = void;

export type DeleteUserRequest = void;
export type DeleteUserResponse = void;

export type LogoutRequest = void;
export type LogoutResponse = void;
