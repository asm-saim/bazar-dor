import Image from "next/image";

const currDate = new Date().toLocaleDateString("bn-BD", {
  dateStyle: "full",
});
console.log("t",currDate);

const Header = () => {
  return (
    <header className="w-full bg-amber-100">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* left part */}
        <div className="flex gap-3 items-center">
          <Image className="bg-green-700 p-2 rounded-lg" src="/logo-icon.png" width={45} height={45} alt="nav image" />

          <div className="">
            <h1 className="font-bold text-2xl">বাজার দর</h1>
            <p className="text-sm">{currDate}</p>
          </div>
        </div>

        {/* right part */}
        <div className="flex items-center gap-5">
          <button className="font-bold">সাইন ইন</button>
          <button className="btn bg-green-700 text-white rounded-lg">সাইন আপ</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
