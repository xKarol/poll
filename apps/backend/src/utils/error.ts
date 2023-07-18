import { ZodError } from "zod";

export const getErrorMessage = (error: unknown) => {
  if (error instanceof ZodError) return error.errors[0].message;
  if (error instanceof Error) return error.message;
  console.log("unknown error:", error);
  return "Unknown error";
};
