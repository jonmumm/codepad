import { PARTYKIT_URL } from "@/app/env";
import { z } from "zod";

export const EditorCreatePropsSchema = z.object({
  code: z.string(),
});
type EditorCreateProps = z.infer<typeof EditorCreatePropsSchema>;

export const ThreadPropsSchema = z.object({
  systemPrompt: z.string(),
  code: z.string(),
});

export const ThreadCreatePropsSchema = ThreadPropsSchema.pick({
  systemPrompt: true,
  code: true,
});

type ThreadCreateProps = z.infer<typeof ThreadCreatePropsSchema>;

export const EditorDAO = (() => {
  const create = async (id: string, props: EditorCreateProps) => {
    const url = `${PARTYKIT_URL}/parties/editor/${id}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(props),
    });
    return;
  };

  return { create };
})();

export const ThreadDAO = (() => {
  const get = async (id: string) => {
    const url = `${PARTYKIT_URL}/parties/thread/${id}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    return;
    // return GetChatPropsSchema.parse(await res.json());
  };

  const create = async (id: string, props: ThreadCreateProps) => {
    const url = `${PARTYKIT_URL}/parties/thread/${id}`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(props),
    });
  };

  return { get, create };
})();

// export const ChatDAO = (() => {
//   const get = async (id: string) => {
//     const url = `${PARTYKIT_URL}/parties/chat/${id}`;
//     const res = await fetch(url, { next: { revalidate: 0 } });
//     return GetChatPropsSchema.parse(await res.json());
//   };
//   const create = async (id: string, props: ChatChreateProps) => {
//     const url = `${PARTYKIT_URL}/parties/chat/${id}`;
//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(props),
//     });
//   };

//   return { get, create };
// })();
