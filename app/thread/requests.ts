import { PARTYKIT_URL } from "@/app/env";
import { GetThreadResponseSchema } from "./schema";
import { CreateThreadProps } from "./types";

export const createThread = async (props: CreateThreadProps) => {
  const url = `${PARTYKIT_URL}/parties/thread/${props.id}`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(props),
  });
  return { id: props.id };
};

export const getThread = async (id: string) => {
  const url = `${PARTYKIT_URL}/parties/thread/${id}`;
  const resp = await fetch(url);
  return GetThreadResponseSchema.parse(await resp.json());
};
