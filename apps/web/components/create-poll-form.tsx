import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@poll/lib";
import type { Plan } from "@poll/prisma";
import type { Poll } from "@poll/types";
import {
  Button,
  LoadingButton,
  Input,
  Switch,
  Alert,
  AlertTitle,
  Icon,
  Badge,
} from "@poll/ui";
import { useRouter } from "next/router";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/form";
import { routes } from "../config/routes";
import { useCreatePoll } from "../hooks/use-create-poll";
import { getErrorMessage } from "../utils/error";

export type CreatePollFormProps = { ActionButtons?: JSX.Element[] } & Omit<
  React.ComponentPropsWithoutRef<"form">,
  "children"
>;

// TODO reuse schema from global `schemas` package
export const createPollSchema = z.object({
  question: z.string().min(3),
  answers: z
    .array(
      z.object({
        text: z
          .string({ required_error: "Answer should not be empty" })
          .nonempty(),
      })
    )
    .min(2),
  isPublic: z.boolean().optional(),
  requireRecaptcha: z.boolean().optional(),
});

type FormValues = Poll.CreatePollData;

export const CreatePollForm = ({
  className,
  ActionButtons = [],
  ...props
}: CreatePollFormProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: "",
      answers: Array.from({ length: 2 }, () => ({ text: "" })),
      isPublic: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col", className)}
        {...props}>
        {form.formState.errors.root?.message ? (
          <Alert variant="error" className="mb-8">
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        ) : null}
        <div className="mb-8 flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Create Poll</h1>
          <p className="text-lg font-medium text-neutral-400">
            Craft Your questions, gather opinions and make decisions.
          </p>
        </div>

        <div className="mb-8 space-y-3">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="Your question..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-3">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem>
                      {index === 0 && <FormLabel>Answer options</FormLabel>}
                      <FormControl>
                        <Input
                          placeholder={`Option ${index + 1}`}
                          {...field}
                          RightIcon={
                            fields.length > 2 ? (
                              <Icon.X onClick={() => remove(index)} />
                            ) : null
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <Button
            type="button"
            className="w-full bg-neutral-200 hover:bg-neutral-200/50 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-700/90"
            onClick={() => append({ text: "" })}>
            Add option
          </Button>
        </div>

        <div className="mb-8 space-y-2">
          <h2 className="text-base font-medium">Settings</h2>
          <div className="space-y-2">
            <PollOptionField
              control={form.control}
              name="isPublic"
              Icon={<Icon.Globe className="h-7 w-7" />}
              heading="Public"
              description="Make this poll public"
            />
            <PollOptionField
              requiredPlan={"BASIC"}
              control={form.control}
              name="requireRecaptcha"
              Icon={<Icon.Shield className="h-7 w-7" />}
              heading="Require ReCAPTCHA"
              description="Protect your poll from bot spam"
            />
          </div>
        </div>

        <div className="ml-auto flex space-x-2">
          {ActionButtons.map((Button) => Button)}
          <LoadingButton
            className="min-w-[100px]"
            type="submit"
            isLoading={isLoading}>
            Create
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

type PollOptionFieldProps = {
  Icon: JSX.Element;
  heading: string;
  requiredPlan?: Plan;
  description: string;
} & Omit<React.ComponentProps<typeof FormField<FormValues>>, "render">;

function PollOptionField({
  Icon,
  heading,
  description,
  requiredPlan = "FREE",
  ...props
}: PollOptionFieldProps) {
  return (
    <>
      <FormField
        {...props}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-sm border-2 border-neutral-100 bg-white px-4 py-6 dark:border-none dark:bg-neutral-800 sm:pl-0">
            <div className="flex">
              <div className="my-auto hidden justify-center px-4 sm:flex">
                {Icon}
              </div>
              <div>
                <FormLabel className="inline-flex items-center space-x-2">
                  <span>{heading}</span>
                  {requiredPlan !== "FREE" ? (
                    <Badge className="capitalize">
                      {requiredPlan.toLowerCase()}
                    </Badge>
                  ) : null}
                </FormLabel>
                <FormDescription className="text-sm font-medium">
                  {description}
                </FormDescription>
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
