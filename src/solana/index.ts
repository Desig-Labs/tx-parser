import { BorshCoder, translateAddress, web3 } from '@coral-xyz/anchor'
import {
  decodeIdlAccount,
  Idl,
  idlAddress,
} from '@coral-xyz/anchor/dist/cjs/idl'
import { inflate } from 'pako'
import { bs58, utf8 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { TxnBuilderTypes } from 'aptos'

import { DecodeProps, DecodeType, InputData, TxParserInterface } from '../types'
import { getDataType } from './utils'
import { decodeSystemInstruction } from './systemParser'
import {
  decodeAssociatedTokenInstruction,
  decodeTokenInstruction,
} from './splTokenParser'

export class SolanaTxParser implements TxParserInterface {
  rpc: string
  constructor(rpc: string) {
    this.rpc = rpc
  }

  private getProvider = async ({
    programId,
    IDL,
  }: {
    programId: string
    IDL?: Idl
  }) => {
    if (IDL) return new BorshCoder(IDL)

    const pubProgramId = translateAddress(programId)
    const idlAddr = await idlAddress(pubProgramId)
    const connection = new web3.Connection(this.rpc)
    const idlAccountInfo = await connection.getAccountInfo(idlAddr)
    if (!idlAccountInfo) return null

    const idlAccount = decodeIdlAccount(idlAccountInfo.data.slice(8)) // chop off discriminator
    const inflatedIdl = inflate(idlAccount.data)
    const idlJson: Idl = JSON.parse(utf8.decode(inflatedIdl))
    return new BorshCoder(idlJson)
  }

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress: programId, txData, IDL } = props

    /** System program */
    if (programId === web3.SystemProgram.programId.toBase58()) {
      const data =
        txData instanceof Buffer ? txData : bs58.decode(txData.toString())
      return decodeSystemInstruction(data)
    }
    /** SPL Token program */
    if (programId === TOKEN_PROGRAM_ID.toBase58()) {
      const data =
        txData instanceof Buffer ? txData : bs58.decode(txData.toString())
      return decodeTokenInstruction(data)
    }
    /** SPL Associated Token program */
    if (programId === ASSOCIATED_TOKEN_PROGRAM_ID.toBase58()) {
      return decodeAssociatedTokenInstruction()
    }

    const coder = await this.getProvider({ programId, IDL })
    if (!coder)
      throw new Error(
        `Not found IDL from programID:${programId}, please add IDL or upload to explorer`,
      )
    let data = txData
    const result: Array<InputData> = []

    if (txData instanceof Buffer) data = bs58.encode(txData)
    const decodedData: any = coder.instruction.decode(data.toString(), 'base58')
    if (!decodedData) throw new Error("Can't parse this transaction")
    // Format data
    for (const key in decodedData.data)
      result.push({
        data: decodedData.data[key],
        name: key,
        type: getDataType(decodedData.data[key]),
      })

    return { name: decodedData.name, inputs: result }
  }
}
