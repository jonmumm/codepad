import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { User } from "@/party/utils/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Avatar from "./Avatar";
import Signout from "./Signout";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | null;

  return (
    <header className="z-10 p-4 sm:p-6 w-full border-b border-stone-300 absolute sticky top-0 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-medium my-2">chatinterview.dev</h1>
        </Link>
        {user ? (
          <div className="flex gap-2 items-center">
            <Avatar username={user.username} image={user.image ?? null} />
            <span>Hi {user.username}!</span>
            <Signout />
          </div>
        ) : (
          <Link href="/api/auth/signin/github">Login</Link>
        )}
      </nav>
    </header>
  );
}
