"use client"

import { EASE_OUT } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { StageType } from "./types"

function ResultLoadingPage({ setStage }: { setStage: (stage: StageType) => void }) {
  useEffect(() => {
    setTimeout(() => {
      setStage(StageType.RESULT)
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn("absolute inset-0 z-30 flex items-center justify-center h-full w-full")}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            y: 200,
          },
          animate: {
            opacity: 1,
            y: 0,
          },
          exit: {
            opacity: 0,
            y: 100,
          },
        }}
        transition={{
          opacity: {
            duration: 0.8,
          },
          y: {
            duration: 0.72,
            ease: EASE_OUT,
          },
        }}
        className={cn("flex flex-col justify-center items-center gap-5")}
      >
        <div className={cn("w-20 h-7 flex items-center justify-center")}>
          <div className={cn("inline-block", "loader-primary")}></div>
        </div>
        <span className={cn("text_13R text-string text-center")}>분석중...</span>
      </motion.div>
    </div>
  )
}

export default ResultLoadingPage
