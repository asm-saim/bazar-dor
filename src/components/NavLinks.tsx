import { Suspense } from "react";
import { cacheLife } from "next/cache";
import type { ICategory } from "@/lib/api";
import NavLinksList, { NavList } from "./NavLinksList";

const getCategories = async (): Promise<ICategory[]> => {
  "use cache";
  cacheLife("days"); // categories rarely change

  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  return res.json();
};

const NavLinks = async () => {
  const data = await getCategories();

  return (
    <div className="border-b border-gray-200 bg-[#FAFCFA]">
      <Suspense fallback={<NavList data={data} />}>
        <NavLinksList data={data} />
      </Suspense>
    </div>
  );
};

export default NavLinks;
