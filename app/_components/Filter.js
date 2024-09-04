"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterButtons = [
  {
    name: "All cabins",
    filter: "all",
  },
  {
    min: 1,
    max: 3,
    filter: "small",
  },
  {
    min: 4,
    max: 7,
    filter: "medium",
  },
  {
    min: 8,
    max: 12,
    filter: "large",
  },
];

// 465. Sharing State Between Client and Server: The URL
export default function Filter() {
  // CLIENT to URL:
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get("capacity") ?? "all";
  function handlerFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex ">
      {filterButtons.map((filterBtn) => (
        <Button
          key={filterBtn.filter}
          filter={filterBtn.filter}
          handlerFilter={handlerFilter}
          activeFilter={activeFilter}
        >
          {filterBtn?.name
            ? filterBtn.name
            : `${filterBtn.min}—${filterBtn.max} guests`}
        </Button>
      ))}
    </div>
  );
}

function Button({ children, filter, handlerFilter, activeFilter }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handlerFilter(filter)}
    >
      {children}
    </button>
  );
}
