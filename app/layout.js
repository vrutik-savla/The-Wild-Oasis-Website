// 424. Creating a Layout
import Header from "@/app/_components/Header";

// 436. Loading and Optimizing Fonts
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});
// console.log(josefin);

import "@/app/_styles/globals.css";
import { ReservationProvider } from "@/app/_components/ReservationContext";

// 435. Adding Page Metadata and Favicon
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s // The Wild Oasis",
    default: "Welcome // The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

//
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        {/* <header>
          {/* 424. Creating a Layout}
          <Logo />
          <Navigation />
        </header> */}
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {/* 468. Using the Context API for State Management */}
            <ReservationProvider>
              {/* The provider is our client component & this children will get replaced by their respective page.js component. Now, all Page() are server component, so basically we're passing server component into a client component, but that's not problem at all becoz we're passing them as a children prop, basically we're passing instance*/}
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
