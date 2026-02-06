/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useAnimate } from "framer-motion"

import { imageAssets } from "@/data/images"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState, type FC } from "react"
import type { TConductorInstance } from "react-canvas-confetti/dist/types"
import { CARD_ANIMATION_DIRECTION, CARD_CONFIG, CARD_POSITION, POSITION_SHOW_REWARD_ARR } from "./lib/constants"
import { CanapeStep } from "./types"

enum TarotCardStage {
  PENDING = 0,
  WIDE = 1,
  READY_TO_INTERACTION = 2,
  DRAGGING = 3,
  SHOWING_REWARD = 4,
  DONE = 5,
}

const getRootFontSizePx = () => {
  if (typeof window === "undefined") return 16
  const raw = globalThis.getComputedStyle(document.documentElement).fontSize
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 16
}

const pxToRem = (px: number) => px / getRootFontSizePx()

const toRemMotion = <T extends { x: number; y: number }>(pos: T) => {
  return {
    ...pos,
    x: `${pos.x}rem`,
    y: `${pos.y}rem`,
  }
}

type CardPose = {
  x: number
  y: number
  rotate: number
  scale: number
}

const pickPose = (pos: CardPose): CardPose => ({
  x: pos.x,
  y: pos.y,
  rotate: pos.rotate,
  scale: pos.scale,
})

// 카드 위치/회전/y/scale을 재사용 가능한 배열로 선언 (x/y는 rem 기반 숫자 값)
const CARD_ANIMATION_STATES: CardPose[] = [
  pickPose(CARD_POSITION.RENDING.DOUBLE_RIGHT), // idx 0
  pickPose(CARD_POSITION.RENDING.RIGHT), // idx 1
  pickPose(CARD_POSITION.RENDING.CENTER), // idx 2 (center)
  pickPose(CARD_POSITION.RENDING.LEFT), // idx 3
  pickPose(CARD_POSITION.RENDING.DOUBLE_LEFT), // idx 4
]

type TarotCardProps = {
  conductor: TConductorInstance
  setStep: (step: CanapeStep) => void
  setMessage: (message: string) => void
}

const TarotCard: FC<TarotCardProps> = ({ conductor, setStep, setMessage }) => {
  const [stage, setStage] = useState(TarotCardStage.PENDING)
  const cardAnimationRefs = Array.from({ length: 7 }, useAnimate)
  const cardBackAnimationRef = useAnimate()

  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 })
  const currentAnimationsRef = useRef<any[]>([])
  const isResettingRef = useRef(false)
  const isStart = useRef(false)
  const cardIndexRef = useRef<number | null>(null)
  const isChangedIndexRef = useRef<boolean>(false)

  const onStart = async () => {
    // 카드 위치와 회전, y 애니메이션: 0, 4는 rotate, y를 많이 / 1, 3은 조금 덜 / 2는 고정

    const targetRefs = cardAnimationRefs.slice(1, 7)

    const [ghostScope, ghostAnimate] = cardAnimationRefs[0]
    await ghostAnimate(ghostScope.current, toRemMotion(CARD_POSITION.RENDING.TRIPLE_LEFT), { duration: 0 })

    const [ghostBackScope, ghostBackAnimate] = cardAnimationRefs[6]
    await ghostBackAnimate(
      ghostBackScope.current,
      toRemMotion({
        ...CARD_POSITION.RENDING.TRIPLE_RIGHT,
        y: -100 / 16,
      }),
      { duration: 0 },
    )

    await Promise.all(
      targetRefs.map(([scope, animate]) =>
        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[4] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        }),
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 160))

    await Promise.all(
      targetRefs.map(([scope, animate]) =>
        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[4] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        }),
      ),
    )

    await new Promise((resolve) => setTimeout(resolve, 100))

    await Promise.all(
      targetRefs.map(([scope, animate], index) => {
        if (index === 0) return

        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[3] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        })
      }),
    )

    await new Promise((resolve) => setTimeout(resolve, 120))

    await Promise.all(
      targetRefs.map(([scope, animate], index) => {
        if (index === 0 || index === 1) return

        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[2] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        })
      }),
    )

    await new Promise((resolve) => setTimeout(resolve, 100))

    await Promise.all(
      targetRefs.map(([scope, animate], index) => {
        if (index === 0 || index === 1 || index === 2) return

        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[1] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        })
      }),
    )

    await new Promise((resolve) => setTimeout(resolve, 80))

    await Promise.all(
      targetRefs.map(([scope, animate], index) => {
        if (index === 0 || index === 1 || index === 2 || index === 3) return

        animate(scope.current, toRemMotion({ ...CARD_ANIMATION_STATES[0] }), {
          duration: 0.6,
          ease: [0.21, 0.88, 0.29, 1],
        })
      }),
    )

    setTimeout(() => {
      setStage(TarotCardStage.READY_TO_INTERACTION)
      setMessage("좌우로 드래그해보세요!")
    }, 500)
  }

  // 마우스/터치 이벤트 핸들러
  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      if (stage < TarotCardStage.READY_TO_INTERACTION) return
      if (stage >= TarotCardStage.DRAGGING) return

      setStage(TarotCardStage.DRAGGING)
      setStartPosition({ x: clientX, y: clientY })
      setCurrentPosition({ x: clientX, y: clientY })
    },
    [stage],
  )

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (isStart?.current) return
      if (stage < TarotCardStage.READY_TO_INTERACTION) return
      if (stage !== TarotCardStage.DRAGGING) return

      setCurrentPosition({ x: clientX, y: clientY })

      const deltaXRem = pxToRem(clientX - startPosition.x)

      const calculateCardPosition = (deltaXRem: number) => {
        const move = deltaXRem % CARD_CONFIG.DELTA_CALC
        const cycleMove = move > 0 ? move - CARD_CONFIG.DELTA_CALC : move
        const progress = Math.abs(cycleMove) / CARD_CONFIG.DELTA_CALC

        CARD_ANIMATION_DIRECTION.forEach(({ index, from, to }) => {
          const interpolatedPosition = {
            rotate: from.rotate + (to.rotate - from.rotate) * progress,
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress,
            scale: from.scale + (to.scale - from.scale) * progress,
            opacity: from.opacity + (to.opacity - from.opacity) * progress,
            zIndex: from.zIndex + (to.zIndex - from.zIndex) * progress,
          }

          cardAnimationRefs[index][1](cardAnimationRefs[index][0].current, toRemMotion(interpolatedPosition), {
            duration: 0,
          })
        })
      }

      // 계산된 포지션으로 카드 애니메이션
      if (Math.abs(deltaXRem) > pxToRem(5)) {
        calculateCardPosition(deltaXRem)
      }
    },
    [stage, startPosition.x, cardAnimationRefs],
  )

  const handleEnd = useCallback(async () => {
    if (isStart?.current) return
    if (stage < TarotCardStage.READY_TO_INTERACTION) return
    if (stage !== TarotCardStage.DRAGGING) return

    setMessage("중앙에 카드를 클릭해보세요!")

    const finalDeltaXRem = pxToRem(currentPosition.x - startPosition.x)

    if (Math.abs(finalDeltaXRem) <= pxToRem(5)) {
      if (cardIndexRef.current !== CARD_CONFIG.CENTER + (isChangedIndexRef.current ? 1 : 0)) {
        cardIndexRef.current = null
        setStage(TarotCardStage.READY_TO_INTERACTION)
        setStartPosition({ x: 0, y: 0 })
        setCurrentPosition({ x: 0, y: 0 })
        return
      }
    }
    const deltaCalc = CARD_CONFIG.DELTA_CALC

    const move = finalDeltaXRem % deltaCalc
    const cycleMove = move > 0 ? move - deltaCalc : move
    const progress = Math.abs(cycleMove) / deltaCalc

    const targetProgress = progress > 0.5 ? 1 : 0

    const canEndCondition =
      Math.abs(finalDeltaXRem) <= pxToRem(5) &&
      cardIndexRef.current === CARD_CONFIG.CENTER + (isChangedIndexRef.current ? 1 : 0)

    let isChangedIndex = false
    if (targetProgress === 1) {
      isChangedIndex = true
    } else {
      isChangedIndex = false
    }

    // 중앙 카드 제외 클릭 방지
    // if (
    //   Math.abs(finalDeltaX) <= 5 &&
    //   (cardIndexRef.current !== CARD_CONFIG.CENTER ||
    //     cardIndexRef.current !== CARD_CONFIG.CENTER + 1)
    // ) {
    //   // 포지션 초기화
    //   cardIndexRef.current = null;
    //   setStage(TarotCardStage.READY_TO_INTERACTION);
    //   setStartPosition({ x: 0, y: 0 });
    //   setCurrentPosition({ x: 0, y: 0 });
    //   return;
    // }

    if (
      isChangedIndexRef.current &&
      Math.abs(finalDeltaXRem) <= pxToRem(5) &&
      cardIndexRef.current !== CARD_CONFIG.CENTER + 1
    ) {
      cardIndexRef.current = null
      setStage(TarotCardStage.READY_TO_INTERACTION)
      setStartPosition({ x: 0, y: 0 })
      setCurrentPosition({ x: 0, y: 0 })
      return
    }

    const calc = (from: number, to: number, targetProgress: number) => {
      return canEndCondition && cardIndexRef.current === CARD_CONFIG.CENTER + 1
        ? from + (to - from)
        : from + (to - from) * targetProgress
    }

    CARD_ANIMATION_DIRECTION.forEach(({ index, from, to }) => {
      const finalPosition = {
        rotate: calc(from.rotate, to.rotate, targetProgress),
        x: calc(from.x, to.x, targetProgress),
        y: calc(from.y, to.y, targetProgress),
        scale: calc(from.scale, to.scale, targetProgress),
        opacity: calc(from.opacity, to.opacity, targetProgress),
        zIndex: calc(from.zIndex, to.zIndex, targetProgress),
      }

      cardAnimationRefs[index][1](cardAnimationRefs[index][0].current, toRemMotion(finalPosition), { duration: 0.2 })
    })

    // 애니메이션 리셋 초기화 필요 없음으로 패스

    // 포지션 초기화
    setStartPosition({ x: 0, y: 0 })
    setCurrentPosition({ x: 0, y: 0 })

    if (canEndCondition) {
      const curCardArr = [...POSITION_SHOW_REWARD_ARR]

      if (isChangedIndexRef.current) {
        curCardArr.unshift(CARD_POSITION.SHOW_REWARD.TRIPLE_LEFT)
        curCardArr.pop()
      }

      setStage(TarotCardStage.SHOWING_REWARD)

      isStart.current = true

      await new Promise((resolve) => setTimeout(resolve, 400))

      const cardAnimationPromises = curCardArr.map((position, index) => {
        const centerIndex = CARD_CONFIG.CENTER + (isChangedIndexRef.current ? 1 : 0)

        const getDelay = (cardIndex: number) => {
          if (cardIndex === centerIndex) return 0.4
          return 0
        }

        return cardAnimationRefs[index][1](cardAnimationRefs[index][0].current, toRemMotion(position), {
          duration: 0.3,
          delay: getDelay(index),
        })
      })

      currentAnimationsRef.current = cardAnimationPromises
      await Promise.all(currentAnimationsRef.current)
      if (isResettingRef.current) return

      await new Promise((resolve) => setTimeout(resolve, 150))

      const [centerRefBack, centerAnimateBack] =
        cardAnimationRefs[CARD_CONFIG.CENTER + (isChangedIndexRef.current ? 1 : 0)]
      const [centerRefFront, centerAnimateFront] = cardBackAnimationRef

      // 카드 뒤집기 애니메이션

      await centerAnimateBack(
        centerRefBack.current,
        {
          rotateY: 90,
          opacity: 1,
        },
        {
          duration: 0.18,
        },
      )
      await centerAnimateFront(
        centerRefFront.current,
        {
          rotateY: [270, 360],
          opacity: [1, 1],
          scale: [1.12, 1.12],
          y: ["1.25rem", "1.25rem"],
        },
        {
          duration: 0.18,
        },
      )
      if (isResettingRef.current) return
      await new Promise((resolve) => setTimeout(resolve, 50))
      if (isResettingRef.current) return

      setStage(TarotCardStage.DONE)

      setTimeout(() => {
        conductor?.shoot()
        const timer = setTimeout(() => {
          conductor?.stop()
        }, 1000)
        setMessage('오늘의 운세는 "지원자를 잡는 용기⚔️" 이네요')

        clearTimeout(timer)
      }, 1000)

      setTimeout(() => {
        setMessage("어디있는지 맞춰보세요!")
        setStep(CanapeStep.SHELL_GAME)
      }, 1500 + 3500)
    } else {
      if (isChangedIndex && targetProgress === 1) {
        isChangedIndexRef.current = true
      } else {
        isChangedIndexRef.current = false
      }
      cardIndexRef.current = null
      setStage(TarotCardStage.READY_TO_INTERACTION)
    }
  }, [
    cardAnimationRefs,
    cardBackAnimationRef,
    conductor,
    currentPosition.x,
    setMessage,
    setStep,
    stage,
    startPosition.x,
  ])

  const handleMouseDown = useCallback(
    (e: any) => {
      e.preventDefault()

      // 이벤트 타겟에서 시작해서 상위 부모 요소들을 검색
      const findCardIndexFromParents = (element: Element | null): number | null => {
        let currentElement = element

        while (currentElement) {
          // 현재 요소의 id 확인
          const id = currentElement.id
          const cardMatch = id.match(/^card_(\d+)$/)
          if (cardMatch) {
            return parseInt(cardMatch[1], 10)
          }

          // 상위 부모 요소로 이동
          currentElement = currentElement.parentElement
        }

        return null
      }

      // 타겟 요소에서 시작해서 상위 부모들에서 card index 찾기
      const cardIndex = findCardIndexFromParents(e.target as Element)
      if (cardIndex !== null) {
        cardIndexRef.current = cardIndex
      } else {
        cardIndexRef.current = null
      }

      handleStart(e.clientX, e.clientY)
    },
    [handleStart],
  )

  const handleMouseMove = useCallback(
    (e: any) => {
      handleMove(e.clientX, e.clientY)
    },
    [handleMove],
  )

  const handleMouseUp = useCallback(() => {
    handleEnd()
  }, [handleEnd])

  const handleTouchStart = useCallback(
    (e: any) => {
      e.preventDefault()
      const touch = e.touches[0]

      // 이벤트 타겟에서 시작해서 상위 부모 요소들을 검색
      const findCardIndexFromParents = (element: Element | null): number | null => {
        let currentElement = element

        while (currentElement) {
          // 현재 요소의 id 확인
          const id = currentElement.id
          const cardMatch = id.match(/^card_(\d+)$/)
          if (cardMatch) {
            return parseInt(cardMatch[1], 10)
          }

          // 상위 부모 요소로 이동
          currentElement = currentElement.parentElement
        }

        return null
      }

      // 타겟 요소에서 시작해서 상위 부모들에서 card index 찾기
      const cardIndex = findCardIndexFromParents(e.target as Element)
      if (cardIndex !== null) {
        cardIndexRef.current = cardIndex
      } else {
        cardIndexRef.current = null
      }

      handleStart(touch.clientX, touch.clientY)
    },
    [handleStart],
  )

  const handleTouchMove = useCallback(
    (e: any) => {
      e.preventDefault()
      const touch = e.touches[0]
      handleMove(touch.clientX, touch.clientY)
    },
    [handleMove],
  )

  const handleTouchEnd = useCallback(
    (e: any) => {
      e.preventDefault()
      handleEnd()
    },
    [handleEnd],
  )

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      handleMove(e.clientX, e.clientY)
    }

    const handleGlobalMouseUp = () => {
      handleEnd()
    }

    if (stage === TarotCardStage.PENDING) {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      return
    }
    if (stage === TarotCardStage.DRAGGING) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [handleMove, handleEnd, stage])

  useEffect(() => {
    setTimeout(() => {
      onStart()
    }, 1000)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial="initial"
      animate="visible"
      exit="exit"
      variants={{
        initial: {
          opacity: 0,
          y: 300, // 300px
        },
        visible: {
          opacity: 1,
          y: 0,
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
        "w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pb-13",
      )}
      // 스와이프 이벤트 핸들러 추가
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      // 터치 스크롤 방지
      style={{
        touchAction: stage === TarotCardStage.PENDING ? undefined : "none",
        cursor:
          stage === TarotCardStage.PENDING
            ? "default"
            : stage === TarotCardStage.READY_TO_INTERACTION
              ? "grab"
              : stage === TarotCardStage.DRAGGING
                ? "grabbing"
                : "default",
      }}
      id="card-section"
    >
      {/* { x: -240, rotate: -30, y: 70 }, // idx 5 */}
      <div className={cn("relative w-40 h-62")}>
        <motion.div
          ref={cardBackAnimationRef[0]}
          style={{
            zIndex: 10,
            transform: "rotateY(270deg)",
            opacity: 0,
          }}
          className={cn("absolute top-0 left-0 rounded-lg z-10", "w-40 h-62")}
        >
          <img className={cn("w-full h-full object-cover")} src={imageAssets.tarotCard.front} alt="tarot card front" />
        </motion.div>
        {cardAnimationRefs.map(([cardScope], index) => (
          <motion.div
            id={`card_${index}`}
            key={`card_${index}`}
            ref={cardScope}
            style={{
              zIndex:
                index === 0 || index === 6
                  ? 10
                  : index === 1 || index === 5
                    ? 20
                    : index === 2 || index === 4
                      ? 30
                      : 40,
              opacity: index === 0 || index === 6 ? 0 : 1,
            }}
            className={cn("absolute top-0 left-0 rounded-lg z-20 overflow-hidden", "w-40 h-62")}
          >
            <img className={cn("w-full h-full object-fill")} src={imageAssets.tarotCard.back} alt="tarot card back" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

TarotCard.displayName = "TarotCard"

export default TarotCard
