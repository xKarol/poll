import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePoll } from "../hooks/use-create-poll";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../utils/error";

type FormValues = {
  question: string;
  answers: { value: string }[];
};

export default function Page() {
  const {
    handleSubmit,
    control,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { answers: [{ value: "" }] } });
  const { fields, append } = useFieldArray({
    control,
    name: "answers",
  });
  const { mutateAsync } = useCreatePoll();

  // TODO fix data undefined type
  const onSubmit = handleSubmit(async (data) => {
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
            {...register(`answers.${index}.value` as const)}
            placeholder={`Answer ${index}`}
          />
        ))}

        <button type="button" onClick={() => append({ value: "" })}>
          Add new option
        </button>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
