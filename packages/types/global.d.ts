export type PaginationResult<T = unknown> = {
  data: T;
  nextPage: number | undefined;
};

export type OrderBy = "asc" | "desc";

export type SortingParams<T = unknown> = {
  orderBy?: OrderBy;
  sortBy?: T;
};
