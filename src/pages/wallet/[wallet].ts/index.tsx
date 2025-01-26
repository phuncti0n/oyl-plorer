import { useState, useEffect } from "react";
import {
  fetchProtoRunesByWallet,
  fetchRunesByWallet,
  fetchUtxos,
} from "@/app/utils";
import { AssetSquare } from "@/app/components/AssetSquare";
import Header from "@/app/components/Header";
import TreemapComponent from "@/app/components/Treemap";
import Filter from "@/app/components/Filter";
import { useRouter } from "next/router";

const Wallet = () => {
  const [runes, setRunes] = useState<{ balanceSheet: any } | null>(null);
  const [protorunes, setProtoRunes] = useState<{ balanceSheet: any } | null>(
    null
  );
  const [utxos, setUtxos] = useState(null);
  const [checked, setChecked] = useState<string[]>([]);

  const params = useRouter(); // Assuming useParams is replaced by Next.js routing, like `useRouter`

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedRunes = await fetchRunesByWallet(params.address);
  //     const fetchedProtoRunes = await fetchProtoRunesByWallet(params.address);
  //     const fetchedUtxos = await fetchUtxos(params.address);

  //     setRunes(fetchedRunes);
  //     setProtoRunes(fetchedProtoRunes);
  //     setUtxos(fetchedUtxos);
  //   };

  //   fetchData();
  // }, [params.address]);

  const allAssets = () => {
    if (!runes || !protorunes) return [];
    return [
      ...(runes?.balanceSheet || []),
      ...(protorunes?.balanceSheet || []),
    ];
  };

  return (
    <div className="p-[15px]">
      <Header />
      {utxos ? <TreemapComponent data={utxos} /> : <div>Loading UTXOs...</div>}

      <div className="flex flex-row">
        <Filter checked={checked} setChecked={setChecked} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {allAssets().map((asset: any, index: number) => {
            return <AssetSquare key={index} asset={asset} index={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
