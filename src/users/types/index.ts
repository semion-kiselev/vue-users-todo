import { Permission } from "@/auth/types";

export type User = {
  id: number;
  name: string;
  email: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
};

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
  permissions: string[];
};

export type UpdateUserData = Partial<CreateUserData>;

export type UpdateUserApiParams = {
  id: number;
  data: UpdateUserData;
};

export type DeleteUserApiParams = {
  id: number;
};

export type GetUserApiParams = {
  id: number;
};
