import { web3 } from "@coral-xyz/anchor";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { CosmWasmClient } from "cosmwasm";
import { AptosAccount, AptosClient, FaucetClient } from "aptos";
import { decodeSystemInstruction } from "../src/solana/systemParser";

import TxParser from "../dist/core";
import { Chain } from "../dist/types";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { SystemProgram, TransactionInstruction } from "@solana/web3.js";

describe("Tx Parser", function () {
  let solParser = new TxParser(Chain.Solana);
  let ethParser = new TxParser(Chain.Ethereum);
  let aptosParser = new TxParser(Chain.Aptos);
  let osmosisParser = new TxParser(Chain.Osmosis);

  it("Parse data on ETH", async () => {
    const TETHER_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const TX_TRANSFER =
      "0xa9059cbb0000000000000000000000008e4fd0a080818377adef093d99392813c3526298000000000000000000000000000000000000000000000000000000000016e0c5";
    const result = await ethParser.decode({
      contractAddress: TETHER_CONTRACT,
      txData: TX_TRANSFER,
    });
    console.log("ETH parse result =====>", result);
  });

  it("Parse data on Solana", async () => {
    const PROGRAM_LUCKY_WHEEL = "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB";
    const SIG_LUCKY_WHEEL =
      "2r2BHXAJ2Vwmgmnb665Cwia1QGkQDetHmdFvxBWoLiNk6VrNLtVfFh97KsKaaM7HvjJQbhys5VZdmnq26Xt9LkRy";
    const connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));
    const tx = await connection.getTransaction(SIG_LUCKY_WHEEL);
    const instructions = tx?.transaction.message.instructions || [];

    for (const instruction of instructions) {
      try {
        var enc = new TextEncoder();
        const a: TransactionInstruction = {
          data: enc.encode(instruction.data) as any,
          keys: instruction.accounts as any,
          programId: SystemProgram.programId,
        };
        const data = decodeSystemInstruction(a);
        const res = await solParser.decode({
          contractAddress: PROGRAM_LUCKY_WHEEL,
          txData: instruction.data,
        });

        console.log(data);
      } catch (error) {
        console.log("error===>", error);
      }
    }

    // console.log("Solana parse result =====>", result);
  });

  it("Parse data on Aptos", async () => {
    const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
    const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
    const client = new AptosClient(NODE_URL);

    const sender = new AptosAccount();
    const recipient = new AptosAccount();
    await faucetClient.fundAccount(sender.address(), 100_000_000);

    const amount = BigInt(1000000);
    const rawTx = await client.generateTransaction(sender.address(), {
      function: `0x1::coin::transfer`,
      arguments: [recipient.address(), amount],
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
    });

    const result = await aptosParser.decode({
      contractAddress: "0x1",
      txData: rawTx,
    });
    console.log("Aptos parse result =====>", result);
  });

  it("Parse data on Osmosis", async () => {
    const rpcEndpoint = "https://rpc.osmosis.zone";
    const client = await CosmWasmClient.connect(rpcEndpoint);
    const result = await client.getTx(
      "14A5210D6B82E178630FB9198CD5640326B9D1F2637251EE6A652A8296874842"
    );
    if (!result?.tx) throw new Error("Not found transaction");
    const decodedTx = decodeTxRaw(result.tx);
    const mes = decodedTx.body.messages[0];

    const decoded = await osmosisParser.decode({
      contractAddress: mes.typeUrl,
      txData: mes.value,
    });

    console.log("Osmosis parse result =====>", decoded);
  });
});
