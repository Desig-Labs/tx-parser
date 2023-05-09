import { BN, web3 } from '@coral-xyz/anchor'

export const getDataType = (data: any): string => {
  if (data instanceof BN) return 'BN'
  if (data instanceof web3.PublicKey) return 'PubKey'
  if (Buffer.isBuffer(data)) return 'Buffer'
  return typeof data
}
