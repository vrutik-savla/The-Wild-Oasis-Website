import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// 469. Creating an API Endpoint With Route Handlers
export async function GET(request, { params }) {
  // console.log(request);
  // console.log(params);
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }

  // return Response.json({ test: "test" });
}

// export async function POST() {}
// export async function DELETE() {}
// export async function PATCH() {}
// export async function PUT() {}
