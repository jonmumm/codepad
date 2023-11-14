import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { headers } from "next/headers";
import { z } from "zod";
import { Chat } from "./chat/components";
import { Editor } from "./editor/components";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { assert } from "@/lib/utils";
import { User } from "@/party/utils/auth";
import { getServerSession } from "next-auth";
import { getThread } from "../requests";
import { ShareIcon } from "lucide-react";
import { Share } from "./components.client";

export default async function Page({ params }: { params: { id: string } }) {
  const thread = getThread(params.id);
  assert(thread, "expected thread");

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <>
      <Card className="w-full flex-none">
        <Share host={headers().get("host")!} id={params.id} />
      </Card>
      <Card className="w-full flex-2">
        <div className="flex-1 flex flex-row gap-2 w-full">
          <Card className="flex-1">
            {/* <Chat
            initialUser={user}
            initialMessages={chat.messages}
            interviewId={params.id}
          /> */}
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Editor</CardTitle>
              <CardDescription>
                This code is shared as context with the AI.
              </CardDescription>
            </CardHeader>
            <Editor interviewId={params.id} />
          </Card>
        </div>
      </Card>
      <Card className="w-full flex-1">
        <div className="h-full">Canvas</div>
      </Card>
    </>
  );
}
