import { getProducts } from "@/lib/data";
import MarqueeClient from "./MarqueeClient";

const Marquee = async () => {
  const data = await getProducts();

  return (
    <div className="border-b border-gray-200 bg-[#FAFCFA]">
      <MarqueeClient data={data} />
    </div>
  );
};

export default Marquee;
