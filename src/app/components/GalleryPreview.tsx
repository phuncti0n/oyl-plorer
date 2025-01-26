"use client";
import { useEffect } from "react";

import { useAlkanesQuery } from "../hooks/useAlkanes";
import AlkaneCard from "./AlkaneCard";

const GalleryPreview = () => {
  const { data, error, isLoading } = useAlkanesQuery(5);

  console.log(data, error, isLoading);

  useEffect(() => {
    if (data?.length) {
    }
  }, [data]);

  if (error) return <span>Something went wrong ʕ•̠͡•ʔ</span>;

  const previews = data ? data : Array(12).fill(null); // skeleton values

  return (
    <>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
        {previews.slice(0, 12).map((i, index) => (
          <AlkaneCard key={index} alkane={i} />
        ))}
      </div>
    </>
  );
};

export default GalleryPreview;
