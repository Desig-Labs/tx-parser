import { web3, BN, SystemProgram as SystemProgramIdl } from '@coral-xyz/anchor'
import { Keypair, SystemProgram, TransactionInstruction } from '@solana/web3.js'

import { ParsedIdlInstruction } from './interface'
import { DecodeType, InputData } from '../types'
import { getDataType } from './utils'

export function decodeSystemInstruction(txData: Buffer): DecodeType {
  const dummyInstruction: TransactionInstruction = {
    data: txData,
    keys: [
      Keypair.generate().publicKey,
      Keypair.generate().publicKey,
      Keypair.generate().publicKey,
      Keypair.generate().publicKey,
      Keypair.generate().publicKey,
    ] as any,
    programId: SystemProgram.programId,
  }
  const ixType = web3.SystemInstruction.decodeInstructionType(dummyInstruction)
  let parsed: ParsedIdlInstruction<SystemProgramIdl> | null
  switch (ixType) {
    case 'AdvanceNonceAccount': {
      parsed = {
        name: 'advanceNonceAccount',
        args: {},
      } as ParsedIdlInstruction<SystemProgramIdl, 'advanceNonceAccount'>
      break
    }
    case 'Allocate': {
      const decoded = web3.SystemInstruction.decodeAllocate(dummyInstruction)
      parsed = {
        name: 'allocate',
        args: { space: new BN(decoded.space) },
      } as ParsedIdlInstruction<SystemProgramIdl, 'allocate'>
      break
    }
    case 'AllocateWithSeed': {
      const decoded =
        web3.SystemInstruction.decodeAllocateWithSeed(dummyInstruction)
      parsed = {
        name: 'allocateWithSeed',
        args: {
          seed: decoded.seed,
          space: new BN(decoded.space),
          owner: decoded.programId,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, 'allocateWithSeed'>
      break
    }
    case 'Assign': {
      const decoded = web3.SystemInstruction.decodeAssign(dummyInstruction)
      parsed = {
        name: 'assign',
        args: { owner: decoded.programId },
      } as ParsedIdlInstruction<SystemProgramIdl, 'assign'>
      break
    }
    case 'AssignWithSeed': {
      const decoded =
        web3.SystemInstruction.decodeAssignWithSeed(dummyInstruction)
      parsed = {
        name: 'assignWithSeed',
        args: {
          seed: decoded.seed, // string
          owner: decoded.programId,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, 'assignWithSeed'>
      break
    }
    case 'AuthorizeNonceAccount': {
      const decoded =
        web3.SystemInstruction.decodeNonceAuthorize(dummyInstruction)
      parsed = {
        name: 'authorizeNonceAccount',
        args: { authorized: decoded.newAuthorizedPubkey },
      } as ParsedIdlInstruction<SystemProgramIdl, 'authorizeNonceAccount'>
      break
    }
    case 'Create': {
      const decoded =
        web3.SystemInstruction.decodeCreateAccount(dummyInstruction)
      parsed = {
        name: 'createAccount',
        args: {
          lamports: new BN(decoded.lamports),
          owner: decoded.programId,
          space: new BN(decoded.space),
        },
      } as ParsedIdlInstruction<SystemProgramIdl, 'createAccount'>
      break
    }
    case 'CreateWithSeed': {
      const decoded =
        web3.SystemInstruction.decodeCreateWithSeed(dummyInstruction)
      parsed = {
        name: 'createAccountWithSeed',

        args: {
          lamports: new BN(decoded.lamports),
          owner: decoded.programId,
          space: new BN(decoded.space),
          seed: decoded.seed,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, 'createAccountWithSeed'>
      break
    }
    case 'InitializeNonceAccount': {
      const decoded =
        web3.SystemInstruction.decodeNonceInitialize(dummyInstruction)

      parsed = {
        name: 'initializeNonceAccount',
        args: { authorized: decoded.authorizedPubkey },
      } as ParsedIdlInstruction<SystemProgramIdl, 'initializeNonceAccount'>
      break
    }
    case 'Transfer': {
      const decoded = web3.SystemInstruction.decodeTransfer(dummyInstruction)
      parsed = {
        name: 'transfer',
        args: { lamports: new BN(decoded.lamports.toString()) },
      } as ParsedIdlInstruction<SystemProgramIdl, 'transfer'>
      break
    }
    case 'TransferWithSeed': {
      const decoded =
        web3.SystemInstruction.decodeTransferWithSeed(dummyInstruction)
      parsed = {
        name: 'transferWithSeed',
        args: {
          owner: decoded.programId,
          lamports: new BN(decoded.lamports.toString()),
          seed: decoded.seed,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, 'transferWithSeed'>
      break
    }
    case 'WithdrawNonceAccount': {
      const decoded =
        web3.SystemInstruction.decodeNonceWithdraw(dummyInstruction)
      parsed = {
        name: 'withdrawNonceAccount',
        args: { lamports: new BN(decoded.lamports) },
      } as ParsedIdlInstruction<SystemProgramIdl, 'withdrawNonceAccount'>
      break
    }
    default: {
      parsed = null
    }
  }
  const inputs: InputData[] = []

  for (const key in parsed.args) {
    const data = parsed.args[key]
    inputs.push({
      data: data,
      name: key,
      type: getDataType(data),
    })
  }
  return { name: parsed.name, inputs }
}
