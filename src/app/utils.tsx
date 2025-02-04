import * as bitcoin from "bitcoinjs-lib";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//import { getAddressType, Provider } from "@oyl/sdk";

// export function isValidBitcoinAddress(address: string): boolean {
//   const valid = getAddressType(address);
//   if (valid) {
//     return true;
//   }
//   return false;
// }
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidBitcoinTxId(txid: string): boolean {
  // Check if the string is 64 characters long and contains only hex digits (0-9, a-f, A-F)
  const hexRegex = /^[a-fA-F0-9]{64}$/;
  return hexRegex.test(txid);
}

const rpc = {
  mainnet: {
    url: "https://mainnet.sandshrew.io/v1/d6aebfed1769128379aca7d215f0b689",
    apiUrl: "https://mainnet-api.oyl.gg",
    version: "v1",
    projectId: process.env.MAINNET_API_KEY,
    networkType: "mainnet",
    network: bitcoin.networks.bitcoin,
  },
};

export const fetchRunesByWallet = async (address: string) => {
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_runesbyaddress",
        params: [address],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);
  return response;
};

export const fetchUtxos = async (address: string) => {
  const response = await (
    await fetch(rpc.mainnet.url, {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "esplora_address::utxo",
        params: [address],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const fetchProtoRunesByWallet = async (address: string) => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_protorunesbyaddress",
        params: [
          {
            address,
            protocolTag: "1",
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);

  return response;
};

export const fetchAlkaneView = async (address: string) => {
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "metashrew_view",
        params: ["protorunesbyaddress", "encodedWallet", "latest"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);
  return response.result;
};

export const simulateAlkane = async (address: string) => {
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_simulate",
        params: [{}],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);
  return response.result;
};

export const fetchRunesByBlockHeight = async (block: number) => {
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_runesbyheight",
        params: [block],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);
  return response.result;
};

export const getCurrentBlock = async () => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "btc_getblockcount",
        params: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const fetchRunesByCurrentBlockHeight = async () => {
  const currentBlock = await getCurrentBlock();
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_runesbyheight",
        params: [currentBlock],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response);
  return response.result;
};

export const getTxHash = async (blockHeight: number, index: number) => {
  const blockhash = await getBlockHash({ height: blockHeight });
  const txPageIndex = Math.floor(index / 25) * 25;
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: `esplora_block`,
        params: [blockhash, `/txs/${txPageIndex}`],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result[index]["txid"];
};

export const getTxDetails = async (hash: string) => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: `esplora_tx`,
        params: [hash],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  console.log(response.result);
  return response.result;
};

export const getBlockHash = async ({ height }: { height: number }) => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "esplora_block-height",
        params: [height],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const getRuneForOutpoint = async ({
  outpoint,
}: {
  outpoint: string;
}) => {
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "metashrew_view",
        params: ["runesbyoutpoint", outpoint, "latest"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const getProtorunesForOutpoint = async ({
  txid,
  vout,
  protocolTag,
}: {
  txid: string;
  vout: number;
  protocolTag: string;
}) => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alkanes_protorunesbyoutpoint",
        params: [{ txid, vout, protocolTag }],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const formatDateTime = (timestamp: number) => {
  return new Intl.DateTimeFormat("default", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date(timestamp));
};
