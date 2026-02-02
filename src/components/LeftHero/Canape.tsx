import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Realistic from "react-canvas-confetti/dist/presets/realistic"
import type { TConductorInstance } from "react-canvas-confetti/dist/types"
import { TypeAnimation } from "react-type-animation"
import Roulette from "./CanapeContent/Roulette"
import ShellGame from "./CanapeContent/ShellGame"
import { CanapeStep } from "./CanapeContent/types"

export default function Canape() {
  const [step, setStep] = useState(CanapeStep.ROULETTE)
  const [message, setMessage] = useState("한 번 돌려보시겠어요? 🎁")
  const [conductor, setConductor] = useState<TConductorInstance | null>(null)
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor)
  }

  return (
    <>
      <Realistic
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000,
          pointerEvents: "none",
        }}
        onInit={onInit}
      />
      <motion.div
        initial="initial"
        animate="visible"
        variants={{
          initial: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              duration: 0.45,
            },
          },
        }}
        className={cn("w-full h-full")}
      >
        <AnimatePresence>
          {step === CanapeStep.ROULETTE && (
            <Roulette setStep={setStep} setMessage={setMessage} conductor={conductor as TConductorInstance} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === CanapeStep.SHELL_GAME && (
            <ShellGame setStep={setStep} setMessage={setMessage} conductor={conductor as TConductorInstance} />
          )}
        </AnimatePresence>
      </motion.div>
      <div className={cn("w-full absolute left-1/2 -translate-x-1/2 bottom-6")}>
        <div className={cn("w-[80%] mx-auto bg-mainBg rounded-lg border border-border py-5 px-7")}>
          <TypeAnimation
            key={message}
            className={cn("text-md text-white")}
            wrapper="p"
            sequence={[message]}
            omitDeletionAnimation={true}
            speed={60}
          />
        </div>
      </div>
    </>
  )
}
