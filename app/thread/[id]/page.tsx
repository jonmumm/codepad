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
import { ShareIcon, Users2Icon } from "lucide-react";
import { Share } from "./components.client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default async function Page({ params }: { params: { id: string } }) {
  const thread = getThread(params.id);
  assert(thread, "expected thread");

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <div className="flex flex-col gap-3 flex-1">
      <Card className="w-full flex-none">
        <div className="">
          <Share host={headers().get("host")!} id={params.id} />
        </div>
      </Card>
      <div className="w-full flex-2">
        <div className="flex-1 flex flex-row gap-2 w-full">
          <Card className="flex-1">
            <CardHeader className="flex flex-row gap-1">
              <div className="flex-1">
                <CardTitle>Chat</CardTitle>
                <CardDescription>With the AI and friends</CardDescription>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <Users2Icon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    {/* <CommandInput></CommandInput> */}
                    {/* <CommandInput placeholder="Search participants"></CommandInput> */}
                    <CommandList>
                      <CommandGroup>
                        <CommandEmpty>Empty</CommandEmpty>
                        <CommandItem>Jon</CommandItem>
                        <CommandItem>Bakery</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </CardHeader>
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
      </div>
      <Card className="flex flex-1">
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <div className="flex-1 flex items-center justify-center">
          <div id="drop-area">Drop files or paste images here</div>
        </div>
      </Card>
    </div>
  );
}
