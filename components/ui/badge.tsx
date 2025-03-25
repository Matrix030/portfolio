"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-primary text-primary-foreground bg-blue-600 text-white",
    secondary: "bg-secondary text-secondary-foreground bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100",
    destructive: "bg-destructive text-destructive-foreground bg-red-600 text-white",
    outline: "text-foreground border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge } 