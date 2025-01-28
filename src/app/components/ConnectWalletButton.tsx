"use client";

import { useEffect, useState } from "react";

function truncateString(str: string) {
  if (str.length <= 10) return str;
  return str.slice(0, 6) + "..." + str.slice(-6);
}

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof (window as any).oyl !== "undefined") {
      try {
        const addresses = await (window as any).oyl.getAddresses();
        setIsConnected(true);
        setWalletAddress(addresses.taproot.address);
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof (window as any).oyl !== "undefined") {
      try {
        const addresses = await (window as any).oyl.getAddresses();
        setIsConnected(true);
        setWalletAddress(addresses.taproot.address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("Please install Oyl!");
    }
  };

  return (
    <button
      className="bg-black rounded-md p-2 text-white absolute right-[10px] top-[10px]"
      onClick={connectWallet}
    >
      {isConnected ? truncateString(walletAddress) : "Connect Wallet"}
    </button>
  );
}
