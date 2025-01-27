import IconEye from "./icons/IconEye";
import IconFlame from "./icons/IconFlame";
import IconSparkle from "./icons/IconSparkle";
import IconUnicorn from "./icons/IconUnicorn";

const satRarityMap = {
  1: [1, "bg-neutral-0"],
  2: [2, "bg-neutral-0"],
  3: [3, "bg-gold", IconSparkle],
  4: [4, "bg-pink", IconFlame],
  5: [5, "bg-mint", IconEye],
  6: [6, "bg-sky-200", IconUnicorn],
} as Record<
  string,
  [number, string] | [number, string, React.FC<{ className?: string }>]
>;

const RarityTag = (props: { rarity: number }) => {
  const [dots, bgColor, Icon] = satRarityMap[props.rarity];
  // todo: maybe add tooltip with all descriptions, or current description, or link to more information
  return (
    <div className="flex h-[34px] cursor-default items-center space-x-1">
      {Icon && (
        <div
          className={`flex aspect-square items-center justify-center self-stretch rounded-[3px] ${bgColor}`}
        >
          <Icon className="scale-[1.2]" />
        </div>
      )}
      <div className={`inline-flex rounded-[5px] p-[2px] ${bgColor}`}>
        <div className="inline-flex space-x-[8px] rounded-[3px] bg-neutral-0 px-[9px] py-[5px] uppercase">
          <span>{props.rarity}</span>
          <RarityDots dots={dots} />
        </div>
      </div>
    </div>
  );
};

const RarityDots = ({ dots }: { dots: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="inline-block h-2 w-2 rounded-full bg-black" />
      ))}
      {Array.from({ length: 6 - dots }, (_, i) => (
        <div
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-neutral-200"
        />
      ))}
    </div>
  );
};

export default RarityTag;
