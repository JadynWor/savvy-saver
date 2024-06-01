import Image from "next/image";
import "animate.css";
//home page
export default function Home() {
  return (
    <div className="bg-green-400 min-h-screen flex flex-col items-center justify-center">
      <header className="font-bold text-3xl mt-0">
        <span className="block"> Savvy-Saver</span>
      </header>
      <span className="text">
        {" "}
        Why Over Spend Over Groceries? Use Savvy-Saver to search the product you
        want and find it at the cheapest deal and closest store near you!
      </span>
      <div className="w-full px-8 flex flex-row  justify-center  items-center space-x-4 mt-8">
        <input
          type="text"
          placeholder="Enter your address"
          className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        />
        <select className="w-32 p-2 border border-gray-300 rounded-md">
          <option value="25">25 miles</option>
          <option value="50">50 miles</option>
          <option value="100">100 miles</option>
        </select>
        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>
      <button className="bg-black text-white font-bold rounded-full fixed bottom-3 right-3 ">
        start shopping now
      </button>
    </div>
  );
}
