import { web3 } from "@coral-xyz/anchor";
import TxParser, { Chain, TxParserInterface } from "../dist/index";

describe("Tx Parser", function () {
  let solParser: TxParserInterface;
  let ethParser: TxParserInterface;

  before(() => {
    solParser = new TxParser(Chain.Solana);
    ethParser = new TxParser(Chain.Ethereum);
  });

  it("Parse data on ETH", async () => {
    const TETHER_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const TX_TRANSFER =
      "0xa9059cbb0000000000000000000000008e4fd0a080818377adef093d99392813c3526298000000000000000000000000000000000000000000000000000000000016e0c5";
    const result = await ethParser.decode({
      contractAddress: TETHER_CONTRACT,
      txData: TX_TRANSFER,
    });

    console.log(result);
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

    console.log(result);
  });
});
