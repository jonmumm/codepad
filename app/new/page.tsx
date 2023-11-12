import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import NewForm, { FormProps } from "./form";

export default async function Page() {
  const createInterview = async (values: FormProps) => {
    "use server";

    const interviewId = nanoid();

    redirect(`/interview/${interviewId}`);
  };

  return (
    <section className="w-full">
      <NewForm createInterview={createInterview} />
    </section>
  );
}
