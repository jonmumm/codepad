import { z } from "zod";
import { CreateThreadPropsSchema, GetThreadResponseSchema } from "./schema";

export type CreateThreadProps = z.infer<typeof CreateThreadPropsSchema>;
export type GetThreadProps = z.infer<typeof GetThreadResponseSchema>;
