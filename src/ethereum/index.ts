import memoize from 'fast-memoize'
import axios from 'axios'
import Web3 from 'web3'
import { Contract, Interface, JsonRpcProvider, Result } from 'ethers'

import {
  DecodeType,
  DecodeProps,
  InputData,
  TxParserInterface,
  HexString,
} from '../types'
import { ERC20_ABI } from './erc20.abi'

const END_INDEX_SELECTOR = 10

const API_SCAN: Record<HexString, string> = {
  '0x1': 'https://api.etherscan.io',
  '0x5': 'https://api-goerli.etherscan.io',
  '0xaa36a7': 'https://api-sepolia.etherscan.io',
  '0x38': 'https://api.bscscan.com',
  '0x61': 'https://api.testnet.bscscan.com',
  '0xe708': 'https://api.lineascan.build',
  '0xe704': 'https://rpc.goerli.linea.build',
  '0x44d': 'https://api-zkevm.polygonscan.com',
  '0x5a2': 'https://api-testnet-zkevm.polygonscan.com',
  '0x504': 'https://api-moonbeam.moonscan.io',
  '0x507': 'https://api-moonbase.moonscan.io',
}

const isErc20Token = async (address: string, rpc: string) => {
  try {
    const provider = new JsonRpcProvider(rpc)
    const contract = new Contract(address, ERC20_ABI, provider)
    await contract.totalSupply()
    const decimals = await contract.decimals()
    return { valid: true, decimals: Number(decimals.toString()) }
  } catch (error) {
    return { valid: false, decimals: 0 }
  }
}

const getABI = async (api: string, contractAddress: string) => {
  const res = await axios.get(
    `${api}/api?module=contract&action=getabi&address=${contractAddress}`,
  )
  return res.data.result
}

export class EthereumTxParser implements TxParserInterface {
  rpc: string
  chainId?: HexString
  constructor(rpc: string, chainId?: HexString) {
    this.rpc = rpc
    this.chainId = chainId
  }

  static getABI = memoize(getABI)

  private getEtherscanApi = () => {
    const chainId = this.chainId ? this.chainId : '0x1'
    return API_SCAN[chainId] || ''
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

    let contractABI
    const isErc20 = await isErc20Token(contractAddress, this.rpc)
    if (isErc20.valid) contractABI = ERC20_ABI
    else {
      const etherAPI = this.getEtherscanApi()
      if (!etherAPI) return { name: '', inputs: [] }
      const jsonABI = await EthereumTxParser.getABI(etherAPI, contractAddress)
      if (jsonABI === 'Contract source code not verified')
        throw new Error('Contract source code not verified')
      contractABI = JSON.parse(jsonABI)
    }

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
