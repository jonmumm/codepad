import { kv } from "@vercel/kv";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import NewForm, { FormProps } from "./form";
import { Timer } from "../interview/[id]/timer";

export default async function Page() {
  const createInterview = async (values: FormProps) => {
    "use server";

    const id = nanoid();
    await kv.hset(`interview:${id}`, {
      id,
      instructions: values.instructions,
    });

    redirect(`/interview/${id}`);
  };

  return (
    <section className="w-full">
      <NewForm createInterview={createInterview} />
    </section>
  );
}
