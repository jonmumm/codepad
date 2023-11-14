import { z } from "zod";

export const CreateEditorPropsSchema = z.object({
  code: z.string(),
  id: z.string(),
});
