import httpError from "http-errors";
import { ZodError } from "zod";

export const captureError = (error: unknown) => {
  if (error instanceof ZodError)
    return httpError.Forbidden(error.issues[0].message);
  if (error instanceof httpError.HttpError) {
    return httpError(error);
  }

  console.log("Unknown error:", error);
  return httpError(500, "Internal Server Error");
};
