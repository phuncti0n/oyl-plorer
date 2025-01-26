import { getRuneForOutpoint, getTxDetails } from "@/app/utils";
import Header from "../../../app/components/Header";
import * as bitcoin from "bitcoinjs-lib";
const Txn = () => {
  // const params = useParams();
  // const [tx] = createResource(() => getTxDetails(params.txId));
  // const [expanded, setExpanded] = createSignal<boolean>(false);

  return (
    <></>
    //<div className="p-[15px]">
    //   <Header />
    //   <div className="w-[80vw] mx-auto">
    //     {tx() && (
    //       <div className="space-y-5">
    //         <div className="flex flex-row justify-between items-center border-b-[2px] pb-2 border-black">
    //           <span className="font-bold text-[24px]">Transaction</span>
    //           <span>
    //             <a className="pl-3 underline" href={`/txn/${tx().txid}`}>
    //               {tx().txid}
    //             </a>
    //             <span className="pl-2">copy</span>
    //           </span>

    //           <span
    //             className={`${
    //               tx().status.confirmed ? "bg-green-500" : "bg-red-500"
    //             } + rounded-md p-2 text-[14px] text-white`}
    //           >
    //             {tx().status.confirmed ? "Confirmed" : "Unconfirmed"}
    //           </span>
    //         </div>
    //         <span className="w-[80vw]" />
    //         <span className="flex flex-row justify-between border-b-[2px] border-dashed pb-2 ">
    //           <span className="font-bold text-[24px] ">Inputs & Outputs</span>
    //           <button
    //             onClick={() => setExpanded(!expanded())}
    //             className="rounded-md p-2 text-[14px] border"
    //           >
    //             Details
    //           </button>
    //         </span>

    //         <div className="flex flex-row justify-between space-x-6 p-4 bg-gray-100 rounded-md">
    //           <div className="flex flex-col space-y-5 w-1/2">
    //             {tx().vin.map((input: any, index: number) => {
    //               const addressEllided = () => {
    //                 const address = input.prevout.scriptpubkey_address;

    //                 const firstHalf = address.slice(0, address.length / 3);
    //                 const lastSix = address.slice(-6); // Get the last 6 characters
    //                 return "<- " + firstHalf + "..." + lastSix; // Add ellipsis to indicate omission
    //               };

    //               return (
    //                 <>
    //                   <div className="flex flex-row justify-between items-center">
    //                     <span className="text-[14px] underline">
    //                       {addressEllided()}
    //                     </span>
    //                     <span className="text-green-500">
    //                       {input.prevout.value / 10 ** 8 + " BTC"}
    //                     </span>
    //                   </div>
    //                   {expanded() && (
    //                     <span className="flex flex-row justify-between">
    //                       <span>Previous output type:</span>
    //                       <span>{input.prevout.scriptpubkey_type}</span>
    //                     </span>
    //                   )}
    //                 </>
    //               );
    //             })}
    //           </div>

    //           <div className="flex flex-col space-y-5 w-1/2">
    //             {tx().vout.map((input: any, index: number) => {
    //               const addressEllided = () => {
    //                 if (String(input.scriptpubkey).startsWith("6a5d")) {
    //                   return "OP_RETURN";
    //                 }
    //                 const address = input.scriptpubkey_address;

    //                 const firstHalf = address.slice(0, address.length / 3);
    //                 const lastSix = address.slice(-6); // Get the last 6 characters
    //                 return "-> " + firstHalf + "..." + lastSix; // Add ellipsis to indicate omission
    //               };

    //               return (
    //                 <>
    //                   <div className="flex flex-row justify-between items-center">
    //                     <span className="text-[14px] underline cursor-pointer">
    //                       {addressEllided()}
    //                     </span>
    //                     <span className="text-red-500">
    //                       {input.value / 10 ** 8 + " BTC"}
    //                     </span>
    //                   </div>
    //                   {expanded() && (
    //                     <span className="flex flex-row justify-between">
    //                       <span>Type:</span>
    //                       <span>{input.scriptpubkey_type}</span>
    //                     </span>
    //                   )}
    //                 </>
    //               );
    //             })}
    //           </div>
    //         </div>
    //         <div className="border-b-[2px] border-dashed pb-2">
    //           <span className="font-bold text-[24px] ">Runes</span>
    //           {/* {tx().vout.map(async (input: any, index: number) => {
    //             const rune = await getRuneForOutpoint({
    //               outpoint: tx().txid + index,
    //             });
    //             return AssetSquare({ rune });
    //           })} */}
    //         </div>
    //         <div className="border-b-[2px] border-dashed pb-2">
    //           <span className="font-bold text-[24px] ">Protorunes</span>
    //         </div>
    //         <div className="border-b-[2px] border-dashed pb-2">
    //           <span className="font-bold text-[24px] ">Alkanes</span>
    //         </div>
    //         <div className="border-b-[2px] border-dashed pb-2">
    //           <span className="font-bold text-[24px] ">Details</span>
    //         </div>
    //         <div className="flex flex-col space-y-3">
    //           <span>{"Size: " + tx().size} </span>
    //           <span> {"Weight: " + tx().weight} </span>
    //           <span> {"Version: " + tx().version} </span>
    //           <span>{"Fee: " + tx().fee} </span>
    //           <span>
    //             {" "}
    //             {"Fee Rate: " +
    //               (tx().weight / tx().fee).toFixed(2) +
    //               " sats/vB"}
    //           </span>
    //           <span>
    //             {"Timestamp: " + new Date(tx().status.block_time * 1000)}
    //           </span>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    //</div>
  );
};

export default Txn;
