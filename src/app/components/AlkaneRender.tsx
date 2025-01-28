import { Alkane } from "../types";
import Link from "next/link";
import { Account, alkanes, networks, utxo } from "@oyl/sdk";
import { useState } from "react";
import toast from "react-hot-toast";
import { provider } from "../constants";

const AlkaneRender = (props: { alkane: Alkane; className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  // if (props.alkane?.data) {
  //   const hexToBase64 = (hex: string): string => {
  //     const bytes = new Uint8Array(
  //       hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  //     );
  //     return btoa(String.fromCharCode.apply(null, Array.from(bytes)));
  //   };

  //   // Create data URL from base64
  //   const base64 = hexToBase64(props.alkane.data.slice(2));
  //   const dataUrl = `data:image/png;base64,${base64}`;
  //   return (
  //     <div
  //       className={
  //         "relative  items-center aspect-square w-full justify-center overflow-hidden bg-[#F2F0ED] p-3"
  //       }
  //     >
  //       <img src={dataUrl} />
  //     </div>
  //   );
  // }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const addresses = await (window as any).oyl?.getAddresses();

    const calldata = [
      BigInt(props.alkane.id.block),
      BigInt(props.alkane.id.tx),
      BigInt(77),
    ];

    const { taproot, nativeSegwit, nestedSegwit, legacy } = addresses;

    const account: Account = {
      taproot: {
        address: taproot.address,
        pubkey: taproot.publicKey,
        pubKeyXOnly: "",
        hdPath: "",
      },
      nativeSegwit: {
        address: nativeSegwit.address,
        pubkey: nativeSegwit.publicKey,
        hdPath: "",
      },
      nestedSegwit: {
        address: nestedSegwit.address,
        pubkey: nestedSegwit.publicKey,
        hdPath: "",
      },
      legacy: {
        address: legacy.address,
        pubkey: legacy.publicKey,
        hdPath: "",
      },
      spendStrategy: {
        addressOrder: ["nativeSegwit", "nestedSegwit", "legacy", "taproot"],
        utxoSortGreatestToLeast: true,
        changeAddress: "nativeSegwit",
      },
      network: networks.regtest,
    };

    const { accountSpendableTotalUtxos, accountSpendableTotalBalance } =
      await utxo.accountUtxos({
        account,
        provider,
      });

    const { psbtHex } = await alkanes.createExecutePsbt({
      calldata,
      gatheredUtxos: {
        utxos: accountSpendableTotalUtxos,
        totalAmount: accountSpendableTotalBalance,
      },
      feeRate: 6,
      account,
      provider,
    });

    console.log(
      await (window as any).oyl.signPsbt({
        psbt: psbtHex,
        finalize: true,
        broadcast: true,
      })
    );

    setIsLoading(false);

    toast.success("Transaction broadcasted!");
  };

  return (
    <div className="relative flex flex-row items-center w-full overflow-hidden bg-[#F2F0ED] p-2">
      <div className="grid grid-cols-7 w-full items-center">
        {/* Symbol */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Symbol:</span>
          {props.alkane.symbol}
        </div>

        {/* Name */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Name:</span>
          {props.alkane.name}
        </div>

        {/* Supply */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Supply:</span>
          {formatNumber(props.alkane.totalSupply)}
        </div>

        {/* Active Status */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Active:</span>
          {props.alkane.mintActive ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-red-500">No</span>
          )}
        </div>

        {/* Minted Amount */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Minted:</span>
          {formatNumber(props.alkane?.minted || 0)}
        </div>

        <div className="text-left">
          <span className="text-gray-500 mr-1">Id:</span>
          <span className="underline">
            <Link
              href={`/alkane/${
                props.alkane.id.block + "_" + props.alkane.id.tx
              }`}
            >
              {props.alkane.id.block}:{props.alkane.id.tx}
            </Link>
          </span>
        </div>

        <button
          //disabled={props.alkane.mintActive || isLoading}
          className="rounded-sm bg-black p-2 pointer"
          onClick={(e) => handleSubmit(e)}
        >
          <span className="text-white">Mint!</span>
        </button>
      </div>
    </div>
  );
};

export default AlkaneRender;
