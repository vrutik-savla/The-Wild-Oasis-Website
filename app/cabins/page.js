import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

// 459. Experimenting With Caching and ISR
export const revalidate = 3600; //Here wee need to put exact value, no computation, for example 60*60 not allowed, instead write directly 3600
// This searchParams can of course also not be known at runtime, right? What this means is that whenever we make use of the searchParams, the page can no longer be statically rendered. So right now, this cabin's overview page will now always be dynamically rendered, meaning that what we have here, so this revalidate, this now no longer takes any effect because this only applies to statically generated pages, which makes sense, right? So there's no need to revalidate a page that is dynamic anyway. But I'll just leave this here because this is in the end just a learning project anyway. So this is really relevant in case you don't use searchParams or anything else that switches the page to dynamic rendering.

// 435. Adding Page Metadata and Favicon
export const metadata = {
  title: "Cabins",
};

// 440. Building the About Page With Responsive Images
export default function Page({ searchParams }) {
  // 465. Sharing State Between Client and Server: The URL
  // console.log(searchParams); URL: /cabins?capacity=small Log: { capacity: 'small' }
  // This searchParams prop is only & only available on page.js component & not on any other components
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* 465. Sharing State Between Client and Server: The URL */}
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* 448. Streaming UI With Suspense: Cabin List || 465. Sharing State Between Client and Server: The URL || 468. Using the Context API for State Management */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

/* export default async function Page() {
  // 426. Fetching Data in a Page
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  // console.log(data); It'll log in terminal
  //useState(23); //Error: × You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.

  return (
    <div>
      <h1>Cabins page</h1>

      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* 427. Adding Interactivity With Client Components }
      <Counter users={data} />
    </div>
  );
} */
