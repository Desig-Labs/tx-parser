import { web3 } from '@coral-xyz/anchor'
import { decodeTxRaw } from '@cosmjs/proto-signing'
import { CosmWasmClient } from 'cosmwasm'
import { AptosAccount, AptosClient, FaucetClient } from 'aptos'

import { Chain } from '../dist/types'
import { TxParser } from '../dist/core'

const SOLANA_RPC = web3.clusterApiUrl('devnet')
const ETHER_SCAN_RPC =
  'wss://goerli.infura.io/ws/v3/783c24a3a364474a8dbed638263dc410'
const APTOS_RPC = 'https://fullnode.devnet.aptoslabs.com'

describe('Tx Parser', function () {
  let solParser = new TxParser(Chain.Solana, SOLANA_RPC)
  let ethParser = new TxParser(Chain.Ethereum, ETHER_SCAN_RPC)
  let aptosParser = new TxParser(Chain.Aptos, APTOS_RPC)
  let osmosisParser = new TxParser(Chain.Osmosis, '')

  it('Parse data on ETH', async () => {
    const TETHER_CONTRACT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
    const TX_TRANSFER =
      '0xa9059cbb0000000000000000000000008e4fd0a080818377adef093d99392813c3526298000000000000000000000000000000000000000000000000000000000016e0c5'
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
    const client = new AptosClient(NODE_URL)

    const sender = new AptosAccount()
    const recipient = new AptosAccount()
    await faucetClient.fundAccount(sender.address(), 100_000_000)

    const amount = BigInt(1000000)
    const rawTx = await client.generateTransaction(sender.address(), {
      function: `0x1::coin::transfer`,
      arguments: [recipient.address(), amount],
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
    })

    const result = await aptosParser.decode({
      contractAddress: '0x1',
      txData: rawTx,
    })
    console.log('Aptos parse result =====>', result)
  })

  it('Parse data on Osmosis', async () => {
    const rpcEndpoint = 'https://rpc.osmosis.zone'
    const client = await CosmWasmClient.connect(rpcEndpoint)
    const result = await client.getTx(
      '14A5210D6B82E178630FB9198CD5640326B9D1F2637251EE6A652A8296874842',
    )
    if (!result?.tx) throw new Error('Not found transaction')
    const decodedTx = decodeTxRaw(result.tx)
    const mes = decodedTx.body.messages[0]

    const decoded = await osmosisParser.decode({
      contractAddress: mes.typeUrl,
      txData: mes.value,
    })

    console.log('Osmosis parse result =====>', decoded)
  })
})
