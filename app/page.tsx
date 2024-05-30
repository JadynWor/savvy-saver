import Image from "next/image";
//home page
export default function Home() {
  return (
    <div>
      <header className="font-bold text-3xl">
        <span className="block">Why Over Spend Over Groceries?</span>
        <span className="block">Use Savvy-Saver</span>
      </header>

      <button className="bg-black text-white font-bold rounded-full">
        start shopping now
      </button>
    </div>
  );
}
