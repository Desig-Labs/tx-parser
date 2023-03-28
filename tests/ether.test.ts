import { EthereumTxParser } from "../src/ethereum";

const NFT_Seaport_CONTRACT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
const TX_TRANFER_NFT =
  "0xa9059cbb0000000000000000000000008e4fd0a080818377adef093d99392813c3526298000000000000000000000000000000000000000000000000000000000016e0c5";

describe("Tx-Ethereum", function () {
  it("functionExample", async () => {
    const ETHParser = new EthereumTxParser();
    const result = await ETHParser.decode({
      contractAddress: NFT_Seaport_CONTRACT,
      txData: TX_TRANFER_NFT,
    });

    console.log("result: ", result);
  });
});
