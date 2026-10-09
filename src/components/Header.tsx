"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";

const currDate = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});

const Header = () => {
  const { data: session, isPending } = useSession();

  return (
    <header className="w-full py-3 border-b border-gray-100 bg-[#FAFCFA]">
      <div className="max-w-6xl mx-auto px-3 md:px-4 flex justify-between items-center gap-2">
        {/* left part */}
        <div className="flex gap-2 md:gap-3 items-center min-w-0">
          <Image
            className="bg-green-700 p-2 rounded-lg shrink-0 w-9 h-9 md:w-[45px] md:h-[45px]"
            src="/logo-icon.png"
            width={45}
            height={45}
            alt="nav image"
          />

          <div className="min-w-0">
            <Link href="/">
              <h1 className="font-bold text-xl md:text-2xl leading-tight">বাজার দর</h1>
            </Link>
            <p className="text-xs md:text-sm truncate text-gray-600">{currDate}</p>
          </div>
        </div>

        {/* right part */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          {isPending ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-green-200/70" />
              <div className="h-4 w-16 rounded bg-green-200/70" />
            </div>
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link href="/signin" className="font-semibold text-sm md:text-base">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm md:btn-md bg-green-700 text-white font-semibold border-none shadow-[0_6px_6px_-4px] shadow-green-700/80 rounded-lg"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
