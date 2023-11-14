import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { headers } from "next/headers";
import { Editor } from "./editor/components";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandNotEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { assert } from "@/lib/utils";
import { User } from "@/party/utils/auth";
import { FileEditIcon, SendHorizontalIcon, Users2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import { getThread } from "../requests";
import { Share } from "./components.client";
import { FileDropCard } from "./file-drop";

export default async function Page({ params }: { params: { id: string } }) {
  const thread = await getThread(params.id);
  assert(thread, "expected thread");
  console.log({ thread });

  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <div className="flex flex-col gap-3 flex-1">
      <Card className="w-full flex-none">
        <div className="">
          <Share host={headers().get("host")!} id={params.id} />
        </div>
      </Card>
      <div className="grid gap-1 sm:grid-cols-2">
        <Card className="flex flex-col">
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
          <Separator />
          <ScrollArea className="flex-1">
            <CardContent className="pt-5">
              <Card>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="flex flex-row justify-between items-center py-2">
                      <CardTitle className="uppercase text-xs text-muted-foreground">
                        System
                      </CardTitle>
                      <Button size="icon" variant="ghost">
                        <FileEditIcon />
                      </Button>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>{thread.systemPrompt}</CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
              <div>Other messages</div>
            </CardContent>
            <ScrollBar />
          </ScrollArea>

          <Separator />
          <div>
            <Command shouldFilter={false}>
              <CommandInput placeholder="Type something..."></CommandInput>
              <CommandNotEmpty>
                <CommandGroup>
                  <CommandList>
                    <CommandItem className="flex items-center justify-center">
                      Send
                      <SendHorizontalIcon size={18} />
                    </CommandItem>
                  </CommandList>
                </CommandGroup>
              </CommandNotEmpty>
            </Command>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>
              This code is shared as context with the AI.
            </CardDescription>
          </CardHeader>
          <ScrollArea>
            <Editor interviewId={params.id} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Card>
      </div>
      <FileDropCard />
      {/* <div id="drop-area">Drop files or paste images here</div> */}
    </div>
  );
}
