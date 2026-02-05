/* eslint-disable @typescript-eslint/no-explicit-any */
import { EASE_OUT } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion, useAnimate, useMotionValue, useTransform, type Easing } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import type { TConductorInstance } from "react-canvas-confetti/dist/types"
import { CanapeStep } from "./types"

const getRootFontSizePx = () => {
  if (typeof window === "undefined") return 16
  const size = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
  return Number.isFinite(size) && size > 0 ? size : 16
}
const remToPx = (valueInRem: number) => valueInRem * getRootFontSizePx()
const rem = (valueInRem: number) => `${valueInRem}rem`

const CUP_SIZE_REM = {
  W: 5.25, // 84px
  H: 7.5, // 120px
  GAP: 1.5, // 24px
} as const
const CUP_STEP_REM = CUP_SIZE_REM.W + CUP_SIZE_REM.GAP
const cupLeftX = (slotIndex: 0 | 1 | 2) => rem(CUP_STEP_REM * slotIndex)
const cupMiddleX = (slotIndex: 0 | 1 | 2) => rem(CUP_STEP_REM * (slotIndex - 1))
const cupRightX = (slotIndex: 0 | 1 | 2) => rem(CUP_STEP_REM * (slotIndex - 2))

const SHUFFLE_ANIMATION = (opt?: {
  duration?: number
  delay?: number
}): {
  duration: number
  ease: Easing | Easing[] | undefined
  delay: number
} => ({
  duration: opt?.duration ?? 0.17,
  ease: "easeOut",
  delay: opt?.delay ?? 0.1,
})
const MOVE_FRONT = {
  y: [rem(0), rem(0.4375), rem(0)], // 7px
  scale: [1, 1.07, 1],
  zIndex: 20,
} as const
const MOVE_BACK = {
  y: [rem(0), rem(-0.4375), rem(0)], // -7px
  scale: [1, 0.93, 1],
  zIndex: 10,
} as const

const getRandomMove = () => {
  return Math.random() > 0.5 ? MOVE_FRONT : MOVE_BACK
}

const getMove = (index1: number, index2: number, curIndex: number[], element: number[]) => {
  const pos1 = curIndex.indexOf(index1)
  const pos2 = element.indexOf(index1)
  const otherPos1 = curIndex.indexOf(index2)
  const otherPos2 = element.indexOf(index2)

  if (pos1 === otherPos2 && pos2 === otherPos1) {
    return pos1 < pos2 ? MOVE_FRONT : MOVE_BACK
  }

  return getRandomMove()
}

function generateShuffleSequence(length = 10): number[][] {
  const generateRandomArray = (): number[] => {
    const arr = [0, 1, 2]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const result: number[][] = []

  // 첫 번째 배열 생성 ([0,1,2]가 아닌 랜덤 배열)
  let current: number[]
  do {
    current = generateRandomArray()
  } while (current[0] === 0 && current[1] === 1 && current[2] === 2)

  result.push(current)
  let index = 0

  while (index < length) {
    const next = generateRandomArray()
    const prev = result[result.length - 1]
    if (prev[0] === next[0] && prev[1] === next[1] && prev[2] === next[2]) continue
    result.push(next)
    index++
  }

  return result
}

export default function ShellGame({
  conductor,
  setStep,
  setMessage,
}: {
  conductor: TConductorInstance
  setStep: (step: CanapeStep) => void
  setMessage: (message: string) => void
}) {
  const [leftCupScope, leftCupAnimate] = useAnimate()
  const [middleCupScope, middleCupAnimate] = useAnimate()
  const [rightCupScope, rightCupAnimate] = useAnimate()
  const [ballScope, ballAnimate] = useAnimate()
  const [isOnGrab, setIsOnGrab] = useState(false)
  const [stage, setStage] = useState<"pending" | "shuffling" | "readyToInteraction" | "interacting" | "done">("pending")

  const currentAnimationsRef = useRef<any[]>([])
  const isResettingRef = useRef(false)

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const [selectedCupIndex, setSelectedCupIndex] = useState<number | null>(null)
  const [isShowBean, setIsShowBean] = useState(false)

  // 드래그 입력은 px 단위로 들어오므로, "기준값"만 rem로 정의하고 런타임에 px로 환산합니다.
  const DRAG_LIFT_REM = 4.375 // 70px
  const DRAG_THRESHOLD_REM = 7.5 // 120px
  const dragLiftPx = remToPx(DRAG_LIFT_REM)
  const dragThresholdPx = remToPx(DRAG_THRESHOLD_REM)

  const dragY1 = useMotionValue(0)
  const dragY2 = useMotionValue(0)
  const dragY3 = useMotionValue(0)
  const putItUp1 = useTransform(dragY1, [0, -dragLiftPx], {
    rotate: [0, -35],
    y: [rem(0), rem(-1.875)], // -30px
    x: [rem(0), rem(-1.875)], // -30px
  })
  const putItUp2 = useTransform(dragY2, [0, -dragLiftPx], {
    rotate: [0, 0],
    y: [rem(0), rem(-3.125)], // -50px
    x: [rem(0), rem(0)],
  })
  const putItUp3 = useTransform(dragY3, [0, -dragLiftPx], {
    rotate: [0, 35],
    y: [rem(0), rem(-1.875)], // -30px
    x: [rem(0), rem(1.875)], // 30px
  })

  const onStart = useCallback(async () => {
    if (stage !== "pending") return

    isResettingRef.current = false
    setStage("shuffling")
    let curIndex = [0, 1, 2]

    try {
      ballAnimate(ballScope.current, { y: rem(1.25) }, { duration: 0 }) // 20px
      await middleCupAnimate(middleCupScope.current, { y: rem(-3.125) }, { duration: 0.25, ease: "easeOut" }) // -50px

      await ballAnimate(
        ballScope.current,
        {
          x: [
            rem(0),
            rem(0.3125),
            rem(-0.3125),
            rem(0.3125),
            rem(-0.3125),
            rem(0.3125),
            rem(-0.3125),
            rem(0.3125),
            rem(-0.3125),
            rem(0.3125),
            rem(0),
          ], // ±5px
        },
        {
          duration: 1,
          ease: "circOut",
        },
      )
      await new Promise((resolve) => setTimeout(resolve, 200))

      await middleCupAnimate(middleCupScope.current, { y: rem(0) }, { duration: 0.25, ease: "easeOut" })
      ballAnimate(ballScope.current, { opacity: 0 }, { duration: 0 })

      await new Promise((resolve) => setTimeout(resolve, 300))

      for (const element of generateShuffleSequence(10)) {
        const left = element.indexOf(0)
        const middle = element.indexOf(1)
        const right = element.indexOf(2)
        const sameLeft = left === curIndex.indexOf(0)
        const sameMiddle = middle === curIndex.indexOf(1)
        const sameRight = right === curIndex.indexOf(2)

        const animations = []
        if (!sameLeft)
          animations.push(
            leftCupAnimate(
              leftCupScope.current,
              {
                ...getMove(0, 1, curIndex, element),
                x: cupLeftX(left as 0 | 1 | 2),
              },
              SHUFFLE_ANIMATION(),
            ),
          )

        if (!sameMiddle)
          animations.push(
            middleCupAnimate(
              middleCupScope.current,
              {
                ...getMove(1, 2, curIndex, element),
                x: cupMiddleX(middle as 0 | 1 | 2),
              },
              SHUFFLE_ANIMATION(),
            ),
          )

        if (!sameRight)
          animations.push(
            rightCupAnimate(
              rightCupScope.current,
              {
                ...getMove(2, 0, curIndex, element),
                x: cupRightX(right as 0 | 1 | 2),
              },
              SHUFFLE_ANIMATION(),
            ),
          )

        await Promise.all(animations)
        curIndex = element
      }

      // reset
      const finalResetAnimations = [
        leftCupAnimate(leftCupScope.current, { rotate: 0, y: rem(0), x: rem(0) }, { duration: 0 }),
        middleCupAnimate(middleCupScope.current, { rotate: 0, y: rem(0), x: rem(0) }, { duration: 0 }),
        rightCupAnimate(rightCupScope.current, { rotate: 0, y: rem(0), x: rem(0) }, { duration: 0 }),
      ]
      currentAnimationsRef.current = finalResetAnimations
      await Promise.all(finalResetAnimations)
      if (isResettingRef.current) return

      // 골라주세요 애니메이션
      const bounceAnimations = [
        leftCupAnimate(
          leftCupScope.current,
          { y: [rem(0), rem(-0.4375), rem(0)] },
          { duration: 0.5, ease: "circInOut", delay: 0.35 },
        ), // -7px
        middleCupAnimate(
          middleCupScope.current,
          { y: [rem(0), rem(-0.4375), rem(0)] }, // -7px
          { duration: 0.5, ease: "circInOut", delay: 0.35 + 0.1 },
        ),
        rightCupAnimate(
          rightCupScope.current,
          { y: [rem(0), rem(-0.4375), rem(0)] }, // -7px
          { duration: 0.5, ease: "circInOut", delay: 0.35 + 0.22 },
        ),
      ]
      currentAnimationsRef.current = bounceAnimations
      await Promise.all(bounceAnimations)
      if (isResettingRef.current) return

      setStage("readyToInteraction")
      setMessage("드래그해서 컵을 올려주세요!")
    } catch {
      console.log("Animation interrupted")
    }
  }, [
    stage,
    leftCupAnimate,
    leftCupScope,
    middleCupAnimate,
    middleCupScope,
    rightCupAnimate,
    rightCupScope,
    ballAnimate,
    ballScope,
    setMessage,
  ])

  const onFinish = useCallback(
    async (index: number) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      switch (index) {
        case 0:
          await middleCupAnimate(
            middleCupScope.current,
            { rotate: 0, y: rem(-1.9375), x: rem(0), opacity: 0 },
            { duration: 0.3 },
          ) // -31px
          await rightCupAnimate(
            rightCupScope.current,
            { rotate: 35, y: rem(-1.25), x: rem(1.875), opacity: 0 },
            { duration: 0.3 },
          ) // -20px, 30px
          break
        case 1:
          await leftCupAnimate(
            leftCupScope.current,
            { rotate: -35, y: rem(-1.25), x: rem(-1.875), opacity: 0 },
            { duration: 0.3 },
          ) // -20px, -30px
          await rightCupAnimate(
            rightCupScope.current,
            { rotate: 35, y: rem(-1.25), x: rem(1.875), opacity: 0 },
            { duration: 0.3 },
          ) // -20px, 30px
          break
        case 2:
          await leftCupAnimate(
            leftCupScope.current,
            { rotate: -35, y: rem(-1.25), x: rem(-1.875), opacity: 0 },
            { duration: 0.3 },
          ) // -20px, -30px
          await middleCupAnimate(
            middleCupScope.current,
            { rotate: 0, y: rem(-1.9375), x: rem(0), opacity: 0 },
            { duration: 0.3 },
          ) // -31px
          break
        default:
          break
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
      setIsShowBean(true)
      setTimeout(() => {
        conductor?.shoot()
        const timer = setTimeout(() => {
          conductor?.stop()
        }, 1000)
        setMessage("축하해요 아메리카노에 당첨되셨네요! ☕️")

        clearTimeout(timer)
      }, 1500)
      setTimeout(() => {
        setMessage("한 번 돌려보시겠어요? 🎁")
        setStep(CanapeStep.ROULETTE)
      }, 1500 + 3500)
    },
    [
      conductor,
      leftCupAnimate,
      leftCupScope,
      middleCupAnimate,
      middleCupScope,
      rightCupAnimate,
      rightCupScope,
      setMessage,
      setStep,
    ],
  )

  useEffect(() => {
    setTimeout(() => {
      onStart()
    }, 1500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => clearAll, [])

  return (
    <motion.div
      initial="initial"
      animate="visible"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: rem(18.75), // 300px
        },
        visible: {
          opacity: 1,
          y: rem(0),
          transition: {
            y: {
              duration: 1.12,
              ease: [0.21, 0.88, 0.29, 1],
              delay: 0.3,
            },
            opacity: {
              duration: 0.4,
              delay: 0.3,
            },
          },
        },
        exit: {
          opacity: 0,
          y: 300,
          transition: {
            y: {
              duration: 1.12,
              ease: [0.21, 0.88, 0.29, 1],
            },
            opacity: {
              duration: 0.4,
            },
          },
        },
      }}
      className={cn(
        "w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pb-10",
      )}
    >
      <div className={cn("grid grid-cols-3 gap-6 relative z-20")}>
        <div className={cn("relative z-20 w-21 h-30")}>
          {stage === "readyToInteraction" && typeof selectedCupIndex !== "number" && (
            <motion.div
              drag="y"
              dragDirectionLock={true}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              dragPropagation={false}
              style={{ y: dragY1 }}
              onDragStart={() => {
                setIsOnGrab(true)
              }}
              onDragEnd={(_, info) => {
                setIsOnGrab(false)
                if (info.point.y <= dragY1.get() && info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(0)
                  dragY1.set(Math.min(info.point.y, -dragThresholdPx))
                  onFinish(0)
                } else if (info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(0)
                  dragY1.set(-dragThresholdPx)
                  onFinish(0)
                }
              }}
              className={cn(
                "w-full h-full z-100 absolute inset-0",
                // drag 중이면 grabbing, 아니면 grab 커서
                isOnGrab ? "cursor-grabbing" : "cursor-grab",
              )}
            />
          )}
          <motion.img
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            initial="initial"
            animate={isShowBean && selectedCupIndex === 0 ? "visible" : "initial"}
            variants={{
              initial: {
                opacity: 0,
                y: rem(-2.8125), // -45px
                x: rem(0.3125), // 5px
                rotate: 0,
              },
              visible: {
                opacity: 1,
                y: rem(0.4375), // 7px
                x: rem(4.0625), // 65px
                rotate: 270,
              },
            }}
            transition={{
              y: {
                duration: 1.3,
                ease: EASE_OUT,
              },
              x: {
                duration: 1.3,
                ease: EASE_OUT,
              },
              rotate: {
                duration: 1.1,
                ease: EASE_OUT,
              },
              opacity: {
                duration: 0,
              },
            }}
            src={"https://cdn.creazilla.com/cliparts/59638/coffee-beans-publicdomain-clipart-xl.png"}
            alt="cup-1"
            className={cn("absolute bottom-0 w-10 h-10")}
          />
          <motion.div
            style={{
              rotate: selectedCupIndex === 0 ? -35 : putItUp1.rotate,
              y: selectedCupIndex === 0 ? rem(-1.875) : putItUp1.y, // -30px
              x: selectedCupIndex === 0 ? rem(-1.875) : putItUp1.x, // -30px
            }}
            transition={{ duration: 0.3 }}
            ref={leftCupScope}
            className={cn("w-full h-full relative z-20", "")}
          >
            <img
              src={"/images/cup.png"}
              alt="cup-1"
              className={cn("select-none w-full h-full rotate-180")}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </motion.div>
        </div>
        <div className={cn("relative z-20 w-21 h-30")}>
          {stage === "readyToInteraction" && typeof selectedCupIndex !== "number" && (
            <motion.div
              drag="y"
              dragDirectionLock={true}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              dragPropagation={false}
              style={{ y: dragY2 }}
              onDragStart={() => {
                setIsOnGrab(true)
              }}
              onDragEnd={(_, info) => {
                setIsOnGrab(false)
                if (info.point.y <= dragY2.get() && info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(1)
                  dragY2.set(Math.min(info.point.y, -dragThresholdPx))
                  onFinish(1)
                } else if (info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(1)
                  dragY2.set(-dragThresholdPx)
                  onFinish(1)
                }
              }}
              className={cn(
                "w-full h-full z-100 absolute inset-0",
                // drag 중이면 grabbing, 아니면 grab 커서
                isOnGrab ? "cursor-grabbing" : "cursor-grab",
              )}
            />
          )}
          <motion.img
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            initial="initial"
            animate={isShowBean && selectedCupIndex === 1 ? "visible" : "initial"}
            variants={{
              initial: {
                opacity: 0,
                y: rem(-3.125), // -50px
                x: "-50%",
                rotate: 0,
              },
              visible: {
                opacity: 1,
                y: rem(0.4375), // 7px
                x: "-50%",
                rotate: -45 - 122,
              },
            }}
            transition={{
              y: {
                duration: 0.7,
                ease: EASE_OUT,
              },
              rotate: {
                duration: 1.1,
                ease: EASE_OUT,
              },
              opacity: {
                duration: 0,
              },
            }}
            src={"https://cdn.creazilla.com/cliparts/59638/coffee-beans-publicdomain-clipart-xl.png"}
            alt="bean-2"
            className={cn("absolute left-1/2 bottom-0 w-10 h-10")}
          />
          <motion.div
            style={{
              rotate: selectedCupIndex === 1 ? 0 : putItUp2.rotate,
              y: selectedCupIndex === 1 ? rem(-3.125) : putItUp2.y, // -50px
              x: selectedCupIndex === 1 ? rem(0) : putItUp2.x,
            }}
            ref={middleCupScope}
            className={cn("w-full h-full relative z-20")}
          >
            <img
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              src={"/images/cup.png"}
              alt="cup-2"
              className={cn("select-none w-full h-full rotate-180")}
            />
          </motion.div>
        </div>
        <div className={cn("relative z-20 w-21 h-30")}>
          {stage === "readyToInteraction" && typeof selectedCupIndex !== "number" && (
            <motion.div
              drag="y"
              dragDirectionLock={true}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragMomentum={false}
              dragPropagation={false}
              style={{ y: dragY3 }}
              onDragStart={() => {
                setIsOnGrab(true)
              }}
              onDragEnd={(_, info) => {
                setIsOnGrab(false)
                if (info.point.y <= dragY3.get() && info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(2)
                  dragY3.set(Math.min(info.point.y, -dragThresholdPx))
                  onFinish(2)
                } else if (info.offset.y <= -dragThresholdPx) {
                  setSelectedCupIndex(2)
                  dragY3.set(-dragThresholdPx)
                  onFinish(2)
                }
              }}
              className={cn(
                "w-full h-full z-100 absolute inset-0",
                // drag 중이면 grabbing, 아니면 grab 커서
                isOnGrab ? "cursor-grabbing" : "cursor-grab",
              )}
            />
          )}
          <motion.img
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            initial="initial"
            animate={isShowBean && selectedCupIndex === 2 ? "visible" : "initial"}
            variants={{
              initial: {
                opacity: 0,
                y: rem(-2.5), // -40px
                x: rem(3.125), // 50px
                rotate: 0,
              },
              visible: {
                opacity: 1,
                y: rem(0.4375), // 7px
                x: rem(-1.25), // -20px
                rotate: -270,
              },
            }}
            transition={{
              y: {
                duration: 1.3,
                ease: EASE_OUT,
              },
              x: {
                duration: 1.3,
                ease: EASE_OUT,
              },
              rotate: {
                duration: 1.1,
                ease: EASE_OUT,
              },
              opacity: {
                duration: 0,
              },
            }}
            src={"https://cdn.creazilla.com/cliparts/59638/coffee-beans-publicdomain-clipart-xl.png"}
            alt="bean-3"
            className={cn("absolute bottom-0 w-10 h-10")}
          />
          <motion.div
            style={{
              rotate: selectedCupIndex === 2 ? 35 : putItUp3.rotate,
              y: selectedCupIndex === 2 ? rem(-1.875) : putItUp3.y, // -30px
              x: selectedCupIndex === 2 ? rem(1.875) : putItUp3.x, // 30px
            }}
            ref={rightCupScope}
            className={cn("w-full h-full relative z-20")}
          >
            <img
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              src={"/images/cup.png"}
              alt="cup-3"
              className={cn("select-none w-full h-full rotate-180")}
            />
          </motion.div>
        </div>
      </div>
      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10")}>
        <motion.img
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          ref={ballScope}
          src={"https://cdn.creazilla.com/cliparts/59638/coffee-beans-publicdomain-clipart-xl.png"}
          alt="cup"
          className={cn("w-10 h-10")}
        />
      </div>
    </motion.div>
  )
}
