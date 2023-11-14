import { ThreadDAO } from "@/party/lib";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { FormProps, NewForm } from "./components";

export default async function Page() {
  const submit = async (values: FormProps) => {
    "use server";

    const id = nanoid();
    await ThreadDAO.create(id, values);
    redirect(`/thread/${id}`);
  };

  return (
    <section className="w-full">
      <NewForm submit={submit} />
    </section>
  );
}
