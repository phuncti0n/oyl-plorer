import { Alkane } from "../types";
import Link from "next/link";
import { Account, alkanes, networks, utxo } from "@oyl/sdk";
import { useState } from "react";
import toast from "react-hot-toast";
import { provider } from "../constants";

const AlkaneRender = (props: { alkane: Alkane; className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const RenderImage = () => {
    const hexToBase64 = (hex: string): string => {
      const bytes = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );
      return btoa(String.fromCharCode.apply(null, Array.from(bytes)));
    };

    // Create data URL from base64
    const base64 = hexToBase64(props.alkane.data!.slice(2));
    const dataUrl = `data:image/png;base64,${base64}`;

    return (
      <>
        {/* Small Image Preview */}
        <div
          className="relative items-center aspect-square w-[75px] justify-center overflow-hidden bg-[#F2F0ED] p-3 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={dataUrl} className="w-full h-full object-cover" />
        </div>

        {/* Modal for Enlarged Image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative max-w-[90%] max-h-[90%] p-2 bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking the image
            >
              <img
                src={dataUrl}
                className="w-[300px] h-[300px] object-contain rounded-md"
              />
            </div>
          </div>
        )}
      </>
    );
  };

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
    <div className="relative flex flex-row h-[75px] items-center w-full bg-[#F2F0ED] p-2 my-2">
      <div
        className={
          props.alkane.data
            ? "grid grid-cols-9 w-full items-center"
            : "grid grid-cols-8 w-full items-center"
        }
      >
        {props.alkane.data && (
          <>
            <RenderImage />
          </>
        )}
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

        {/* Cap */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Cap:</span>
          {formatNumber(props.alkane?.cap || 0)}
        </div>

        {/* Active Status */}
        <div className="text-left">
          <span className="text-gray-500 mr-1">Active:</span>
          {props.alkane.mintActive ||
          props.alkane.id.block + ":" + props.alkane.id.tx === "2:0" ? (
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
          {props.alkane.id.block}:{props.alkane.id.tx}
        </div>

        <button
          //disabled={props.alkane.mintActive || isLoading}
          className="rounded-sm bg-black p-2 pointer w-[100px]"
          onClick={(e) => handleSubmit(e)}
        >
          <span className="text-white">Mint!</span>
        </button>
      </div>
    </div>
  );
};

export default AlkaneRender;
