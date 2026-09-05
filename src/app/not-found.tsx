import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
        404
      </p>

      <h1 className="mt-4 text-4xl font-black md:text-6xl">
        Page not found
      </h1>

      <p className="mt-4 max-w-md text-zinc-400">
        Lagta hai tum galat route pe aa gaye. Wapas home pe chalo aur prep
        continue karte hain.
      </p>

      <Link href="/" className="btn-primary mt-8">
        <HomeIcon className="h-5 w-5" />
        Go Home
      </Link>
    </div>
  );
}
