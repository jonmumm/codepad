import { Room } from "./Room";

const host = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
const protocol = host?.startsWith("localhost") ? "http" : "https";
const party = "chatroom";

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  // fetch initial data on the server
  const url = `${protocol}://${host}/parties/${party}/${params.roomId}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  const room = await res.json();

  console.log("Server rendering with messages", room.messages);

  return (
    <div className="p-4 h-screen w-screen">
      <h1 className="text-4xl font-medium pb-2 h-20">{params.roomId}</h1>
      <Room
        host={host}
        party={party}
        room={params.roomId}
        messages={room.messages ?? []}
      />
    </div>
  );
}
