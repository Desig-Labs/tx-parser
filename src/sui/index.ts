import { TransactionBlock, builder, getTransactionType } from '@mysten/sui.js'
import { DecodeProps, DecodeType, TxParserInterface } from '../types'

export class SuiProvider implements TxParserInterface {
  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData } = props
    const tx = TransactionBlock.from(txData)
    console.log(tx.blockData.inputs)
    console.log(tx.blockData.transactions)

    return { name: '', inputs: [] }
  }
}
