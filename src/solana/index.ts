import { BorshInstructionCoder, Idl } from "@project-serum/anchor";
import { PROGRAMS } from "./programs";
import { TxParserInterface } from "../types";

export class SolanaTxParser implements TxParserInterface {
  getParserProvider = (
    programID: string,
    IDL?: Idl
  ): BorshInstructionCoder | null => {
    const program = PROGRAMS[programID];
    if (program) return program.ixParser;
    if (!IDL) return null;
    return new BorshInstructionCoder(IDL);
  };

  decode = async (props: {
    contractAddress: string;
    txData: string;
    IDL?: Idl;
  }) => {
    const { contractAddress, txData, IDL } = props;
    const parserProvider = this.getParserProvider(contractAddress, IDL);
    const decodedData: any = parserProvider?.decode(txData, "hex");
    return decodedData;
  };
}
