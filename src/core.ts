import { AptosTxParser } from "./aptos";
import { EthereumTxParser } from "./ethereum";
import { OsmosisTxParser } from "./osmosis";
import { SolanaTxParser } from "./solana";
import { Chain, DecodeProps, TxParserInterface } from "./types";

const ParserProvider: Record<string, TxParserInterface> = {
  [Chain.Ethereum]: new EthereumTxParser(),
  [Chain.Solana]: new SolanaTxParser(),
  [Chain.Aptos]: new AptosTxParser(),
  [Chain.Osmosis]: new OsmosisTxParser(),
};
class TxParser {
  private _provider: TxParserInterface;
  constructor(chain: Chain) {
    this._provider = ParserProvider[chain];
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
export default TxParser;
