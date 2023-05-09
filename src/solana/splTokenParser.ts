import { Buffer } from 'buffer'
import * as spl from '@solana/spl-token'

import { PublicKey, TransactionInstruction } from '@solana/web3.js'
import { BN, web3 } from '@coral-xyz/anchor'
import { blob, struct, u8 } from '@solana/buffer-layout'

import { ParsedIdlInstruction, SplToken } from './interface'
import { DecodeType, InputData } from '../types'
import { getDataType } from './utils'

export function decodeTokenInstruction(txData: Buffer): DecodeType {
  let parsed: ParsedIdlInstruction<SplToken> | null
  const dummyInstruction: TransactionInstruction = {
    data: txData,
    keys: [
      web3.Keypair.generate().publicKey,
      web3.Keypair.generate().publicKey,
      web3.Keypair.generate().publicKey,
      web3.Keypair.generate().publicKey,
      web3.Keypair.generate().publicKey,
    ] as any,
    programId: spl.TOKEN_PROGRAM_ID,
  }
  const decoded = u8().decode(txData)
  switch (decoded) {
    case spl.TokenInstruction.InitializeMint: {
      const decodedIx = spl.decodeInitializeMintInstruction(dummyInstruction)
      parsed = {
        name: 'initializeMint',
        args: {
          decimals: decodedIx.data.decimals,
          mintAuthority: decodedIx.data.mintAuthority,
          freezeAuthority: decodedIx.data.freezeAuthority,
        },
      } as ParsedIdlInstruction<SplToken, 'initializeMint'>
      break
    }
    case spl.TokenInstruction.InitializeAccount: {
      const decodedIx = spl.decodeInitializeAccountInstruction(dummyInstruction)
      parsed = {
        name: 'initializeAccount',

        args: {},
      } as ParsedIdlInstruction<SplToken, 'initializeAccount'>
      break
    }
    case spl.TokenInstruction.InitializeMultisig: {
      const decodedIx =
        spl.decodeInitializeMultisigInstruction(dummyInstruction)
      parsed = {
        name: 'initializeMultisig',
        args: { m: decodedIx.data.m },
      } as ParsedIdlInstruction<SplToken, 'initializeMultisig'>
      break
    }
    case spl.TokenInstruction.Transfer: {
      const decodedIx = spl.decodeTransferInstruction(dummyInstruction)
      parsed = {
        name: 'transfer',
        args: { amount: new BN(decodedIx.data.amount.toString()) },
      } as ParsedIdlInstruction<SplToken, 'transfer'>
      break
    }
    case spl.TokenInstruction.Approve: {
      const decodedIx = spl.decodeApproveInstruction(dummyInstruction)
      parsed = {
        name: 'approve',
        args: { amount: new BN(decodedIx.data.amount.toString()) },
      } as ParsedIdlInstruction<SplToken, 'approve'>
      break
    }
    case spl.TokenInstruction.Revoke: {
      parsed = {
        name: 'revoke',
        args: {},
      } as ParsedIdlInstruction<SplToken, 'revoke'>
      break
    }
    case spl.TokenInstruction.SetAuthority: {
      const decodedIx = spl.decodeSetAuthorityInstruction(dummyInstruction)
      parsed = {
        name: 'setAuthority',
        args: {
          authorityType: decodedIx.data.authorityType as any,
          newAuthority: decodedIx.data.newAuthority as any,
        },
      } as ParsedIdlInstruction<SplToken, 'setAuthority'>
      break
    }
    case spl.TokenInstruction.MintTo: {
      const decodedIx = spl.decodeMintToInstruction(dummyInstruction)
      parsed = {
        name: 'mintTo',

        args: { amount: new BN(decodedIx.data.amount.toString()) },
      } as ParsedIdlInstruction<SplToken, 'mintTo'>
      break
    }
    case spl.TokenInstruction.Burn: {
      const decodedIx = spl.decodeBurnInstruction(dummyInstruction)
      parsed = {
        name: 'burn',

        args: { amount: new BN(decodedIx.data.amount.toString()) },
      } as ParsedIdlInstruction<SplToken, 'burn'>
      break
    }
    case spl.TokenInstruction.CloseAccount: {
      parsed = {
        name: 'closeAccount',
        args: {},
      } as ParsedIdlInstruction<SplToken, 'closeAccount'>
      break
    }
    case spl.TokenInstruction.FreezeAccount: {
      parsed = {
        name: 'freezeAccount',
        args: {},
      } as ParsedIdlInstruction<SplToken, 'freezeAccount'>
      break
    }
    case spl.TokenInstruction.ThawAccount: {
      parsed = {
        name: 'thawAccount',
        args: {},
      } as ParsedIdlInstruction<SplToken, 'thawAccount'>
      break
    }
    case spl.TokenInstruction.TransferChecked: {
      const decodedIx = spl.decodeTransferCheckedInstruction(dummyInstruction)
      parsed = {
        name: 'transferChecked',
        args: {
          amount: new BN(decodedIx.data.amount.toString()),
          decimals: decodedIx.data.decimals,
        },
      } as ParsedIdlInstruction<SplToken, 'transferChecked'>
      break
    }
    case spl.TokenInstruction.ApproveChecked: {
      const decodedIx = spl.decodeApproveCheckedInstruction(dummyInstruction)
      parsed = {
        name: 'approveChecked',
        args: {
          amount: new BN(decodedIx.data.amount.toString()),
          decimals: decodedIx.data.decimals,
        },
      } as ParsedIdlInstruction<SplToken, 'approveChecked'>
      break
    }
    case spl.TokenInstruction.MintToChecked: {
      const decodedIx = spl.decodeMintToCheckedInstruction(dummyInstruction)
      parsed = {
        name: 'mintToChecked',
        args: {
          amount: new BN(decodedIx.data.amount.toString()),
          decimals: decodedIx.data.decimals,
        },
      } as ParsedIdlInstruction<SplToken, 'mintToChecked'>
      break
    }
    case spl.TokenInstruction.BurnChecked: {
      const decodedIx = spl.decodeBurnCheckedInstruction(dummyInstruction)
      parsed = {
        name: 'burnChecked',
        args: {
          amount: new BN(decodedIx.data.amount.toString()),
          decimals: decodedIx.data.decimals,
        },
      } as ParsedIdlInstruction<SplToken, 'burnChecked'>
      break
    }
    case spl.TokenInstruction.InitializeAccount2: {
      interface InitializeAccount2InstructionData {
        instruction: spl.TokenInstruction.InitializeAccount2
        owner: Uint8Array
      }

      const initializeAccount2InstructionData =
        struct<InitializeAccount2InstructionData>([
          u8('instruction'),
          blob(32, 'owner'),
        ])

      const decodedIx = initializeAccount2InstructionData.decode(txData)
      parsed = {
        name: 'initializeAccount2',
        args: { owner: new PublicKey(decodedIx.owner) },
      } as ParsedIdlInstruction<SplToken, 'initializeAccount2'>
      break
    }
    case spl.TokenInstruction.SyncNative: {
      parsed = {
        name: 'syncNative',
        args: {},
      } as ParsedIdlInstruction<SplToken, 'syncNative'>
      break
    }
    case spl.TokenInstruction.InitializeAccount3: {
      interface InitializeAccount3InstructionData {
        instruction: spl.TokenInstruction.InitializeAccount3
        owner: Uint8Array
      }
      const initializeAccount3InstructionData =
        struct<InitializeAccount3InstructionData>([
          u8('instruction'),
          blob(32, 'owner'),
        ])
      const decodedIx = initializeAccount3InstructionData.decode(txData)
      parsed = {
        name: 'initializeAccount3',
        args: { owner: new PublicKey(decodedIx.owner) },
      } as ParsedIdlInstruction<SplToken, 'initializeAccount3'>
      break
    }

    case spl.TokenInstruction.InitializeMint2: {
      const decodedIx =
        spl.decodeInitializeMintInstructionUnchecked(dummyInstruction)
      const tokenMint = decodedIx.keys.mint
      if (!tokenMint)
        throw new Error(`Failed to parse InitializeMint2 instruction`)
      parsed = {
        name: 'initializeMint2',
        args: {
          decimals: decodedIx.data.decimals,
          mintAuthority: decodedIx.data.mintAuthority,
          freezeAuthority: decodedIx.data.freezeAuthority,
        },
      } as ParsedIdlInstruction<SplToken, 'initializeMint2'>
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

export function decodeAssociatedTokenInstruction(): DecodeType {
  return {
    name: 'createAssociatedTokenAccount',
    inputs: [],
  }
}
