import { EthereumTxParser } from "./ethereum";
import { SolanaTxParser } from "./solana";
import { Chain, TxParserInterface } from "./types";

const ParserProvider: Record<string, TxParserInterface> = {
  [Chain.Ethereum]: new EthereumTxParser(),
  [Chain.Solana]: new SolanaTxParser(),
};
class TxParser {
  private _provider: TxParserInterface;
  constructor(chain: Chain) {
    this._provider = ParserProvider[chain];
  }
}
export default TxParser;
