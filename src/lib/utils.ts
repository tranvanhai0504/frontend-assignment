import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addressValidate(address: string): boolean {
  if (address === '') return true
  return /^0x[a-fA-F0-9]{64}$/.test(address)
}
