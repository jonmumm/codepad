import { PARTYKIT_URL } from "@/app/env";

export const ChatParty = (() => {
  const get = async (id: string) => {
    const url = `${PARTYKIT_URL}/parties/chat/${id}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    return res.status === 404 ? null : await res.json();
  };
  const create = async (id: string) => {
    const url = `${PARTYKIT_URL}/parties/chat/${id}`;
    fetch(url, {
      method: "POST",
    });
  };

  return { get, create };
})();
