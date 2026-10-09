"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSignOut } from "@/lib/use-sign-out";

interface Props {
  user: { name: string; email: string; image?: string | null };
}

const UserMenu = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const signOut = useSignOut();

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 md:pr-3 hover:bg-green-50 transition-colors cursor-pointer"
      >
        {/* image is optional: only rendered when the user has one */}
        {user.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt=""
            referrerPolicy="no-referrer"
            className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
          />
        )}
        <span className="max-w-24 sm:max-w-40 truncate text-sm md:text-base font-semibold">
          {user.name.split(" ")[0]}
        </span>
        <span
          aria-hidden="true"
          className={`text-[10px] text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <p className="truncate font-bold">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>

          <div className="my-3 h-px bg-gray-200" />

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-gray-50"
          >
            <span aria-hidden="true">👤</span> আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <span aria-hidden="true">↩</span> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
