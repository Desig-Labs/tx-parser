import { Idl } from "@coral-xyz/anchor";
import { TxnBuilderTypes } from "aptos";

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
  Aptos,
}

export type DecodeProps = {
  contractAddress: string;
  txData: string | Buffer | TxnBuilderTypes.RawTransaction;
  IDL?: Idl;
};

export interface TxParserInterface {
  decode: (props: DecodeProps) => Promise<DecodeType>;
}
