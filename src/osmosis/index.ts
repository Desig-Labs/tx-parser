import { GeneratedType } from '@cosmjs/proto-signing'
import { osmosisProtoRegistry } from 'osmojs'
import { DecodeProps, DecodeType, InputData, TxParserInterface } from '../types'

export class OsmosisTxParser implements TxParserInterface {
  private getMsg = (typeUrl: string): GeneratedType | null => {
    const INDEX_TYPE_URL = 0
    const INDEX_GENERATED_TYPE = 1
    let msg: GeneratedType | null = null

    for (const registry of osmosisProtoRegistry) {
      if (registry[INDEX_TYPE_URL] === typeUrl) {
        msg = registry[INDEX_GENERATED_TYPE]
        break
      }
    }

    return msg
  }

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    if (!(props.txData instanceof Uint8Array))
      throw new Error('Tx Data must Uint8Array')

    const msg = this.getMsg(props.contractAddress)
    if (!msg) throw new Error('Not found type url!')

    const result: DecodeType = {
      name: props.contractAddress,
      inputs: [],
    }

    const decodedData = msg.decode(new Uint8Array(props.txData))
    // Format data
    const inputs: InputData[] = []
    for (const key in decodedData)
      inputs.push({
        data: decodedData[key],
        name: key,
        type: typeof decodedData[key],
      })

    result.inputs = inputs
    return result
  }
}
