export type PaginationResponse<T = unknown> = {
  data: T;
  nextPage: number | undefined;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type OrderBy = "asc" | "desc";

export type SortingParams<T = unknown> = {
  orderBy?: OrderBy;
  sortBy?: T;
};
