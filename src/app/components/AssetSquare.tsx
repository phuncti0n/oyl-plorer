import { getTxHash } from "../utils";

export const AssetSquare = (props: any) => {
  const rune = props?.asset.rune;
  const balance = props?.asset.balance;
  return (
    <div className="border border-black rounded-lg flex flex-col justify-start items-center p-[15px]">
      {/* Square inside the rectangle */}
      <div className="bg-stone-400 w-full aspect-square flex justify-center items-center flex-col">
        <span>{"Name: " + rune.name}</span>
        <span>{"Divisibility: " + rune.divisibility}</span>
        <span>{"Spacers: " + rune.spacers}</span>
        <span>{"Symbol: " + "\uf916"}</span>
      </div>
      <div className="flex flex-row justify-between w-full">
        <span className="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Rune Id: " + rune.id}
        </span>
        <span className="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Balance:" + Number(balance)}
        </span>
      </div>
    </div>
  );
};

export const BlockAssetSquare = (props: any) => {
  const rune = props?.asset;
  const nav = props.nav;
  const blockHeight = rune.runeId.split(":")[0];
  const txIndex = rune.runeId.split(":")[1];

  return (
    <div
      onClick={async () => {
        const txId = await getTxHash(blockHeight, txIndex);
        nav(`/txn/${txId}`);
      }}
      className="cursor-pointer border border-black rounded-lg flex flex-col justify-start items-center p-[15px]"
    >
      {/* Square inside the rectangle */}
      <div className="bg-stone-400 w-full aspect-square flex justify-center items-center flex-col">
        <span>{"Name: " + rune.name}</span>
        <span>{"Divisibility: " + rune.divisibility}</span>
        <span>{"Spacers: " + rune.spacers}</span>
        <span>{"Symbol: " + rune.symbol}</span>
      </div>
      <div className="flex flex-row justify-between w-full">
        <span className="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Block: " + blockHeight}
        </span>
        <span className="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Tx #: " + txIndex}
        </span>
      </div>
    </div>
  );
};
