"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export interface IProduct {
  id: string;
  image: string;
  nameBn: string;
  today: number;
  change: { dir: "up" | "down"; pct: number };
}

const toBn = (num: number) =>
  num.toLocaleString("bn-BD", { useGrouping: false, maximumFractionDigits: 1 });

const MarqueeClient = ({ data }: { data: IProduct[] }) => {
  return (
    <MarqueeText className="py-0.5 md:py-0.5 lg:py-1" direction="right" duration={15}>
      {data.map((product) => (
        <div
          key={product.id}
          className="flex items-center whitespace-nowrap gap-1 md:gap-1.5 lg:gap-2 mx-3 md:mx-5 lg:mx-6 text-xs md:text-sm lg:text-sm"
        >
          <span>{product.image}</span>
          <span className="font-semibold">{product.nameBn}</span>
          <span>{`${toBn(product.today)} টাকা/কেজি`}</span>
          <span className={product.change.dir === "up" ? "text-green-600" : "text-red-600"}>
            {product.change.dir === "up" ? "▲" : "▼"} {toBn(product.change.pct)}%
          </span>
        </div>
      ))}
    </MarqueeText>
  );
};

export default MarqueeClient;