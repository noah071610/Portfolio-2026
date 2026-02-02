"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

function Button({
  onClick,
  children,
  className,
  leftIcon,
  rightIcon,
  isSmallSize = false,
  // noShadow = false,
  disabled = false,
  isStable = false,
}: {
  onClick: () => void
  children: React.ReactNode
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabled?: boolean
  noShadow?: boolean
  isSmallSize?: boolean
  isStable?: boolean
}) {
  return (
    <motion.div
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.97,
              // boxShadow: noShadow ? undefined : "var(--shadow-while-tap)",
            }
      }
      whileHover={
        disabled || !isStable
          ? undefined
          : {
              y: -3,
              // boxShadow: noShadow ? undefined : "var(--shadow-btn)",
            }
      }
      transition={{ duration: 0.12 }}
      className={cn(
        "flex-row inset-0 m-auto flex items-center justify-center",
        "bg-[#202224] border border-border cursor-pointer",
        className ?? "",
        // noShadow ? "" : disabled ? "shadow-disabled" : "shadow-btn",
        isSmallSize ? "px-0 min-h-12 max-h-30 rounded-4xl py-1.75" : "px-1.25 h-13 rounded-[1.5rem] py-0.75",
      )}
      onClick={() => {
        setTimeout(() => {
          onClick()
        }, 190)
      }}
      // disabled={!!disabled}
    >
      {leftIcon && <>{leftIcon}</>}
      <p
        className={cn(
          "px-1.25 py-0 text-center whitespace-pre-line overflow-hidden text-ellipsis break-keep wrap-break-word tracking-tight",
          "text-white",
          !isSmallSize ? "text-md font-bold" : "text-sm font-medium",
        )}
        dangerouslySetInnerHTML={{ __html: children ?? ("" as string) }}
      ></p>
      {rightIcon && <>{rightIcon}</>}
    </motion.div>
  )
}

export default Button
