"use client";

import Link from "next/link";
import { useCursors } from "./cursors-provider";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-8">
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

      <Link href="/new">
        <Button className="flex items-center justify-center px-10 py-6 border border-stone-200 rounded-lg shadow hover:shadow-md">
          New Interview
        </Button>
      </Link>
    </div>
  );
}
