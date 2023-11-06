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
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@poll/ui";
import { useRouter } from "next/router";
import React, { useState } from "react";
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
import { useHasPermission } from "../hooks/use-has-permission";
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
  const [disabled, setDisabled] = useState(false);
  const form = useForm<FormValues>({
    // @ts-expect-error TODO FIX
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: "",
      answers: Array.from({ length: 2 }, () => ({ text: "" })),
      isPublic: true,
    },
    disabled: disabled,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const { mutateAsync, isLoading } = useCreatePoll();

  const onSubmit = form.handleSubmit(async (data: FormValues) => {
    try {
      setDisabled(true);
      const response = await mutateAsync(data);
      form.reset();
      await router.push(routes.poll(response.id));
    } catch (error) {
      form.setError("root", { message: getErrorMessage(error) });
    } finally {
      setDisabled(false);
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
                            fields.length > 2 && !disabled ? (
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
            disabled={disabled}
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
              disabled={disabled}
              name="isPublic"
              IconElement={<Icon.Globe className="h-7 w-7" />}
              heading="Public"
              description="Make this poll public"
            />
            <PollOptionField
              requiredPlan={"BASIC"}
              control={form.control}
              disabled={disabled}
              name="requireRecaptcha"
              IconElement={<Icon.Shield className="h-7 w-7" />}
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
  IconElement: JSX.Element;
  heading: string;
  requiredPlan?: Plan;
  description: string;
} & Omit<React.ComponentProps<typeof FormField<FormValues>>, "render">;

function PollOptionField({
  IconElement,
  heading,
  description,
  requiredPlan = "FREE",
  disabled,
  ...props
}: PollOptionFieldProps) {
  const { hasPermission } = useHasPermission();
  const hasAccess = hasPermission(requiredPlan);
  return (
    <>
      <FormField
        {...props}
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-sm border-2 border-neutral-100 bg-white px-4 py-6 dark:border-none dark:bg-neutral-800 sm:pl-0">
            <div className="flex">
              <div className="my-auto hidden justify-center px-4 sm:flex">
                {IconElement}
              </div>
              <div>
                <FormLabel className="inline-flex items-center space-x-2">
                  <span>{heading}</span>
                  {!hasAccess ? (
                    <Badge className="capitalize">
                      <Icon.Gem />
                      <span>{requiredPlan.toLowerCase()}</span>
                    </Badge>
                  ) : null}
                </FormLabel>
                <FormDescription className="text-sm font-medium">
                  {description}
                </FormDescription>
              </div>
            </div>
            <FormControl>
              <Tooltip open={disabled || hasAccess ? false : undefined}>
                <TooltipTrigger asChild>
                  <div>
                    <Switch
                      disabled={disabled || !hasAccess}
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  Basic or higher plan is required to change this option.
                </TooltipContent>
              </Tooltip>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
