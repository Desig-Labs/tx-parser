import { Idl } from '@coral-xyz/anchor'

export type InputData = {
  type: string
  name: string
  data: any
}

export type DecodeType = {
  name: string
  inputs: InputData[]
}

export enum Chain {
  EVM,
  Solana,
  Aptos,
  Osmosis,
  Sui,
}

export type DecodeProps = {
  contractAddress: string
  txData: string | Buffer | Uint8Array
  IDL?: Idl
}

export interface TxParserInterface {
  decode: (props: DecodeProps) => Promise<DecodeType>
}
