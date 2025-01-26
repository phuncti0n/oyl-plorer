import { Provider } from "@oyl/sdk";
import { DEFAULT_PROVIDER } from "@oyl/sdk/lib/cli/constants";
import { bitcoin, regtest } from "bitcoinjs-lib/src/networks";

export const provider = DEFAULT_PROVIDER.oylnet;

export const defaultProvider = DEFAULT_PROVIDER;

// export const provider = new Provider({
//   url: "https://mainnet.sandshrew.io",
//   projectId: process.env.SANDSHREW_PROJECT_ID!,
//   network: bitcoin.networks.bitcoin,
//   version: "v2/d6aebfed1769128379aca7d215f0b689",
//   networkType: "mainnet",
// });
