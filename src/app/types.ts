export interface Alkane {
  id: { block: string; tx: string };
  name: string;
  mintActive: boolean;
  symbol: string;
  percentageMinted: number;
  minted: number;
  totalSupply: number;
  data?: string;
}
