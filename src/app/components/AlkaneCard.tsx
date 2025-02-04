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
      <div className="space-y-2 md:space-y-3 md:p-3 lg:space-y-5 lg:p-5">
        <div className="rounded-[4px]" />
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
    <div className="w-full rounded-[4px] space-y-2 p-2">
      <AlkaneRender
        alkane={alkane}
        className="pointer-events-none sm:pointer-events-auto"
      />
    </div>
  );
};

export default AlkaneCard;
