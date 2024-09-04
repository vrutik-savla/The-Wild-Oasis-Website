import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";

// 422. Defining Routes and Pages
// 423. Navigating Between Pages
// 437. Improving the Navigation and Root Layout
export default async function Navigation() {
  // 472. Getting the User Session
  const session = await auth(); // This auth function makes the entire route dynamic, becoz it reads session from cookies which are known only at run-time
  // Now, this navigation is on RootLayout, & our entire application renders under this route, so this auth() makes our entire application dynamic. !!!Very very important..
  // console.log(session);
  // {
  //   user: {
  //     name: 'Vrutik',
  //     email: 'vrutiksavla2003@gmail.com',
  //     image: 'https://lh3.googleusercontent.com/a/ACg8ocIcmisOLJtTKMQciTMpcs_YABSahji9Htn25Vvh1lrSVA=s96-c'
  //   },
  //   expires: '2024-10-01T05:26:11.330Z'
  // }

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {/* 472. Getting the User Session */}
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex justify-center items-center gap-4"
            >
              <div className="relative flex-1 w-8 h-8 mb-1">
                <Image
                  className="object-cover rounded-full"
                  src={session.user.image}
                  alt={session.user.name}
                  fill
                  referrerPolicy="no-referrer"
                />
              </div>
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
