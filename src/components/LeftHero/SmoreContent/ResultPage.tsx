"use client"

import { imageAssets } from "@/data/images"
import { EASE_OUT } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const STAGGER_DELAY = 0.14

function ResultCardPage({ result }: { result: number }) {
  const { t } = useTranslation()

  return (
    <div className={cn("w-full h-full absolute inset-0 overflow-scroll")}>
      <motion.div
        initial="initial"
        animate="visible"
        variants={{
          initial: {
            opacity: 0,
            y: "50%",
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className={cn("z-99 w-full h-fit min-h-full mx-auto flex flex-col items-center pb-25", "bg-mainBg")}
      >
        <div className="w-full relative top-0 h-0 pb-[100%]">
          <div
            className="absolute w-full h-0 z-3 bg-white"
            style={{
              paddingBottom: "calc(100% + 0.5rem)",
            }}
          ></div>
          <div
            className={cn("absolute w-full z-10 h-0 pb-[calc(100%+0.5rem)] bg-center bg-cover bg-no-repeat")}
            style={{
              backgroundImage: `url('${imageAssets.quiz.result}')`,
            }}
          ></div>
        </div>
        <motion.div
          id="result-card"
          initial="initial"
          animate="visible"
          variants={{
            initial: {
              opacity: 0,
              y: 150,
            },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            y: {
              duration: 1.2,
              ease: [0.21, 0.88, 0.29, 1],
              delay: STAGGER_DELAY,
            },
            opacity: {
              duration: 0.7,
              delay: STAGGER_DELAY,
            },
          }}
          className={cn(
            "bg-subBg max-w-112.5 w-[93%] -mt-5 rounded-[1.25rem] py-6 px-6 relative h-auto mb-6 flex justify-center items-center flex-col z-5 right-0 left-0 ml-auto mr-auto",
          )}
          style={{
            boxShadow: "rgba(182, 182, 182, 0.19) 0px 5px 15px 0px",
          }}
        >
          <div className={cn("w-full relative flex flex-col items-center h-auto")}>
            <label className={cn("text-xs text-description font-semibold")}>{t("event.result.label")}</label>
            <h1 className={cn("text-2xl font-bold text-white")}>
              {result}
              {"%"}
            </h1>
          </div>
          <div className={cn("relative w-full mt-5 mb-6 h-1.25")}>
            <div
              className={cn("absolute h-full right-0 left-0 ml-auto mr-auto w-7.5 bg-[rgba(180,180,180,0.25)]")}
            ></div>
          </div>
          <div className={cn("w-full flex flex-col gap-3")}>
            <p className={cn("text-sm leading-6 text-white")}>{t("event.result.desc_1")}</p>
            <p className={cn("text-sm leading-6 text-white")}>{t("event.result.desc_2")}</p>
            <p className={cn("text-sm leading-6 text-white")}>{t("event.result.desc_3")}</p>

            <p
              className={cn("text-sm leading-6 text-white")}
              dangerouslySetInnerHTML={{
                __html:
                  result >= 90 ? t("event.result.match_high", { result }) : t("event.result.match_low", { result }),
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ResultCardPage
