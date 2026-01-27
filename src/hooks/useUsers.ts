import { api } from "src/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "src/@types";
import { User, UsersQueryParams } from "src/@types/user";

export const fetchUsers = async (
  params: UsersQueryParams,
): Promise<ApiResponse<User>> => {
  const { data } = await api.get("/users", { params });
  return data;
};

export const fetchUser = async (id: string): Promise<User> => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

export function useUsers(params: UsersQueryParams) {
  return useQuery({
    queryKey: ["users", { ...params }],
    queryFn: () => fetchUsers(params),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
}
