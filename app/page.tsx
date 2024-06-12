export default function Home() {
    return (
        <div className="bg-[(/home.jpg)] bg-cover flex flex-col h-full items-center justify-center pt-4">
            <span className="font-bold text-3xl">
                {" "}
                Smart Savings, Closer to You
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
        </div>
    );
}
