import { z } from "zod";

export const PublicConfigSchema = z.object({
  NEXT_PUBLIC_PARTYKIT_HOST: z.string(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
});

export const ConfigSchema = PublicConfigSchema.merge(
  z.object({
    STRIPE_SECRET_KEY: z.string(),
  })
);