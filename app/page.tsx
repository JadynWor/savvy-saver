import Image from "next/image";
import "animate.css";
//home page
export default function Home() {
  return (
    <div className="bg-green-400 min-h-screen flex flex-col items-center justify-center">
      <header className="font-bold text-3xl">
        <span className="block">Why Over Spend Over Groceries?</span>
        <span className="block">Use Savvy-Saver</span>
      </header>

      <button className="bg-black text-white font-bold rounded-full fixed bottom-4 right-4 ">
        start shopping now
      </button>
    </div>
  );
}
