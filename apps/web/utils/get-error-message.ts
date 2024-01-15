import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError)
    return error.response?.data?.message || "Internal Server Error";
  console.log("unknown error:", error);
  return "Internal Server Error";
};
