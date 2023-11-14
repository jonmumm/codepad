"use client";

// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Avatar from "@/app/components/Avatar";
import { PARTYKIT_HOST } from "@/app/env";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/party/utils/auth";
import { ChatMessage, Message } from "@/party/utils/message";
import { useSession } from "next-auth/react";
import PartySocket from "partysocket";
import usePartySocket from "partysocket/react";
import { FormEventHandler, useCallback, useEffect, useState } from "react";

export function Chat({
  interviewId,
  initialUser,
  initialMessages,
}: // handleSubmit
{
  interviewId: string;
  initialUser: User | null;
  initialMessages: Message[];
  // handleSubmit: () => Promise<void>
}) {
  // const { messages, input, handleInputChange, handleSubmit } = useChat({
  //   api: `/interview/${interviewId}/chat`,
  // });
  // const session = await getServerSession(authOptions);
  const session = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [user, setUser] = useState(initialUser);
  // console.log({ session, messages });

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    party: "chat",
    room: interviewId,
    onOpen(e) {
      console.log(session.status, e.target, "open");
      // identify user upon connection
      if (session.status === "authenticated" && e.target) {
        console.log("sess", session);
        identify(interviewId, e.target as PartySocket).then(() => {
          console.log("called identify");
        });
        if (session?.data?.user) setUser(session.data.user as User);
      }
    },
    onMessage(event: MessageEvent<string>) {
      const message = JSON.parse(event.data) as ChatMessage;
      // upon connection, the server will send all messages in the room
      if (message.type === "sync") setMessages(message.messages);
      // after that, the server will send updates as they arrive
      if (message.type === "new") setMessages((prev) => [...prev, message]);
      if (message.type === "clear") setMessages([]);
      if (message.type === "edit") {
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? message : m))
        );
      }
      scrollToBottom();
    },
  });

  // authenticate connection to the partykit room if session status changes
  useEffect(() => {
    if (
      session.status === "authenticated" &&
      socket?.readyState === socket.OPEN
    ) {
      identify(interviewId, socket);
    }
  }, [interviewId, session.status, socket]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const text = event.currentTarget.message.value;
      if (text?.trim()) {
        socket.send(JSON.stringify({ type: "new", text }));
        event.currentTarget.message.value = "";
        scrollToBottom();
      }
    },
    [socket]
  );

  // console.log({ session, messages, user });
  // const session = await getServerSession(authOptions);
  // const user = session?.user as User | null;

  // let chat = await ChatParty.get(interviewId);
  // if (!chat) {
  //   await ChatParty.create(interviewId);
  // }

  // fetch user session for server rendering
  // const session = await getServerSession(authOptions);
  // const user = session?.user as User | null;

  return (
    <>
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        {messages.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {messages.map((message) => (
              <RoomMessage
                key={message.id}
                message={message}
                isMe={message.from.id === user?.username}
              />
            ))}
          </ul>
        ) : (
          <p className="italic">No messages yet</p>
        )}
        {/* {messages.map((m) => (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <label></label>
          <Textarea
            className="flex-1"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" size="icon" variant="secondary">
            <SendHorizonalIcon />
          </Button>
        </form> */}
        <form onSubmit={handleSubmit} className="sticky bottom-4 sm:bottom-6">
          <input
            placeholder="Send message..."
            className="border border-stone-400 p-3 bg-stone-100 min-w-full rounded"
            type="text"
            name="message"
          ></input>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row gap-1"></CardFooter>
    </>
  );
}

const identify = async (room: string, socket: PartySocket) => {
  // the ./auth route will authenticate the connection to the partykit room
  const url = `/chat/${room}/auth?_pk=${socket._pk}`;
  const req = await fetch(url, { method: "POST" });

  if (!req.ok) {
    const res = await req.text();
    console.error("Failed to authenticate connection to PartyKit room", res);
  }
};

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
}

function RoomMessage(props: { message: Message; isMe: boolean }) {
  const { message, isMe } = props;
  const [formattedDate, setFormattedDate] = useState<string | null>();

  // Format the date on the client to avoid hydration mismatch
  useEffect(
    () => setFormattedDate(new Date(message.at).toLocaleTimeString()),
    [message.at]
  );

  if (message.from.id === "system") {
    return (
      <li className="text-stone-400 flex flex-col justify-center items-center text-center gap-1">
        <span className="font-mono text-sm">{message.text}</span>
        <span className="text-xs">{formattedDate}</span>
      </li>
    );
  } else {
    return (
      <li
        className={`flex justify-start gap-2 ${isMe ? "flex-row-reverse" : ""}`}
      >
        <div className="grow-0">
          <Avatar
            username={message.from.id}
            image={message.from.image ?? null}
          />
        </div>
        <div className={`flex flex-col gap-1 ${isMe ? "items-end" : ""}`}>
          <span className="bg-stone-100 px-2 py-1 rounded-xl">
            {message.text}
          </span>
          <span className="text-xs text-stone-400">
            {formattedDate ?? <>&nbsp;</>}
          </span>
        </div>
      </li>
    );
  }
}
