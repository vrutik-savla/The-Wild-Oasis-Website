import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

// 448. Streaming UI With Suspense: Cabin List
export default async function CabinList({ filter }) {
  // 459. Experimenting With Caching and ISR
  noStore(); //opt-out for individual server component

  // 445. Fetching and Displaying Cabin List
  const cabins = await getCabins();
  // console.log(cabins);

  if (!cabins.length)
    return <p className="text-xl text-primary-200">No cabins available</p>;

  // 465. Sharing State Between Client and Server: The URL
  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
