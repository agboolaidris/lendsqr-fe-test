import { ApiResponse } from "src/@types";
import { User, UsersQueryParams } from "src/@types/user";
import { api } from "src/lib/api";

export const fetchUsers = async (
  params: UsersQueryParams,
): Promise<ApiResponse<User[]>> => {
  const { data } = await api.get("/users", { params });
  return data;
};

export const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
  return data.data;
};
