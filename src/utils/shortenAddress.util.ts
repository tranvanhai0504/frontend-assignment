export const shortenAddress = (address: string | null | undefined): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
}
