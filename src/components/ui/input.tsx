import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
            flex h-10 w-full rounded-xl border border-input-border bg-input px-3
            py-2 text-sm ring-offset-background

            disabled:cursor-not-allowed disabled:opacity-50

            file:border-0 file:bg-transparent file:text-sm file:font-medium
            file:text-text-secondary

            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-offset-2 focus-visible:ring-ring

            placeholder:text-text-secondary
          `,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }