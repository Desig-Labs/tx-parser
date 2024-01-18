import { TransactionBlock, builder, getTransactionType } from '@mysten/sui.js'
import { DecodeProps, DecodeType, TxParserInterface } from '../types'

export class SuiProvider implements TxParserInterface {
  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData } = props
    let address = contractAddress
    const tx = TransactionBlock.from(txData)
    const mainTx: any = tx.blockData.transactions.find(
      (tx: any) => !!tx?.target,
    )
    if (mainTx) address = mainTx.target
    const [, , name] = address.split('::')
    return { name, inputs: [] }
  }
}
