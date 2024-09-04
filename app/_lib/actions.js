"use server";

// Keep in mind that here we are now really on the backend in Server Action. So, we're doing basically backend development here and so, we need to always make sure of two things. First, that the user who is invoking the server action actually has the authorization of doing the action that the server action is supposed to do and then second, we also need to always treat all the input as unsafe.

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

// 480. Updating the Profile Using a Server Action
export async function updateGuest(formData) {
  // console.log(formData);
  /* FormData {
    '$ACTION_ID_449c8de435228667f05f3ea72a88416ae1d2f822': '',
    nationality: 'India%https://flagcdn.com/in.svg',
    nationalID: '000'
  } */

  const session = await auth();

  if (!session) throw new Error("You must be logged in"); // Now, it's a common practice in server actions, not to use a try catch declaration. But instead, we simply throw errors right here in the function body, and they will then just be caught by the closest error boundary, which in this case is simply this error.js that we set up way back. But of course, we could also create a more local error boundary by creating a new error.js right somewhere here, for example, inside profile or inside account.

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%"); //formData is a web API, search on MDN Docs for more info..

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  // console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  // 481. Manual Cache Revalidation
  revalidatePath("/account/profile");
}

export async function getBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to view this booking");
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error(error);
    // throw new Error("Booking could not get loaded");
    notFound();
  }

  return data;
}

// 489. Creating a New Reservation
export async function createBooking(bookingData, formData) {
  // console.log(formData);
  // console.log(bookingData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Object.entries(formData.entries()); When we have huge formData object, google it...

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  // console.log(newBooking);

  const { data, error } = await supabase.from("bookings").insert([newBooking]);
  // // So that the newly created object gets returned!
  // .select()
  // .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

// 484. Deleting a Reservation
export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Doing this check is important, becoz any malicious user can fetch the cURL command from network tab & can delete any of the bookings from our DB which is not belonging to him.
  // ALWAYS make sure to alert for this type of situations whenever you're writing your backend code.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

// 486. CHALLENGE #1: Updating a Reservation
export async function updateReservation(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building Update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error Handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // 6) Revalidation
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  // 7) Redirecting
  redirect("/account/reservations");
}

// 475. Building a Custom Sign In Page
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

// 476. Building a Custom Sign Out Button
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
