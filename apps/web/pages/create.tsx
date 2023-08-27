import { useForm, useFieldArray } from "react-hook-form";
import { useCreatePoll } from "../hooks/use-create-poll";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../utils/error";
import type { Poll } from "types";
import { Switch } from "../components/switch";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { routes } from "../config/routes";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";

type FormValues = Poll.CreatePollData;

export default function Page() {
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      question: "",
      answers: [{ text: "" }, { text: "" }],
      isPublic: true,
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const { mutateAsync, isLoading } = useCreatePoll();

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      console.log(data);
      const response = await mutateAsync(data);
      form.reset();
      await router.push(routes.poll(response.id));
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    }
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {form.formState.errors.root?.message ? (
            <Alert severity="error">{form.formState.errors.root.message}</Alert>
          ) : null}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Your question..."
                    className="border border-black px-4 py-2 w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-2">
            {fields.map((field, index) => (
              <input
                key={field.id}
                className="border border-black px-4 py-2 w-full"
                {...form.register(`answers.${index}.text` as const)}
                placeholder={`Answer ${index}`}
              />
            ))}
            <button onClick={() => append({ text: "" })}></button>
          </div>

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Public</FormLabel>
                  <FormDescription>Make this poll public</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isLoading}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
