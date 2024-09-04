import Spinner from "@/app/_components/Spinner";

// 446. Streaming Route Segments With loading.js File
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
