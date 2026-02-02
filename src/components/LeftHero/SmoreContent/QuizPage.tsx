"use client"

import Button from "@/components/Custom/Button"
import { quizAnimationThumbnailVariants, quizAnimationVariants } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import DefaultProgressBar from "./DefaultProgressBar"
import type { Answer, Question, QuestionTransitioningType } from "./types"
import { StageType } from "./types"

const beforeChildrenTransition = {
  when: "beforeChildren",
  staggerChildren: 0.068,
  duration: 0,
} as const

function QuizPage({
  questionProgressIndex,
  stage,
  transitioning,
  questionIndex,
  onChangeAnswer,
  answerStopper,
  question,
}: {
  stage: StageType
  questionProgressIndex: number
  questionIndex: number
  transitioning: QuestionTransitioningType
  onChangeAnswer: (answerIndex: number, isReverse?: boolean) => void
  answerStopper: React.RefObject<boolean>
  question?: Question | null
}) {
  return (
    question && (
      <motion.div
        initial="initial"
        animate={transitioning}
        variants={{
          initial: {
            opacity: 0,
            transition: beforeChildrenTransition,
          },
          stable: {
            opacity: 1,
          },
          outgoing: {
            opacity: 1,
            transition: beforeChildrenTransition,
          },
          incoming: {
            opacity: 1,
            transition: {
              ...beforeChildrenTransition,
              delay: questionIndex === 0 ? 0.3 : 0,
            },
          },
          comeBack: {
            opacity: 1,
            transition: beforeChildrenTransition,
          },
          goBack: {
            opacity: 1,
            transition: beforeChildrenTransition,
          },
        }}
        className={cn("w-full h-full relative")}
      >
        <DefaultProgressBar
          stage={stage}
          questionProgressIndex={questionProgressIndex}
          index={questionIndex}
          transitioning={transitioning}
          onChangeAnswer={onChangeAnswer}
        />

        <div
          id="main-container"
          className={cn(
            "w-full h-auto",
            "flex flex-col items-center",
            "absolute z-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            transitioning !== "stable" ? "select-none cursor-default" : "",
          )}
        >
          <div className={cn("flex justify-evenly items-center flex-col", "w-[90%] h-full pt-15")}>
            {question.image && (
              <motion.img
                variants={quizAnimationThumbnailVariants}
                className={cn("aspect-16/10 w-full h-full border-0 rounded-[1rem] mb-4")}
                src={question.image}
                alt={question.title}
              />
            )}
            <motion.div variants={quizAnimationVariants} className={cn("relative w-full")}>
              <p className={cn("text-2xl font-bold text-center ml-0.5 text-white transition-colors")}>
                Q{questionIndex + 1}.
              </p>
            </motion.div>
            <motion.div
              variants={quizAnimationVariants}
              className={cn(
                "relative my-1.25 mb-2.5 w-full will-change-transform flex justify-center items-center flex-row",
              )}
            >
              <div
                className={cn(
                  "block inset-0 m-auto h-auto overflow-hidden outline-none py-4 transition-[border] duration-200 ease-in-out",
                  "text_16R",
                  "text-string",
                )}
              >
                <p className={cn("text-center")} dangerouslySetInnerHTML={{ __html: question.title }}></p>
              </div>
            </motion.div>
            <div
              id="answer-container"
              className={cn("relative w-full top-0 flex justify-evenly items-center flex-col", "h-70")}
            >
              {question.answers.map((answer: Answer, index: number) => (
                <motion.div
                  variants={quizAnimationVariants}
                  key={`${answer.index}-${questionIndex}`}
                  className={cn("w-full h-auto relative flex-[0_1_auto] my-1.25 mx-0")}
                >
                  <Button
                    isSmallSize={true}
                    isStable={transitioning === "stable"}
                    className={cn("w-full", transitioning !== "stable" ? "cursor-default!" : "cursor-pointer")}
                    onClick={() => {
                      console.log("onClick", answerStopper.current, transitioning)
                      if (transitioning === "stable" && !answerStopper.current) {
                        answerStopper.current = true
                        onChangeAnswer(index)
                      }
                    }}
                  >
                    {answer.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  )
}

export default QuizPage
