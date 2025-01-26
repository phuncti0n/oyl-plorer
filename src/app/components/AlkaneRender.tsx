import { Alkane } from "../types";

const AlkaneRender = (props: { alkane: Alkane; className?: string }) => {
  if (props.alkane?.data) {
    const hexToBase64 = (hex: string): string => {
      const bytes = new Uint8Array(
        hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
      );
      return btoa(String.fromCharCode.apply(null, Array.from(bytes)));
    };

    // Create data URL from base64
    const base64 = hexToBase64(props.alkane.data.slice(2));
    const dataUrl = `data:image/png;base64,${base64}`;
    return (
      <div
        className={
          "relative  items-center aspect-square w-full justify-center overflow-hidden bg-[#F2F0ED] p-3"
        }
      >
        <img src={dataUrl} />
      </div>
    );
  }

  return (
    <div
      className={
        "relative flex flex-col items-center aspect-square w-full justify-center overflow-hidden bg-[#F2F0ED] p-3"
      }
    >
      <div>{props.alkane.symbol}</div>
      <div>{`Name:${props.alkane.name}`}</div>
      <div>{`Supply:${props.alkane.totalSupply}`}</div>
      <div>{`Active:${props.alkane.mintActive}`}</div>
      {/* <div>{props.alkane?.minted}</div> */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(242, 240, 237, 0),rgba(242, 240, 237, 0),rgba(242, 240, 237, 1))",
        }}
      />
    </div>
  );
};

export default AlkaneRender;
