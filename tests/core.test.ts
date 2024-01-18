import { web3 } from '@coral-xyz/anchor'
import { AptosAccount, FaucetClient } from 'aptos'
import { decode } from 'bs58'

import { Chain } from '../dist/types'
import { TxParser } from '../dist/core'

const SOLANA_RPC = web3.clusterApiUrl('devnet')
const ETHER_SCAN_RPC =
  'https://sepolia.infura.io/v3/93597110afce4130a8f962c0abf2f73c'
const APTOS_RPC = 'https://fullnode.devnet.aptoslabs.com'
const SUI_RPC = 'https://rpc.ankr.com/sui'

describe('Tx Parser', function () {
  let solParser = new TxParser(Chain.Solana, SOLANA_RPC)
  let ethParser = new TxParser(Chain.EVM, ETHER_SCAN_RPC)
  let aptosParser = new TxParser(Chain.Aptos, APTOS_RPC)
  let suiParser = new TxParser(Chain.Sui, SUI_RPC)

  it('Parse data on ETH', async () => {
    const TETHER_CONTRACT = '0x6E572751AaE03719Cd0b53B3551db323eA2e2050'
    const TX_TRANSFER =
      '0x095ea7b30000000000000000000000008f1dd60dbdb493dd940a44985ab43fb9901dcd2effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const result = await ethParser.decode({
      contractAddress: TETHER_CONTRACT,
      txData: TX_TRANSFER,
    })

    console.log('ETH parse result =====>', result)
  })

  it('Parse data on Solana', async () => {
    const programId = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'

    const sig =
      '2pDkQPn6wAsFfD8rrEfcw56ochgxfCqCKM9Z1RAkC8hFGMrzet9vcQohr9DWEMTRWPRG5MUw8XwGc2C5eXmPdfEw'
    const connection = new web3.Connection(SOLANA_RPC)
    const tx = await connection.getTransaction(sig)
    const instructions = tx?.transaction.message.instructions || []
    for (const { data } of instructions) {
      try {
        const res = await solParser.decode({
          contractAddress: programId,
          txData: data,
        })
        console.log('Parse data on Solana ====>', res.inputs[0].data.toString())
      } catch (error) {}
    }
  })

  it('Parse data on Aptos', async () => {
    const NODE_URL = 'https://fullnode.devnet.aptoslabs.com'
    const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com'
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL)

    const sender = new AptosAccount()
    await faucetClient.fundAccount(sender.address(), 100_000_000)
    const rawTx1 =
      'BQhgFAiq4oqWmXMX8VgGURF2Bt8hgRbaogoJjbG4v7Jzd9eNtj7h926E5GVs4hPrwThFdg4QDCaywNthZBBFYjTWkfeMWsDGBYQ3HVwzCFDbnH4xAhyBRvfzXNFsbT2TwoJmUjjExUAprK9YsczkCf8Ncx13UaK3zsqFZnopUWKvE4ZUtdjF98Tfh28Ny8aTXywcCzjduRaAeSERrV54Ls786y4JX7xoT3kw6Tt8R9bWxDsyr37TFJvjbhvhHy2N5skqSgXw9TKvPGdQc96sxNqEQLHxAipPwUgYzgU1FQyCbqWP2iP2y'
    const rawTx =
      'BQhgFAiq4oqWmXMX8VgGURF2Bt8hgRbaogoJjbG4v7Jzcd2xjhCR7U5nYHrLZpELgUX7Z9FaBscNiZH1Y5KfEztn2DLHVbqEkodTXAvoRqa7T7cSdgD4pBVswk8kSBtRJcq3Ds7mukwD2oDD8fsom9pwRe4copC1t4Za8uDtmo1rHtwudGhHbgvx5mTxLmPjvk8xGv4GnymR5oYZemJn8GfpgzXnHGnuL7v3JpW4oEAARDGNYv4sXeCLbT8R3VpNVCWKzush98VAtkEVrDgTeyvuUXSYGe35jSpNrdm9jAehwuUpEDkBY'
    const result = await aptosParser.decode({
      contractAddress:
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      txData: decode(rawTx),
    })
    const result1 = await aptosParser.decode({
      contractAddress:
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      txData: decode(rawTx1),
    })
    console.log('Aptos parse result =====>', result, result1)
  })

  it('Parse data on SUI', async () => {
    const rawTx =
      '11PtSpBeJ9ffWFu7RrSBG94gNgXyc7f4k3jX2AXKMqBZnDnqEbGojfWLEHeA8WQNX3RPv5RUSnTN3EqB6Xk4ZvCpBfcsQqRtwwU1aVhhnAwJvXSFv58jhhghYqDKTgKArTLaxpgUj5bDtJD62Tk1yd2CrCjkUq8tTXzgHALLmBcTyvF51FZdLXrsuryMgg2z3Aw1zd2kLn4syPuRyL1bL2kvqj2Z4rskUfu8uG9Et8uAhwSbP86CddarouymPtVDQWt6Hh1dkv8ymT8xPZRjZrgYzfQogJzGe5x33jwFKu4n3T9tqLnUhscsrdbMYKx7qx5C7FknYquNNxA4qyeUWKMFvPeTvpXfR5gX7A5ycqfAvBsbUNmoaZrNucDPBbjCmx9ohQQTWfWFBnpePoseus4kM8tLLDYYj39ypHy3ajnqM41fXvHLvRQ9oGQogbyLM9dJT84w1dkUPPQxkZuaU1tiu798xrdK2TYm2xkxBNBLyTjzXkuvXpRUzAN7fgzknGuAYGN8hU2iBmop6UdARJJ3kamtJ4Gs4jhsqztk3p7jYj7nhjEuNz3v5sP71bN9VrcZLbSqmJLXz9ugu6CdU8xCxwNPaa2EbYDkG8p6REhAe7E7fQwjTsArnHgkLw5iz4D2S5JiVuz9Y89433XqbmXtCnx2PF9CxwF1FdrJzVEEX1mXMMy'
    const result = await suiParser.decode({
      contractAddress:
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      txData: decode(rawTx),
    })

    console.log('Aptos parse result =====>', result)
  })

  // it('Parse data on Osmosis', async () => {
  //   const rpcEndpoint = 'https://rpc.osmosis.zone'
  //   const client = await CosmWasmClient.connect(rpcEndpoint)
  //   const result = await client.getTx(
  //     '14A5210D6B82E178630FB9198CD5640326B9D1F2637251EE6A652A8296874842',
  //   )
  //   if (!result?.tx) throw new Error('Not found transaction')
  //   const decodedTx = decodeRaw(result.tx)
  //   const mes = decodedTx.body.messages[0]

  //   const decoded = await osmosisParser.decode({
  //     contractAddress: mes.typeUrl,
  //     txData: mes.value,
  //   })

  //   console.log('Osmosis parse result =====>', decoded)
  // })
})
