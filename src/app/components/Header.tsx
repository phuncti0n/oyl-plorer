"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { isValidBitcoinAddress, isValidBitcoinTxId } from "../utils";

const Header = () => {
  const [searchInput, setSearchInput] = useState(""); // React state for the input
  const router = useRouter(); // Next.js router

  // Extract the first segment of the URL path
  // const segments = router.asPath.split("/").filter(Boolean);
  // const firstSegment = segments[0]?.toLocaleUpperCase();

  const handleSearch = async () => {
    const input = searchInput.trim();
    const isAddress = true; //isValidBitcoinAddress(input);
    const isBlock = !isNaN(Number(input));
    const isTxn = false; //isValidBitcoinTxId(input);

    if (isAddress) {
      router.push(`/wallet/${input}`);
    } else if (isBlock) {
      console.log(`Search for block ${input}`);
      // Uncomment this if you have block-specific logic
      // const ret = await fetchRunesByBlockHeight(Number(input));
      // console.log(ret);
    } else if (isTxn) {
      console.log(`Search for transaction ${input}`);
      // Uncomment this if you have transaction-specific logic
      // const ret = await fetchRunesByTxn(input);
      // console.log(ret);
    } else {
      console.error(
        "Invalid input. Please provide a valid address, block number, or transaction ID."
      );
    }
  };

  return (
    <div className="flex flex-row justify-between items-center p-2">
      {/* Display the first segment of the URL path */}
      <span onClick={() => router.push("/")}>{"HOME"}</span>

      {/* Search Input */}
      <div className="text-center flex flex-row justify-center">
        <div className="rounded-md border border-gray-300">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // React-compatible input handling
            placeholder="Search"
            className="p-2 text-[16px] w-[410px] rounded-md focus:outline-none focus:ring-0 focus:border-none"
          />
          <button
            onClick={handleSearch}
            className="p-2 text-[16px] bg-black text-white rounded-md hover:bg-lime-200 hover:text-black"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
