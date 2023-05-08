import { web3, BN, SystemProgram as SystemProgramIdl } from "@coral-xyz/anchor";

import { ParsedIdlInstruction, ParsedInstruction } from "./interface";

export function decodeSystemInstruction(
  instruction: web3.TransactionInstruction
): ParsedInstruction<SystemProgramIdl> {
  const ixType = web3.SystemInstruction.decodeInstructionType(instruction);
  let parsed: ParsedIdlInstruction<SystemProgramIdl> | null;
  switch (ixType) {
    case "AdvanceNonceAccount": {
      const decoded = web3.SystemInstruction.decodeNonceAdvance(instruction);
      parsed = {
        name: "advanceNonceAccount",
        accounts: [
          {
            name: "nonce",
            pubkey: decoded.noncePubkey,
            isSigner: false,
            isWritable: true,
          },
          { name: "recentBlockhashSysvar", ...instruction.keys[1] },
          {
            name: "nonceAuthority",
            pubkey: decoded.authorizedPubkey,
            isSigner: true,
            isWritable: false,
          },
        ],
        args: {},
      } as ParsedIdlInstruction<SystemProgramIdl, "advanceNonceAccount">;
      break;
    }
    case "Allocate": {
      const decoded = web3.SystemInstruction.decodeAllocate(instruction);
      parsed = {
        name: "allocate",
        accounts: [
          {
            name: "newAccount",
            pubkey: decoded.accountPubkey,
            isSigner: true,
            isWritable: true,
          },
        ],
        args: { space: new BN(decoded.space) },
      } as ParsedIdlInstruction<SystemProgramIdl, "allocate">;
      break;
    }
    case "AllocateWithSeed": {
      const decoded =
        web3.SystemInstruction.decodeAllocateWithSeed(instruction);
      parsed = {
        name: "allocateWithSeed",
        accounts: [
          {
            name: "newAccount",
            pubkey: decoded.accountPubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            name: "base",
            pubkey: decoded.basePubkey,
            isSigner: true,
            isWritable: false,
          },
        ],
        args: {
          seed: decoded.seed,
          space: new BN(decoded.space),
          owner: decoded.programId,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, "allocateWithSeed">;
      break;
    }
    case "Assign": {
      const decoded = web3.SystemInstruction.decodeAssign(instruction);
      parsed = {
        name: "assign",
        accounts: [
          {
            name: "assignedAccount",
            pubkey: decoded.accountPubkey,
            isSigner: true,
            isWritable: true,
          },
        ],
        args: { owner: decoded.programId },
      } as ParsedIdlInstruction<SystemProgramIdl, "assign">;
      break;
    }
    case "AssignWithSeed": {
      const decoded = web3.SystemInstruction.decodeAssignWithSeed(instruction);
      parsed = {
        name: "assignWithSeed",
        accounts: [
          {
            name: "assigned",
            pubkey: decoded.accountPubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            name: "base",
            pubkey: decoded.basePubkey,
            isSigner: true,
            isWritable: false,
          },
        ],
        args: {
          seed: decoded.seed, // string
          owner: decoded.programId,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, "assignWithSeed">;
      break;
    }
    case "AuthorizeNonceAccount": {
      const decoded = web3.SystemInstruction.decodeNonceAuthorize(instruction);
      parsed = {
        name: "authorizeNonceAccount",
        accounts: [
          {
            name: "nonce",
            isSigner: false,
            isWritable: true,
            pubkey: decoded.noncePubkey,
          },
          {
            name: "nonceAuthority",
            isSigner: true,
            isWritable: false,
            pubkey: decoded.authorizedPubkey,
          },
        ],
        args: { authorized: decoded.newAuthorizedPubkey },
      } as ParsedIdlInstruction<SystemProgramIdl, "authorizeNonceAccount">;
      break;
    }
    case "Create": {
      const decoded = web3.SystemInstruction.decodeCreateAccount(instruction);
      parsed = {
        name: "createAccount",
        accounts: [
          {
            name: "payer",
            pubkey: decoded.fromPubkey,
            isSigner: true,
            isWritable: true,
          },
          {
            name: "newAccount",
            pubkey: decoded.newAccountPubkey,
            isSigner: true,
            isWritable: true,
          },
        ],
        args: {
          lamports: new BN(decoded.lamports),
          owner: decoded.programId,
          space: new BN(decoded.space),
        },
      } as ParsedIdlInstruction<SystemProgramIdl, "createAccount">;
      break;
    }
    case "CreateWithSeed": {
      const decoded = web3.SystemInstruction.decodeCreateWithSeed(instruction);
      parsed = {
        name: "createAccountWithSeed",
        accounts: [
          {
            name: "payer",
            pubkey: decoded.fromPubkey,
            isSigner: true,
            isWritable: true,
          },
          {
            name: "created",
            pubkey: decoded.newAccountPubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            name: "base",
            pubkey: decoded.basePubkey,
            isSigner: true,
            isWritable: false,
          },
        ],
        args: {
          lamports: new BN(decoded.lamports),
          owner: decoded.programId,
          space: new BN(decoded.space),
          seed: decoded.seed,
          base: decoded.basePubkey,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, "createAccountWithSeed">;
      break;
    }
    case "InitializeNonceAccount": {
      const decoded = web3.SystemInstruction.decodeNonceInitialize(instruction);

      parsed = {
        name: "initializeNonceAccount",
        accounts: [
          {
            name: "nonce",
            pubkey: decoded.noncePubkey,
            isSigner: false,
            isWritable: true,
          },
          { name: "recentBlockhashSysvar", ...instruction.keys[1] },
          { name: "rentSysvar", ...instruction.keys[2] },
        ],
        args: { authorized: decoded.authorizedPubkey },
      } as ParsedIdlInstruction<SystemProgramIdl, "initializeNonceAccount">;
      break;
    }
    case "Transfer": {
      const decoded = web3.SystemInstruction.decodeTransfer(instruction);
      parsed = {
        name: "transfer",
        accounts: [
          {
            name: "sender",
            pubkey: decoded.fromPubkey,
            isSigner: true,
            isWritable: true,
          },
          {
            name: "receiver",
            pubkey: decoded.toPubkey,
            isWritable: true,
            isSigner: false,
          },
        ],
        args: { lamports: new BN(decoded.lamports.toString()) },
      } as ParsedIdlInstruction<SystemProgramIdl, "transfer">;
      break;
    }
    case "TransferWithSeed": {
      const decoded =
        web3.SystemInstruction.decodeTransferWithSeed(instruction);
      parsed = {
        name: "transferWithSeed",
        accounts: [
          {
            name: "sender",
            pubkey: decoded.fromPubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            name: "base",
            pubkey: decoded.basePubkey,
            isSigner: true,
            isWritable: false,
          },
          {
            name: "receiver",
            pubkey: decoded.toPubkey,
            isSigner: false,
            isWritable: true,
          },
        ],
        args: {
          owner: decoded.programId,
          lamports: new BN(decoded.lamports.toString()),
          seed: decoded.seed,
        },
      } as ParsedIdlInstruction<SystemProgramIdl, "transferWithSeed">;
      break;
    }
    case "WithdrawNonceAccount": {
      const decoded = web3.SystemInstruction.decodeNonceWithdraw(instruction);
      parsed = {
        name: "withdrawNonceAccount",
        accounts: [
          {
            name: "nonce",
            pubkey: decoded.noncePubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            name: "recepient",
            pubkey: decoded.toPubkey,
            isSigner: false,
            isWritable: true,
          },
          { name: "recentBlockhashSysvar", ...instruction.keys[2] },
          { name: "rentSysvar", ...instruction.keys[3] },
          {
            name: "nonceAuthority",
            pubkey: decoded.noncePubkey,
            isSigner: true,
            isWritable: false,
          },
        ],
        args: { lamports: new BN(decoded.lamports) },
      } as ParsedIdlInstruction<SystemProgramIdl, "withdrawNonceAccount">;
      break;
    }
    default: {
      parsed = null;
    }
  }

  return parsed
    ? {
        ...parsed,
        programId: web3.SystemProgram.programId,
      }
    : {
        programId: web3.SystemProgram.programId,
        name: "unknown",
        accounts: instruction.keys,
        args: { unknown: instruction.data },
      };
}
