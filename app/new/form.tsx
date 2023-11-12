"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  instructions: z.string().min(2, {
    message: "instructions must be at least 2 characters.",
  }),
});
export type FormProps = z.infer<typeof formSchema>;

export default function NewForm({
  createInterview,
}: {
  createInterview: (values: FormProps) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructions: "",
    },
  });

  const [, startTransition] = useTransition();
  const onSubmit = useCallback(
    (values: FormProps) => {
      startTransition(() => {
        createInterview(values).then((f) => {
          console.log("DONE!");
        });
      });
    },
    [createInterview, startTransition]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea className="w-full" {...field} />
              </FormControl>
              <FormDescription>
                Give instructions for the candidate.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Hello
        </Button>
      </form>
    </Form>
  );
}
