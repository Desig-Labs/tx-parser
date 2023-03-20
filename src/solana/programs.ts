import { AnchorProvider, BorshInstructionCoder, Idl, Spl, Wallet, web3, SplTokenCoder, Coder, Program } from "@project-serum/anchor";

import SplTokenIDL, { SPL_TOKEN_PROGRAM_ID } from "./spl-token.idl";

type ProgramParser = {
  idl: Idl;
  ixParser: BorshInstructionCoder;
};

type Programs = Record<string, ProgramParser>;
const RAW_WALLET = new Wallet(web3.Keypair.generate());

const RAW_CONNECTION = new web3.Connection(web3.clusterApiUrl("devnet"));
const RAW_PROVIDER = new AnchorProvider(RAW_CONNECTION, RAW_WALLET, {});

const SPL_PROGRAM = Spl.token(RAW_PROVIDER);

export const PROGRAMS: Programs = {
  // [SPL_TOKEN_PROGRAM_ID]: {
  //   idl: SplTokenIDL,
  //   ixParser: SPL_PROGRAM.coder.instruction,
  // },
};
