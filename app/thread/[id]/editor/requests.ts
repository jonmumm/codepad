import { PARTYKIT_URL } from "@/app/env";
import { CreateEditorProps } from "./types";

export const createEditor = async (props: CreateEditorProps) => {
  const url = `${PARTYKIT_URL}/parties/editor/${props.id}`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(props),
  });
  return { id: props.id };
};
