import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 w-full">
      <div className="pt-4 max-w-7xl m-auto text-sm text-stone-400 flex flex-row justify-end">
        <div className="flex flex-col justify-end">
          <Link href="https://github.com/jonmumm/chatinterview">About</Link>
        </div>
      </div>
    </footer>
  );
}
