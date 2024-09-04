import Link from "next/link";

export const metadata = {
  title: "Reservation Not Found",
};

// 452. Error Handling: "Not Found" Errors
function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This reservation could not be found :(
      </h1>
      <Link
        href="/account/reservations"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all reservations
      </Link>
    </main>
  );
}

export default NotFound;
