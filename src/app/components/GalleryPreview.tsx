"use client";
import { useEffect } from "react";
import { useAlkanesQuery } from "../hooks/useAlkanes";
import AlkaneCard from "./AlkaneCard";
import { useConfigStore } from "../store/useConfigStore";

const GalleryPreview = () => {
  const currentProvider = useConfigStore((state) => state.currentProvider);
  const { data, error, isLoading, refetch } = useAlkanesQuery(
    5,
    currentProvider.provider
  );

  useEffect(() => {
    refetch();
  }, [currentProvider, refetch]);

  if (error) return <span>Something went wrong ʕ•̠͡•ʔ</span>;

  if (isLoading)
    return (
      <div className="flex flex-row justify-center items-center w-full h-[700px] text-6xl">
        Loading...
      </div>
    );

  const previews = data ? data : Array(12).fill(null);

  return (
    <>
      <div className="flex flex-col h-[700px] overflow-y-auto rounded-md border sm:p-2">
        {previews.slice(0, 12).map((i, index) => (
          <AlkaneCard key={index} alkane={i} />
        ))}
      </div>
    </>
  );
};

export default GalleryPreview;
