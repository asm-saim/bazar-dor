"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ICategory } from "@/lib/api";

interface Props {
  data: ICategory[];
  activeSlug?: string | null;
}

// presentational list: no hooks, so it also works as a Suspense fallback
export const NavList = ({ data, activeSlug = null }: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-start px-3 sm:px-4 md:px-6 lg:px-10 gap-x-1 sm:gap-x-2 md:gap-x-3 lg:gap-x-5 gap-y-1 py-2 text-xs md:text-sm">
      {data.map((item) => {
        const active = item.slug === activeSlug;

        return (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 font-semibold transition-colors ${
              active ? "bg-green-700 text-white shadow-sm" : "text-gray-800 hover:bg-green-100"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

const NavLinksList = ({ data }: { data: ICategory[] }) => {
  const pathname = usePathname(); // e.g. "/category/chal"
  const activeSlug = pathname.startsWith("/category/") ? decodeURIComponent(pathname.split("/")[2] ?? "") : null;

  return <NavList data={data} activeSlug={activeSlug} />;
};

export default NavLinksList;
