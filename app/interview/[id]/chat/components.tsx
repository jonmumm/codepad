"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonalIcon } from "lucide-react";
import { useChat } from "ai/react";

export function Chat({ interviewId }: { interviewId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/interview/${interviewId}/chat`,
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        <CardDescription>My description</CardDescription>
      </CardHeader>
      <CardContent>
        {messages.map((m) => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label></label>
          <Textarea
            className="flex-1"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon" variant="secondary">
            <SendHorizonalIcon />
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-1"></CardFooter>
    </>
  );
}
