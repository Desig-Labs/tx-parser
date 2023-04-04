import { AptosTxParser } from "./aptos";
import { EthereumTxParser } from "./ethereum";
import { SolanaTxParser } from "./solana";
import { Chain, DecodeProps, TxParserInterface } from "./types";

const ParserProvider: Record<string, TxParserInterface> = {
  [Chain.Ethereum]: new EthereumTxParser(),
  [Chain.Solana]: new SolanaTxParser(),
  [Chain.Aptos]: new AptosTxParser(),
};
class TxParser {
  private _provider: TxParserInterface;
  constructor(chain: Chain) {
    this._provider = ParserProvider[chain];
  }

  decode = async (props: DecodeProps) => {
    return await this._provider.decode(props);
  };
}
export default TxParser;
