"use client";
import { useEffect } from "react";

import { useAlkanesQuery } from "../hooks/useAlkanes";
import AlkaneCard from "./AlkaneCard";

const GalleryPreview = () => {
  const { data, error, isLoading } = useAlkanesQuery(15);

  useEffect(() => {
    if (data?.length) {
    }
  }, [data]);

  if (error) return <span>Something went wrong ʕ•̠͡•ʔ</span>;

  const previews = data ? data : Array(12).fill(null);

  return (
    <>
      <div className="flex flex-col rounded-md border sm:p-2 ">
        {previews.slice(0, 12).map((i, index) => (
          <AlkaneCard key={index} alkane={i} />
        ))}
      </div>
    </>
  );
};

export default GalleryPreview;
