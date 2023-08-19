import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePoll } from "../hooks/use-create-poll";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../utils/error";
import type { Poll } from "types";
import { useRouter } from "next/router";

type FormValues = Poll.CreatePollData;

export default function Page() {
  const router = useRouter();
  return (
    <>
      <button
        className="border border-black p-2 px-4"
        onClick={() => router.push("/create")}
      >
        Create Poll
      </button>
    </>
  );
}
