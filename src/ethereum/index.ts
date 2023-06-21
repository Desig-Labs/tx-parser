import memoize from 'fast-memoize'
import axios from 'axios'
import Web3 from 'web3'
import { Interface, Result } from 'ethers'

import { DecodeType, DecodeProps, InputData, TxParserInterface } from '../types'

const END_INDEX_SELECTOR = 10

const getABI = async (api: string, contractAddress: string) => {
  const res = await axios.get(
    `${api}/api?module=contract&action=getabi&address=${contractAddress}`,
  )
  return res.data.result
}

export class EthereumTxParser implements TxParserInterface {
  rpc: string
  constructor(rpc: string) {
    this.rpc = rpc
  }

  static getABI = memoize(getABI)

  private getEtherscanApi = () => {
    if (this.rpc.includes('mainnet.infura.io'))
      return 'https://api.etherscan.io'
    if (this.rpc.includes('goerli.infura.io'))
      return 'https://api-goerli.etherscan.io'
    if (this.rpc.includes('sepolia.infura.io'))
      return 'https://api-sepolia.etherscan.io'
  }

  private formatData = (fragmentData: any, decodeData: Result) => {
    const result: Array<InputData> = []
    const inputs = fragmentData.inputs

    for (let i = 0; i < decodeData.length; i++) {
      const components = inputs[i].components

      if (!components) {
        result.push({
          type: inputs[i].type,
          name: inputs[i].name,
          data: decodeData[i].toString(),
        })
        continue
      }
      // Format with parameters
      for (let j = 0; j < components.length; j++) {
        result.push({
          type: components[j].type,
          name: `${inputs[i].name}.${components[j].name}`,
          data: decodeData[i][j].toString(),
        })
      }
    }
    return result
  }

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData } = props
    const web3 = new Web3(this.rpc)
    const code = await web3.eth.getCode(contractAddress)
    if (code === '0x') return { name: 'Transfer', inputs: [] }

    const etherAPI = this.getEtherscanApi()
    const jsonABI = await EthereumTxParser.getABI(etherAPI, contractAddress)
    if (jsonABI === 'Contract source code not verified')
      throw new Error('Contract source code not verified')

    const contractABI = JSON.parse(jsonABI)
    const itf = Interface.from(contractABI)
    const fragments = itf.fragments
    const name = itf.getFunctionName(
      txData.toString().slice(0, END_INDEX_SELECTOR),
    )
    const decodeData = itf.decodeFunctionData(name, txData)

    let result: InputData[] = []
    for (const fragment of fragments) {
      if (fragment.type !== 'function') continue
      const fragmentData = JSON.parse(fragment.format('json'))
      if (fragmentData.name === name) {
        result = this.formatData(fragmentData, decodeData)
        break
      }
    }
    return { name, inputs: result }
  }
}
