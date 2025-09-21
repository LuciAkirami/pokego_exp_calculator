import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-purple-500",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        outline:
          "border border-gray-700 bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus-visible:ring-gray-600",
        secondary:
          "bg-gray-700 text-white hover:bg-gray-600 focus-visible:ring-gray-500",
        ghost:
          "text-gray-300 hover:bg-gray-800 hover:text-white",
        link: "text-purple-400 underline-offset-4 hover:text-purple-300 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2.5 font-medium has-[>svg]:px-3",
        sm: "h-9 rounded-lg gap-1.5 px-4 text-sm has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-8 text-base font-semibold has-[>svg]:px-4",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
