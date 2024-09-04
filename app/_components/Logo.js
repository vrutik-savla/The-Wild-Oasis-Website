import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

//424. Creating a Layout
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* 438. Optimizing Images With Next.js <Image /> Component */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis Logo" /> */}
      <Image src={logo} height="60" width="60" alt="The Wild Oasis Logo" />

      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
