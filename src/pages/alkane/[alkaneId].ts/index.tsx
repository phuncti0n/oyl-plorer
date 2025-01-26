import { useState } from "react";

type Block = {
  blockNumber: number;
  timestamp: string;
  miner: string;
  txCount: number;
  transactions: Array<string>; // Could be a detailed transaction object
};

const mockBlockData: Block = {
  blockNumber: 1234567,
  timestamp: "2024-09-06 10:45:00",
  miner: "0x1234...abcd",
  txCount: 3,
  transactions: ["0xabc123...def456", "0x789xyz...789abc", "0xdef456...abc123"],
};

const Alkane = () => {
  const [searchInput, setSearchInput] = useState("");
  const [block, setBlock] = useState<Block | null>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    // In a real-world app, you'd fetch data from an API using the search input
    // For now, we simulate the block data
    if (searchInput === "1234567") {
      setBlock(mockBlockData);
      setError("");
    } else {
      setBlock(null);
      setError("Block or transaction not found.");
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-center text-2xl font-bold mb-8">Alkanes Explorer</h1>

      {/* Search bar */}
      <div className="text-center mb-6">
        <input
          type="text"
          value={searchInput}
          onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
          placeholder="Search by block number or transaction ID"
          className="p-3 text-lg w-72 rounded border border-gray-300"
        />
        <button
          onClick={handleSearch}
          className="p-3 ml-3 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>

      {/* Block information */}
      {block && (
        <div className="border border-gray-300 p-5 rounded-lg">
          <h2 className="text-xl font-semibold">Block Details</h2>
          <p>
            <strong>Block Number:</strong> {block.blockNumber}
          </p>
          <p>
            <strong>Timestamp:</strong> {block.timestamp}
          </p>
          <p>
            <strong>Miner:</strong> {block.miner}
          </p>
          <p>
            <strong>Transaction Count:</strong> {block.txCount}
          </p>

          {/* Transactions */}
          <h3 className="mt-4 text-lg font-semibold">Transactions</h3>
          <ul className="list-disc pl-6">
            {block.transactions.map((tx, index) => (
              <li key={index} className="text-sm text-gray-700">
                {tx}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-center mt-6">{error}</p>}
    </div>
  );
};

export default Alkane;
