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
import { ThreadCreatePropsSchema } from "@/party/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  systemPrompt: z.string(),
  code: z.string(),
});
export type FormProps = z.infer<typeof formSchema>;

export function NewThreadForm({
  submit,
}: {
  submit: (values: FormProps) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      systemPrompt: "This is the context for the conversation",
      code: "console.log('hello world')",
    },
  });
  const [, startTransition] = useTransition();
  const onSubmit = useCallback(
    (values: FormProps) => {
      startTransition(() => {
        submit(values).then((f) => {
          console.log("DONE!");
        });
      });
    },
    [submit, startTransition]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-1 w-full">
          <FormField
            control={form.control}
            name="systemPrompt"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea className="w-full" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give instructions for the candidate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <CodeMirror {...field} />
                  </FormControl>
                  <FormDescription>
                    Set up any sample code here...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button className="w-full" type="submit">
          Create New Thread
        </Button>
      </form>
    </Form>
  );
}
