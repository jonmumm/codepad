import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { createEditor } from "../thread/[id]/editor/requests";
import { createThread } from "../thread/requests";
import { FormProps, NewThreadForm } from "./form/components.client";

export default function Home() {
  const submit = async (values: FormProps) => {
    "use server";
    const { systemPrompt, code } = values;

    const id = nanoid();
    await Promise.all([
      createThread({ id, systemPrompt }),
      createEditor({ id, code }),
    ]);

    // await ThreadDAO.create(id, values);
    redirect(`/thread/${id}`);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <NewThreadForm submit={submit} />

      {/* <section className="bg-yellow-100 w-full p-2 rounded flex justify-center items-center text-xl">
        <p>
          <strong>{count}</strong> multiplayer cursor{count != 1 ? "s" : ""} 🎈
        </p>
      </section> */}

      {/* <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">PartyKit Starter Kit</h1>
        <p>What you’ll find here...</p>
        <ul className="list-disc list-inside">
          <li>Multiplayer chatrooms</li>
          <li>AI chatbots</li>
          <li>Sample client and party code for all of the above</li>
        </ul>
        <p>
          Check <code>README.md</code> for how to run this locally in 3 steps.
        </p>
      </section> */}
    </div>
  );
}
