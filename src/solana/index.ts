import { BN, BorshCoder, translateAddress, web3 } from "@coral-xyz/anchor";
import {
  decodeIdlAccount,
  Idl,
  idlAddress,
} from "@coral-xyz/anchor/dist/cjs/idl";
import { inflate } from "pako";
import { bs58, utf8 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { Connection, clusterApiUrl } from "@solana/web3.js";

import {
  DecodeProps,
  DecodeType,
  ResultData,
  TxParserInterface,
} from "../types";
export class SolanaTxParser implements TxParserInterface {
  private getDataType = (data: any): string => {
    if (data instanceof BN) return "BN";
    if (data instanceof web3.PublicKey) return "PubKey";
    if (Buffer.isBuffer(data)) return "Buffer";
    return typeof data;
  };

  private getProvider = async ({
    programId,
    IDL,
  }: {
    programId: string;
    IDL?: Idl;
  }) => {
    if (IDL) return new BorshCoder(IDL);

    const pubProgramId = translateAddress(programId);
    const idlAddr = await idlAddress(pubProgramId);
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const idlAccountInfo = await connection.getAccountInfo(idlAddr);
    if (!idlAccountInfo) return null;

    const idlAccount = decodeIdlAccount(idlAccountInfo.data.slice(8)); // chop off discriminator
    const inflatedIdl = inflate(idlAccount.data);
    const idlJson: Idl = JSON.parse(utf8.decode(inflatedIdl));
    return new BorshCoder(idlJson);
  };

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData, IDL } = props;
    const coder = await this.getProvider({ programId: contractAddress, IDL });
    if (!coder)
      throw new Error(
        `Not found IDL from programID:${contractAddress}, please add IDL or upload to explorer`
      );
    let data = txData;
    const result: Array<ResultData> = [];

    if (txData instanceof Buffer) data = bs58.encode(txData);
    const decodedData: any = coder.instruction.decode(data, "base58");
    if (!decodedData) throw new Error("Can't parse this transaction");
    // Format data
    for (const key in decodedData.data)
      result.push({
        data: decodedData.data[key].toString(),
        name: key,
        type: this.getDataType(decodedData.data[key]),
      });

    return { name: decodedData.name, result };
  };
}
