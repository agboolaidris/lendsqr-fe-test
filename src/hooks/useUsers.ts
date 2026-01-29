import { useQuery } from "@tanstack/react-query";
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
  console.log(id);
  const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
  return data.data;
};

export function useUsers(params: UsersQueryParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}
