import { auth } from "../_lib/auth";

// 435. Adding Page Metadata and Favicon
export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  // console.log(session);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session.user.name}
    </h2>
  );
}
