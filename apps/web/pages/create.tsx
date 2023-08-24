import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePoll } from "../hooks/use-create-poll";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../utils/error";
import type { Poll } from "types";
import { Switch } from "../components/switch";
import { LoadingButton } from "@mui/lab";

type FormValues = Poll.CreatePollData;

export default function Page() {
  const {
    handleSubmit,
    control,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { answers: [{ text: "" }] } });
  const { fields, append } = useFieldArray({
    control,
    name: "answers",
  });
  const { mutateAsync, isLoading } = useCreatePoll();

  const onSubmit = handleSubmit(async (data: FormValues) => {
    try {
      console.log(data);
      const response = await mutateAsync(data);
      console.log(response);
      reset();
    } catch (error) {
      setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <>
      <form className="flex flex-col space-y-2" onSubmit={onSubmit}>
        {errors.root?.message ? (
          <Alert severity="error">{errors.root.message}</Alert>
        ) : null}
        <input
          className="text-2xl"
          type="text"
          placeholder="Your question..."
          {...register("question")}
        />
        {fields.map((field, index) => (
          <input
            className="border border-black px-4 py-2 w-full"
            key={field.id}
            {...register(`answers.${index}.text` as const)}
            placeholder={`Answer ${index}`}
          />
        ))}

        <button type="button" onClick={() => append({ text: "" })}>
          Add new option
        </button>
        <Switch />
        <LoadingButton type="submit" loading={isLoading}>
          Submit
        </LoadingButton>
      </form>
    </>
  );
}
