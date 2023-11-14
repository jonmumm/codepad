import { z } from "zod";
import { CreateEditorPropsSchema } from "./schema";

export type CreateEditorProps = z.infer<typeof CreateEditorPropsSchema>;
