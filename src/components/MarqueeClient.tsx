"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { IProduct, formatPrice, formatPct, unitBn } from "@/lib/api";

const MarqueeClient = ({ data }: { data: IProduct[] }) => {
  return (
    <MarqueeText className="py-0.5 lg:py-1" direction="right" duration={15}>
      {data.map((product) => (
        <div
          key={product.id}
          className="flex items-center whitespace-nowrap gap-1 md:gap-1.5 lg:gap-2 mx-3 md:mx-5 lg:mx-6 text-xs md:text-sm"
        >
          <span>{product.image}</span>
          <span className="font-medium">{product.nameBn}</span>
          <span>
            {formatPrice(product.today)} টাকা/{unitBn(product.unit).replace("প্রতি ", "")}
          </span>
          {product.change && product.change.dir !== "flat" && (
            <span className={product.change.dir === "up" ? "text-red-600" : "text-green-600"}>
              {product.change.dir === "up" ? "▲" : "▼"} {formatPct(Math.abs(product.change.pct))}%
            </span>
          )}
        </div>
      ))}
    </MarqueeText>
  );
};

export default MarqueeClient;