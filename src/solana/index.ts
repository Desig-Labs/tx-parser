import { BorshInstructionCoder, Idl } from "@project-serum/anchor";
import { PROGRAMS } from "./programs";

export class SolanaTxParser {
  getParserProvider = (programID: string, IDL?: Idl): BorshInstructionCoder | null => {
    const program = PROGRAMS[programID];
    if (program) return program.ixParser;
    if (!IDL) return null;
    return new BorshInstructionCoder(IDL);
  };

  decode = (programID: string, { txData, IDL }: { IDL?: Idl; txData: Buffer }) => {
    const parserProvider = this.getParserProvider(programID, IDL);
    return parserProvider?.decode(txData, "hex");
  };
}
