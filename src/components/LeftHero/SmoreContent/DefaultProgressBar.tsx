import { EASE_OUT } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { IoIosArrowDropleftCircle } from "react-icons/io"
import { eventData } from "./contants"
import { StageType, type QuestionTransitioningType } from "./types"
const BAR_DURATION = 0.74

function DefaultProgressBar({
  stage,
  questionProgressIndex,
  index,
  transitioning,
  onChangeAnswer,
}: {
  stage: StageType
  questionProgressIndex: number
  index: number
  transitioning: QuestionTransitioningType
  onChangeAnswer: (answerIndex: number, isReverse?: boolean) => void
}) {
  return (
    <motion.div
      id="quiz-info-container"
      initial="initial"
      animate={stage === StageType.QUIZ ? "animate" : "end"}
      variants={{
        initial: { opacity: 0, y: -20, transition: { duration: 0.5 } },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            y: { duration: 0.8, delay: 0.65, ease: [0.21, 0.88, 0.29, 1] },
            opacity: { duration: 0.4, delay: 0.65 },
          },
        },
        end: {
          opacity: 0,
          y: 5,
          scale: 0.5,
          transition: {
            y: { duration: 0.3 },
            opacity: { duration: 0.3 },
            scale: {
              duration: 0.4,
              ease: EASE_OUT,
            },
          },
        },
      }}
    >
      <div className={cn("w-[80%] text-right mx-auto")}>
        <span className="text_12R text-white/20">
          {questionProgressIndex + 1 > eventData.questions.length
            ? eventData.questions.length
            : questionProgressIndex + 1}
        </span>
        <span className="text_12R text-white/20">/{eventData.questions.length}</span>
      </div>
      <div
        className={cn(
          "w-[85%] right-0 left-0 ml-auto mr-auto z-100 relative h-6.25 top-0 rounded-[6.3rem] flex justify-center items-center gap-1.25 flex-row",
        )}
      >
        <IoIosArrowDropleftCircle
          onClick={() => {
            if (index !== 0 && transitioning === "stable") {
              onChangeAnswer(index, true)
            }
          }}
          className={cn(
            "size-5 transition-colors",
            index === 0 || transitioning !== "stable" ? "cursor-default" : "cursor-pointer",
            questionProgressIndex === 0 ? "text-[#cccccc]" : "text-main",
          )}
        />
        <div className={cn("bg-white/30 h-4 rounded-[6.3rem] w-[95%] overflow-x-hidden")}>
          <motion.div
            className={cn("rounded-[100px] bg-[#3e3267] max-w-full min-w-[0.01px] h-4 relative origin-left")}
            initial={{ width: "0%" }}
            animate={{
              width:
                questionProgressIndex + 1 > eventData.questions.length
                  ? "100%"
                  : questionProgressIndex === 0
                    ? "0%"
                    : `${(questionProgressIndex / eventData.questions.length) * 100 - 3}%`,
            }}
            transition={{
              width: {
                duration: BAR_DURATION,
                ease: [0.075, 0.82, 0.165, 1],
              },
              backgroundColor: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default DefaultProgressBar
