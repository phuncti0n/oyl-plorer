import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../utils";

import { Alkane } from "../types";
import AlkaneRender from "./AlkaneRender";

const AlkaneCard = ({
  alkane,
  light = false,
}: {
  alkane?: Alkane;
  light?: boolean;
}) => {
  if (!alkane?.id)
    return (
      // make the grid take up the maximal space, even when a grid item is empty
      // todo: double-check skeleton styles are the same as the real ones
      <div className="space-y-2 rounded-md border sm:p-2 md:space-y-3 md:p-3 lg:space-y-5 lg:p-5">
        <div className="aspect-square rounded-[4px]" />
        <div
          className={cn(
            "hidden rounded-[4px] px-1 text-sm opacity-0 sm:inline-block md:px-2 md:py-1",
            light && "border"
          )}
        >
          {/* placeholder */}
          #123
        </div>
      </div>
    );

  return (
    <Link
      href={`/alkane/${alkane.id.block + ":" + alkane.id.tx}`}
      className="space-y-2 rounded-md border sm:p-2 md:space-y-3 md:p-3 lg:space-y-5 lg:p-5"
    >
      <div className="aspect-square w-full overflow-hidden rounded-[4px]">
        <AlkaneRender
          alkane={alkane}
          className="pointer-events-none sm:pointer-events-auto"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "hidden rounded-[4px] bg-black px-1 text-sm text-white sm:inline-block md:px-2 md:py-1",
          light && "border bg-white text-neutral-300"
        )}
      >
        #{alkane.id.block + ":" + alkane.id.tx}
      </motion.div>
    </Link>
  );
};

export default AlkaneCard;
