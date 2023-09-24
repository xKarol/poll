import { AxiosError } from "axios";
import { ZodError } from "zod";

// TODO make global utils and reuse between backend and frontend
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ZodError) return error.issues[0].message;
  if (error instanceof AxiosError)
    return error.response?.data?.message || "Unknown error";
  if (error instanceof Error) return error.message;
  console.log("unknown error:", error);
  return "Unknown error";
};
