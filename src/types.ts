import { Idl } from "@project-serum/anchor";

export type DecodeType = {
  type: string;
  name: string;
  data: string;
};

export enum Chain {
  Ethereum,
  Solana,
}

export interface TxParserInterface {
  decode: (props: {
    contractAddress: string;
    txData: string;
    IDL?: Idl;
  }) => Promise<any>;
}
