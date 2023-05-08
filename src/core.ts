import { AptosTxParser } from "./aptos";
import { EthereumTxParser } from "./ethereum";
import { OsmosisTxParser } from "./osmosis";
import { SolanaTxParser } from "./solana";
import { Chain, DecodeProps, TxParserInterface } from "./types";

export class TxParser {
  private _provider: TxParserInterface;
  constructor(chain: Chain, rpc: string) {
    const parserProvider: Array<[Chain, TxParserInterface]> = [
      [Chain.Ethereum, new EthereumTxParser(rpc)],
      [Chain.Solana, new SolanaTxParser(rpc)],
      [Chain.Aptos, new AptosTxParser()],
      [Chain.Osmosis, new OsmosisTxParser()],
    ];

    const parserMap = new Map(parserProvider);
    this._provider = parserMap.get(chain);
  }

  /**
   *
   * Decode data of transaction
   * @param contractAddress The contract address is a unique address allocated when a smart contract is deployed
   * @param txData Encode data of transaction
   * @param IDL IDL || ABI (optional)
   * @returns Data decoded
   */

  decode = async (props: DecodeProps) => {
    return await this._provider.decode(props);
  };
}
