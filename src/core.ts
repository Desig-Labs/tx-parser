import { AptosTxParser } from './aptos'
import { EthereumTxParser } from './ethereum'
import { OsmosisTxParser } from './osmosis'
import { SolanaTxParser } from './solana'
import { SuiProvider } from './sui'
import { Chain, DecodeProps, HexString, TxParserInterface } from './types'

export class TxParser {
  private _provider: TxParserInterface
  constructor(chain: Chain, rpc = '', chainId?: HexString) {
    this._provider = TxParser.getProvider(chain, rpc, chainId)
  }

  static getProvider = (chain: Chain, rpc: string, chainId?: HexString) => {
    switch (chain) {
      case Chain.EVM:
        return new EthereumTxParser(rpc, chainId)
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

  decode = async (props: DecodeProps) => {
    return await this._provider.decode(props)
  }
}
