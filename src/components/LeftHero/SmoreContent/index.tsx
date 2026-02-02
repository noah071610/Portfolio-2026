import { cn } from "@/lib/utils"
import { AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { eventData, initialAnswerSheet } from "./contants"
import CoverPage from "./CoverPage"
import QuizPage from "./QuizPage"
import ResultLoadingPage from "./ResultLoadingPage"
import ResultCardPage from "./ResultPage"
import { StageType, type AnswerSheet, type QuestionTransitioningType } from "./types"

const TRANSITION_DURATION = 1000

export default function SmoreContent() {
  const [stage, setStage] = useState(StageType.COVER)
  const [questionStep, setQuestionStep] = useState(0)
  const [questionProgressIndex, setQuestionProgressIndex] = useState(0)
  const [answerSheet, setAnswerSheet] = useState<AnswerSheet>(initialAnswerSheet)
  const [transitioning, setTransitioning] = useState<QuestionTransitioningType>("incoming")
  const answerStopper = useRef(false)
  const [result, setResult] = useState<number>(0)
  const currentQuestion = eventData.questions[questionStep] ?? null

  const onChangeStage = (stage: StageType) => {
    if (stage === StageType.QUIZ) {
      setStage(StageType.COVER_END)
      setTimeout(
        () => {
          setStage(StageType.QUIZ)
        },
        TRANSITION_DURATION / 2 - 100,
      )
      setTimeout(() => {
        setTransitioning("stable")
      }, TRANSITION_DURATION - 100)
    } else if (stage === StageType.RESULT) {
      setStage(StageType.RESULT)
    }
  }

  const onChangeAnswer = (answerIndex: number, isReverse: boolean = false) => {
    const next = isReverse ? -1 : 1
    const currentAnswerLength = currentQuestion?.answers.length ?? 0

    setTransitioning(isReverse ? "goBack" : "outgoing")
    setQuestionProgressIndex((prev) => prev + next)

    // 종료
    if (!isReverse && questionStep === eventData.questions.length - 1) {
      let finalAnswerSheet = { ...answerSheet }

      const target = eventData.questions[questionStep].answers[answerIndex]
      if (!target) return alert("결과가 없습니다.")

      const newPoint = finalAnswerSheet.point + target.point

      finalAnswerSheet = {
        ...finalAnswerSheet,
        point: newPoint,
        selected: [...finalAnswerSheet.selected, eventData.questions[questionStep].answers[answerIndex]],
      }

      setAnswerSheet(finalAnswerSheet)

      setResult(Math.ceil(newPoint / eventData.questions.length))

      setTimeout(() => {
        setStage(StageType.RESULT_LOADING)
      }, TRANSITION_DURATION / 1.5)
      return
    }

    // 뒤로가기 할 수 없음
    if (isReverse && questionStep === 0) {
      return
    }

    setTimeout(
      () => {
        setQuestionStep((prev) => prev + next)
        if (isReverse) {
          // 이전 질문으로 이동
          setAnswerSheet((sheet) => {
            const target = sheet.selected[sheet.selected.length - 1]

            if (target) {
              const newPoint = sheet.point - target.point

              return {
                ...sheet,
                point: newPoint,
                selected: sheet.selected.slice(0, -1),
              }
            }
            return sheet
          })
        } else {
          // 다음 질문으로 이동
          setAnswerSheet((sheet) => {
            const target = eventData.questions[questionStep].answers[answerIndex]

            if (target) {
              // 새로운 points 배열 생성 (불변성 유지)
              const newPoint = sheet.point + target.point

              return {
                ...sheet,
                point: newPoint,
                selected: [...sheet.selected, eventData.questions[questionStep].answers[answerIndex]],
              }
            }
            return sheet
          })
        }
        setTransitioning(isReverse ? "comeBack" : "incoming")
      },
      TRANSITION_DURATION / 1.7 - (currentAnswerLength <= 2 ? 200 : 0),
    )
    setTimeout(
      () => {
        // Ready to interact
        setTransitioning("stable")
        answerStopper.current = false
      },
      TRANSITION_DURATION - (currentAnswerLength <= 2 ? 200 : 0),
    )
  }

  return (
    <div className={cn("w-full h-full relative", stage === StageType.RESULT ? "overflow-hidden" : "")}>
      <AnimatePresence>
        {(stage === StageType.COVER || stage === StageType.COVER_END) && (
          <CoverPage stage={stage} onChangeStage={onChangeStage} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(stage === StageType.QUIZ || stage === StageType.RESULT_LOADING) && (
          <QuizPage
            question={currentQuestion}
            questionProgressIndex={questionProgressIndex}
            answerStopper={answerStopper}
            transitioning={transitioning}
            onChangeAnswer={onChangeAnswer}
            questionIndex={questionStep}
            stage={stage}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {stage === StageType.RESULT_LOADING && <ResultLoadingPage setStage={setStage} />}
      </AnimatePresence>
      <AnimatePresence>{stage === StageType.RESULT && <ResultCardPage result={result} />}</AnimatePresence>
    </div>
  )
}
