"use client"

import type { ComponentProps, ReactNode } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type LoadingButtonProps = Omit<ComponentProps<typeof Button>, "children" | "asChild"> & {
  isLoading: boolean
  isDisabled?: boolean
  loadingText?: string
  children: ReactNode
}

export function LoadingButton({
  isLoading,
  isDisabled = false,
  disabled = false,
  loadingText = "Sending...",
  children,
  variant = "secondary",
  type = "submit",
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      className={cn("rounded-md", className)}
      variant={variant}
      type={type}
      disabled={isLoading || isDisabled || disabled}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
