import { useQuery } from "@tanstack/react-query";
import { UsersQueryParams } from "src/@types/user";
import { fetchUser, fetchUsers } from "src/services/user";

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
