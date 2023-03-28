import { Idl } from "@coral-xyz/anchor";

export type ResultData = {
  type: string;
  name: string;
  data: string;
};

export type DecodeType = {
  name: string;
  result: ResultData[];
};

export enum Chain {
  Ethereum,
  Solana,
}

export type DecodeProps = {
  contractAddress: string;
  txData: string | Buffer;
  IDL?: Idl;
};

export interface TxParserInterface {
  decode: (props: DecodeProps) => Promise<DecodeType>;
}
