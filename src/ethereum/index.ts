import { TxnBuilderTypes } from "aptos";
import axios from "axios";
import { Interface, Result } from "ethers";

import {
  DecodeType,
  DecodeProps,
  InputData,
  TxParserInterface,
} from "../types";

const END_INDEX_SELECTOR = 10;

export class EthereumTxParser implements TxParserInterface {
  rpc: string;
  constructor(rpc: string) {
    this.rpc = rpc;
  }

  private formatData = (fragmentData: any, decodeData: Result) => {
    const result: Array<InputData> = [];
    const inputs = fragmentData.inputs;

    for (let i = 0; i < decodeData.length; i++) {
      const components = inputs[i].components;

      if (!components) {
        result.push({
          type: inputs[i].type,
          name: inputs[i].name,
          data: decodeData[i].toString(),
        });
        continue;
      }
      // Format with parameters
      for (let j = 0; j < components.length; j++) {
        result.push({
          type: components[j].type,
          name: `${inputs[i].name}.${components[j].name}`,
          data: decodeData[i][j].toString(),
        });
      }
    }
    return result;
  };

  decode = async (props: DecodeProps): Promise<DecodeType> => {
    const { contractAddress, txData } = props;
    if (txData instanceof TxnBuilderTypes.RawTransaction)
      throw new Error("Invalid type TxData!");

    const res = await axios.get(
      `${this.rpc}/api?module=contract&action=getabi&address=${contractAddress}`
    );
    const { result: jsonABI } = res.data;
    if (jsonABI === "Contract source code not verified")
      throw new Error("Contract source code not verified");

    const contractABI = JSON.parse(jsonABI);
    const itf = Interface.from(contractABI);
    const fragments = itf.fragments;
    const name = itf.getFunctionName(
      txData.toString().slice(0, END_INDEX_SELECTOR)
    );
    const decodeData = itf.decodeFunctionData(name, txData);

    let result: InputData[] = [];
    for (const fragment of fragments) {
      if (fragment.type !== "function") continue;
      const fragmentData = JSON.parse(fragment.format("json"));
      if (fragmentData.name === name) {
        result = this.formatData(fragmentData, decodeData);
        break;
      }
    }
    return { name, inputs: result };
  };
}
