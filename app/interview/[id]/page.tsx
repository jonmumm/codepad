import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

const InterviewSchema = z.object({
  id: z.string(),
  instructions: z.string(),
});

export default async function Page({ params }: { params: { id: string } }) {
  const host = headers().get("host")!;

  // const chat = await ChatDAO.get(params.id);
  // assert(chat, "expected chat");

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <>
      <Card className="w-full">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <CardHeader>
              <h2 className="font-semibold">Instructions</h2>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <ul className="list-decimal list-inside text-gray-600">
                <li>
                  Read the prompt carefully to understand the task at hand.
                </li>
                <li>
                  Interact with ChatGPT to generate initial code, design, or
                  plan for the task.
                </li>
                <li>
                  Continuously refine the output. Probe for errors and suggest
                  improvements.
                </li>
                <li>
                  Feel free to ask ChatGPT any clarifying questions about the
                  task.
                </li>
                <li>Be mindful of the time limit for each task.</li>
                <li>
                  Once completed, be prepared to present and explain your
                  solution.
                </li>
              </ul>
            </CardContent>
            <CardContent>
              <h3>Prompt</h3>
              {/* <p>{interview.instructions}</p> */}
            </CardContent>
            {/* <CardContent>
              <Timer />
            </CardContent>
            <CardContent>
              <Button>Start</Button>
            </CardContent> */}
            <CardContent>
              <div>
                <Label>Connected</Label>
                <div className="flex flex-row gap-1">
                  <Badge>Jon</Badge>
                  <Badge>Nick</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row gap-1 items-center mt-3">
                <code className="border rounded-md px-3 py-2">
                  https://{host}/interview/{params.id}
                </code>
                <Button>
                  Copy
                  <ClipboardCopyIcon />
                </Button>
              </div>
            </CardFooter>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <div className="flex flex-row gap-2 w-full">
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
          </CardHeader>
          <Editor interviewId={params.id} />
        </Card>
      </div>
    </>
  );
}
