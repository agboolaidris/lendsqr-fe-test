export type SortOrder = "asc" | "desc";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type ApiResponse<T> = {
  data: T;
  meta: PaginationMeta;
};
