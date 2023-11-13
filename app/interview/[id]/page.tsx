import { Textarea } from "@/components/ui/textarea";
import { kv } from "@vercel/kv";
import { z } from "zod";
import Editor from "./editor";
import { Timer } from "./timer";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

const InterviewSchema = z.object({
  id: z.string(),
  instructions: z.string(),
});

export default async function Page({ params }: { params: { id: string } }) {
  const interview = InterviewSchema.parse(
    await kv.hgetall(`interview:${params.id}`)
  );
  return (
    <>
      <h1 className="">Jon&apos;s Interview</h1>
      <div>Copy this url</div>
      <Card className="px-3 py-2">
        <code>
          https://{process.env.NEXT_PUBLIC_CHATINTERVIEW_HOST}/interview/
          {params.id}
        </code>
        <Button>
          Copy
          <ClipboardCopyIcon />
        </Button>
      </Card>
      <Card>
        <Label>Participants</Label>
        <div className="flex flex-row gap-1">
          <Badge>Jon</Badge>
          <Badge>Nick</Badge>
        </div>
      </Card>
      <div className="flex flex-row gap-2 w-full">
        <div className="flex-1">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="block text-gray-700 text-xl font-bold mb-2">
              Instructions
            </h2>
            <p>{interview.instructions}</p>
            <ul className="list-decimal list-inside text-gray-600">
              <li>Read the prompt carefully to understand the task at hand.</li>
              <li>
                Interact with ChatGPT to generate initial code, design, or plan
                for the task.
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
            <Textarea />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-bold">Editor</h2>
          <div style={{ height: "85vh" }}>
            <Editor />;
          </div>
        </div>
      </div>
      <Timer />
    </>
  );
}
