"use client";

import { useRouter } from "next/navigation";

// import Link from "next/link";

// 451. Error Handling: Setting Up Error Boundaries
export default function Error({ error, reset }) {
  const router = useRouter();
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p>{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={() => {
          router.back();
          console.log("click");
        }}
      >
        Try again
      </button>
      {/* <Link
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        href="/"
      >
        Try again
      </Link> */}
    </main>
  );
}
