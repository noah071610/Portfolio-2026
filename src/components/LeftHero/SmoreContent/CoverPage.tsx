"use client"

import { imageAssets } from "@/data/images"
import { fadeUpStaggerAnimation } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next" // 추가
import Button from "../../Custom/Button"
import { StageType } from "./types"

function CoverPage({ stage, onChangeStage }: { stage: StageType; onChangeStage: (stage: StageType) => void }) {
  const { t } = useTranslation() // 추가

  return (
    <motion.div
      initial="initial"
      animate={stage === StageType.COVER ? "visible" : "exit"}
      variants={{
        initial: {
          opacity: 1,
        },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.12,
            delay: 0.3,
          },
        },
        exit: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.08,
          },
        },
      }}
      className={cn("w-full h-full relative")}
    >
      <div
        className={cn(
          "w-full h-full",
          "flex items-center flex-col justify-evenly",
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "h-[80%]",
        )}
      >
        <div className={cn("w-full flex flex-col items-center gap-2")}>
          <motion.h2 {...fadeUpStaggerAnimation} className="w-full text-center text-2xl font-bold">
            {t("event.cover.title")}
          </motion.h2>
          <motion.p
            {...fadeUpStaggerAnimation}
            className="text-sm text-description wrap-normal text-center"
            dangerouslySetInnerHTML={{ __html: t("event.cover.subtitle") }}
          />
        </div>
        <motion.img
          {...fadeUpStaggerAnimation}
          className={cn(
            "relative overflow-hidden mb-2 rounded-[15px] object-cover bg-center bg-no-repeat",
            "bg-white",
            "w-full aspect-16/12",
          )}
          src={imageAssets.quiz.thumbnail}
          alt="thumbnail"
        />
        <motion.div {...fadeUpStaggerAnimation} className={cn("w-full h-auto relative flex-[0_1_auto] my-1.25")}>
          <Button
            className="w-[80%]"
            onClick={() => {
              onChangeStage(StageType.QUIZ)
            }}
          >
            {t("event.cover.button")}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CoverPage
