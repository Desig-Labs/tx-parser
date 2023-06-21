import { AptosClient, Types, BCS, HexString, TxnBuilderTypes } from 'aptos'
import { DecodeProps, DecodeType, InputData, TxParserInterface } from '../types'

const { RawTransaction } = TxnBuilderTypes
const { Deserializer } = BCS

const MODULE_TRANSFER =
  '0x0000000000000000000000000000000000000000000000000000000000000001'
export class AptosTxParser implements TxParserInterface {
  client: AptosClient
  constructor(rpc: string) {
    this.client = new AptosClient(rpc)
  }

  private fetchABI = async (addr: string) => {
    const modules = await this.client.getAccountModules(addr)
    const abis = modules
      .map((module) => module.abi)
      .flatMap((abi) =>
        abi!.exposed_functions
          .filter((ef) => ef.is_entry)
          .map(
            (ef) =>
              ({
                fullName: `${abi!.address}::${abi!.name}::${ef.name}`,
                ...ef,
              } as Types.MoveFunction & { fullName: string }),
          ),
      )

    const abiMap = new Map<string, Types.MoveFunction & { fullName: string }>()
    abis.forEach((abi) => {
      abiMap.set(abi.fullName, abi)
    })

    return abiMap
  }

  private decodeDataByType = (data: Uint8Array, type: string): string => {
    const { Deserializer } = BCS
    const deserializer = new Deserializer(data)
    switch (type) {
      case 'u8':
        return deserializer.deserializeU8().toString()
      case 'u16':
        return deserializer.deserializeU16().toString()
      case 'u32':
        return deserializer.deserializeU32().toString()
      case 'u64':
        return deserializer.deserializeU64().toString()
      case 'u128':
        return deserializer.deserializeU128().toString()
      case 'u256':
        return deserializer.deserializeU256().toString()
      case 'bool':
        return String(deserializer.deserializeBool())
      case 'address':
        return HexString.fromUint8Array(data).toString()
      case '&signer':
        return HexString.fromUint8Array(data).toString()
    }
    return ''
  }

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData } = props
    if (!(txData instanceof Uint8Array))
      throw new Error('Tx Data must Uint8Array')
    const module = contractAddress === MODULE_TRANSFER ? '0x1' : contractAddress
    const abis = await this.fetchABI(module)

    const rawTx = RawTransaction.deserialize(new Deserializer(txData))
    const payload: any = rawTx.payload
    const value = payload.value
    const functionName = `${module}::${value.module_name.name.value}::${value.function_name.value}`
    const abiPayload = abis.get(functionName)
    if (!abiPayload) throw new Error('Function not exist in the contract!')

    const result: InputData[] = []
    if (abiPayload.params.includes('&signer'))
      result.push({
        data: rawTx.sender.toHexString().toString(),
        name: 'sender',
        type: '&signer',
      })
    const params = abiPayload.params.filter((par) => par !== '&signer')
    const args = value.args
    for (let i = 0; i < params.length; i++) {
      result.push({
        data: this.decodeDataByType(args[i], params[i]),
        name: params[i],
        type: params[i],
      })
    }

    return { name: value.function_name.value, inputs: result }
  }
}
