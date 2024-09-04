"use client";

import ReservationCard from "@/app/_components/ReservationCard";
import { deleteBooking } from "../_lib/actions";
import { useOptimistic } from "react";

// 487. Removing Reservations Immediately: The useOptimistic Hook
export default function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, //Current state
    (currentBookings, bookingId) => {
      //State update function
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
