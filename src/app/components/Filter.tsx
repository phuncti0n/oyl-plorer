interface FilterProps {
  checked: string[];
  setChecked: (value: string[]) => void;
}

const Filter = (props: FilterProps) => {
  const { checked, setChecked } = props;
  const assetTypes = ["Runes", "Protorunes", "Alkanes"];
  return (
    <div className="p-[15px] w-[15%]">
      <h1 className="text-left mb-[10px]">Filter</h1>
      <ul className="flex flex-col items-start">
        {assetTypes.map((type: string, index: number) => {
          return (
            <div key={index} className="flex items-center cursor-pointer">
              {/* <span
                onClick={() => {
                  const isChecked = checked().includes(type);
                  if (isChecked)
                    setChecked([...checked()].filter((type) => type !== type));
                  else setChecked([...checked(), type]);
                }}
              >
                [ <span>{checked().includes(type) ? "X" : ""}</span> ] {type}
              </span> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
