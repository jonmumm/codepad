import { z } from "zod";

export const CreateThreadPropsSchema = z.object({
  id: z.string(),
  systemPrompt: z.string(),
});

export const GetThreadResponseSchema = z.object({
  id: z.string(),
});
