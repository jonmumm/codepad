import { PARTYKIT_URL } from "@/app/env";
import { assert } from "@/lib/utils";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import * as Y from "yjs";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  const getCode = async () => {
    const url = `${PARTYKIT_URL}/parties/editor/${params.id}`;
    const res = await fetch(url, { next: { revalidate: 0 } });
    const json = await res.json();
    const value = json["value"];
    assert(value, "expected to get value from codeEditor");
    return value;
  };

  const getSystemMessageContent = async () => {
    const code = await getCode();

    return `You are helping to conduct a coding interview. The interviewer has provided a prompt for a problem and the candidate will be using ChatGPT to help find a solution. The candidate has access to a whiteboard where they will draw graphics and a code editor where they can share code with you and ask questions about it.
    
    Here is the code currently:

    \`\`\`
    ${code}
    \`\`\`
    `;
  };

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content: await getSystemMessageContent(),
      },
    ],
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
