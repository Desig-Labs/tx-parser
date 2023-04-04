import { web3 } from "@coral-xyz/anchor";
import { AptosAccount, AptosClient, FaucetClient } from "aptos";

import TxParser, { Chain } from "../dist/index";

describe("Tx Parser", function () {
  let solParser = new TxParser(Chain.Solana);
  let ethParser = new TxParser(Chain.Ethereum);
  let aptosParser = new TxParser(Chain.Aptos);

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
    const PROGRAM_LUCKY_WHEEL = "38k8ejgfKJ2VKRApCMkev1hQwqobTTZPLnX11t2dxAXA";
    const SIG_LUCKY_WHEEL =
      "53LsUMLspuuSiw57rk1hSgPQoFQBgkKgZCjbcKh9yo93x19ryFA8JnM5HuE7N6oLf6WPTfLdrgHpbAgJfZjY7dHv";
    const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
    const tx = await connection.getTransaction(SIG_LUCKY_WHEEL);

    const result = await solParser.decode({
      contractAddress: PROGRAM_LUCKY_WHEEL,
      txData: tx?.transaction.message.instructions[0].data || "",
    });

    console.log("Solana parse result =====>", result);
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
});
