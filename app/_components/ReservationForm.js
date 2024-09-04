"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import Image from "next/image";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

// 467. Data Fetching Strategies for the Reservation Section
function ReservationForm({ cabin, user }) {
  // 468. Using the Context API for State Management
  const { range, resetRange } = useReservation();
  // 489. Creating a New Reservation
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range?.from ?? 0;
  const endDate = range?.to ?? 0;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };
  const createBookingWithData = createBooking.bind(null, bookingData); // !!VERY IMPORTANT, binding bookingData object with createBooking SA function

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 w-8 h-8 mb-1">
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="object-cover rounded-full"
              src={user.image}
              fill
              alt={user.name}
            />
          </div>
          <p>{user.name}</p>
        </div>
      </div>

      {/* 489. Creating a New Reservation */}
      <form
        // action={createBooking}
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!startDate || !endDate ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            ({
              /* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
                Reserve now
              </button> */
            },
            (
              <SubmitButton pendingLabel="Reserving...">
                Reserve now
              </SubmitButton>
            ))
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
