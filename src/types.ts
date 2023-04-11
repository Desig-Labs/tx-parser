import { Idl } from "@coral-xyz/anchor";
import { TxnBuilderTypes } from "aptos";

export type InputData = {
  type: string;
  name: string;
  data: any;
};

export type DecodeType = {
  name: string;
  inputs: InputData[];
};

export enum Chain {
  Ethereum,
  Solana,
  Aptos,
  Osmosis,
}

export type DecodeProps = {
  contractAddress: string;
  txData: string | Buffer | TxnBuilderTypes.RawTransaction | Uint8Array;
  IDL?: Idl;
};

export interface TxParserInterface {
  decode: (props: DecodeProps) => Promise<DecodeType>;
}
