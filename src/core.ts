import memoize from 'fast-memoize'

import { AptosTxParser } from './aptos'
import { EthereumTxParser } from './ethereum'
import { OsmosisTxParser } from './osmosis'
import { SolanaTxParser } from './solana'
import { SuiProvider } from './sui'
import { Chain, DecodeProps, TxParserInterface } from './types'

export class TxParser {
  private _provider: TxParserInterface
  constructor(chain: Chain, rpc = '') {
    this._provider = TxParser.getProvider(chain, rpc)
  }

  static getProvider = (chain: Chain, rpc: string) => {
    switch (chain) {
      case Chain.EVM:
        return new EthereumTxParser(rpc)
      case Chain.Solana:
        return new SolanaTxParser(rpc)
      case Chain.Aptos:
        return new AptosTxParser(rpc)
      case Chain.Sui:
        return new SuiProvider()
      case Chain.Osmosis:
        return new OsmosisTxParser()
    }
  }

  /**
   *
   * Decode data of transaction
   * @param contractAddress The contract address is a unique address allocated when a smart contract is deployed
   * @param txData Encode data of transaction
   * @param IDL IDL || ABI (optional)
   * @returns Data decoded
   */

  private decodeTx = async (props: DecodeProps) => {
    return await this._provider.decode(props)
  }

  decode = memoize(this.decodeTx)
}
