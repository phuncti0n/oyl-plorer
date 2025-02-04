"use client";
import React, { useState, useEffect, useRef } from "react";
import { DEFAULT_PROVIDER } from "@oyl/sdk/lib/cli/constants";
import { Provider } from "@oyl/sdk";
import { useConfigStore } from "../store/useConfigStore";
import { shallow, useShallow } from "zustand/shallow";
import { useQueryClient } from "@tanstack/react-query";
import { bitcoin } from "bitcoinjs-lib/src/networks";

type ProviderName = "alkanes" | "bitcoin" | "regtest" | "oylnet";

const PROVIDERS: Array<{
  id: ProviderName;
  provider: Provider;
}> = [
  { id: "alkanes", provider: DEFAULT_PROVIDER.alkanes },
  { id: "bitcoin", provider: DEFAULT_PROVIDER.bitcoin },
  { id: "regtest", provider: DEFAULT_PROVIDER.regtest },
  { id: "oylnet", provider: DEFAULT_PROVIDER.oylnet },
];

export function NetworkSwitch() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { setCurrentProvider, currentProvider } = useConfigStore(
    useShallow((state) => ({
      setCurrentProvider: state.setCurrentProvider,
      currentProvider: state.currentProvider,
    }))
  );

  const changeProvider = (networkId: string) => {
    let provider: Provider = DEFAULT_PROVIDER[networkId];
    if (networkId === "bitcoin") {
      provider = new Provider({
        url: "https://mainnet.sandshrew.io",
        projectId: process.env.NEXT_PUBLIC_SANDSHREW_PROJECT_ID!,
        networkType: "mainnet",
        network: bitcoin,
        version: "v2",
      });
    }
    setCurrentProvider(provider, networkId);
    queryClient.invalidateQueries({ queryKey: ["alkanes"] });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute left-[10px] top-[10px] w-48" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-black text-white rounded-md p-2 flex justify-between items-center"
        >
          <span className="capitalize">{currentProvider.id}</span>
        </button>
        {isOpen && (
          <div className="absolute top-10 left-0 w-full mt-1 bg-white border rounded-md shadow-lg z-20">
            {PROVIDERS.map((network) => (
              <button
                key={network.id}
                onClick={() => changeProvider(network.id)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md capitalize ${
                  currentProvider.id === network.id
                    ? "bg-gray-50 font-medium"
                    : ""
                }`}
              >
                {network.id}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NetworkSwitch;
