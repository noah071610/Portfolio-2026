import { imageAssets } from "@/data/images"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { TConductorInstance } from "react-canvas-confetti/dist/types"
import { useTranslation } from "react-i18next"
import { BsHandIndexFill } from "react-icons/bs"
import { CanapeStep } from "./types"

const SECTION_COUNT = 6
const SECTION_ANGLE = 360 / SECTION_COUNT

const images = [
  imageAssets.roulette.candy,
  imageAssets.roulette.coffee,
  imageAssets.roulette.coin,
  imageAssets.roulette.wine,
  imageAssets.roulette.money,
  imageAssets.roulette.gift,
]

const IMAGE_INDEX_TO_RESULT_INDEX: Record<number, string> = {
  0: "canape_game.gift.0",
  1: "canape_game.gift.1",
  2: "canape_game.gift.2",
  3: "canape_game.gift.3",
  4: "canape_game.gift.4",
  5: "canape_game.gift.5",
}

const cx = 100
const cy = 100
const r = 100
const textR = 62
// 바깥 원(패딩/보더 포함) 기준 위치(%)
const DOT_RADIUS_PCT = 50

function getRandomAngle() {
  const angles = [0, 60, 120, 180, 240, 300, 360]
  const idx = Math.floor(Math.random() * angles.length)
  return angles[idx]
}

export default function Roulette({
  conductor,
  setStep,
  setMessage,
}: {
  conductor: TConductorInstance
  setStep: (step: CanapeStep) => void
  setMessage: (message: string) => void
}) {
  const { t } = useTranslation()
  const [isHideHand, setIsHideHand] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const scheduleMessage = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
  }

  const clearAll = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  useEffect(() => clearAll, [])

  // angle은 렌더마다 바뀌면 안되므로 최초 1회만 고정
  const [isAfterDrag, setIsAfterDrag] = useState(false)
  const [isStopDrag, setIsStopDrag] = useState(false)
  const [isOnGrab, setIsOnGrab] = useState(false)
  const [resultIndex, setResultIndex] = useState<number>(0)

  const [angle] = useState(() => getRandomAngle())

  const dragY = useMotionValue(0)
  const rotateRaw = useTransform(dragY, [0, 100], [0, isStopDrag ? -1440 : -360])

  const rotate = useSpring(rotateRaw, { stiffness: isAfterDrag ? 150 : 300, damping: isAfterDrag ? 14 : 40 })
  const rotateWithAngle = useTransform(rotate, (v) => v + angle)

  const polar = (angleDeg: number, radius: number) => {
    const rad = (Math.PI / 180) * angleDeg
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    }
  }

  const polarPct = (angleDeg: number, radiusPct: number) => {
    const rad = (Math.PI / 180) * angleDeg
    return {
      leftPct: 50 + radiusPct * Math.cos(rad),
      topPct: 50 + radiusPct * Math.sin(rad),
    }
  }

  useEffect(() => {
    setResultIndex(Math.floor(angle / SECTION_ANGLE))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        "w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pb-10",
      )}
    >
      <div
        style={{ backgroundImage: "linear-gradient(90deg, #d6c4f7 0%, #b4a8e6 35%, #a3c9e8 100%)" }}
        className={cn("w-70 h-70 rounded-full p-2.5 border-2 border-purple-200 relative")}
      >
        {!isHideHand && (
          <motion.div
            className={cn("absolute top-1 left-1")}
            animate={{
              x: [0, 4, 0, 4, 0],
              y: [0, 4, 0, 4, 0], // 16px down, 16px up, back to 0
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.33, 0.66, 1],
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <BsHandIndexFill className={cn("size-6 rotate-145")} />
          </motion.div>
        )}
        {!isStopDrag && (
          <motion.div
            className={cn(
              "absolute top-0 left-0 w-30 h-50 z-100 touch-none",
              // grab 중이면 cursor-grabbing, 아니면 cursor-grab
              isOnGrab ? "cursor-grabbing" : "cursor-grab",
            )}
            drag="y"
            dragDirectionLock={true}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragMomentum={true}
            dragPropagation={true}
            style={{ y: dragY }}
            onDragStart={() => {
              setIsOnGrab(true)
              setIsHideHand(true)
            }}
            onDragEnd={() => {
              // 일정 수준 dragY(예: 60) 이상일 때만 동작

              if (Math.abs(dragY.get()) >= 60) {
                setIsStopDrag(true)
                setIsOnGrab(false)
                scheduleMessage(() => {
                  setIsAfterDrag(true)
                }, 380)
                scheduleMessage(() => {
                  conductor?.shoot()
                  const timer = setTimeout(() => {
                    conductor?.stop()
                  }, 1000)
                  setMessage(t("canape_game.message_2_value", { value: t(IMAGE_INDEX_TO_RESULT_INDEX[resultIndex]) }))

                  clearTimeout(timer)
                }, 380 + 1300)
                scheduleMessage(
                  () => {
                    setMessage(t("canape_game.message_2"))
                    setStep(CanapeStep.TAROT_CARD)
                  },
                  380 + 1300 + 3500,
                )
              } else {
                // dragY가 부족하면 상태 변경 없이 grab 상태만 해제
                setIsOnGrab(false)
                setMessage(t("canape_game.message_3"))
              }
            }}
          />
        )}
        {/* 섹션 중앙(바깥 테두리) 하얀 원: padding/border까지 포함한 외곽 컨테이너 기준 배치 */}
        {Array.from({ length: SECTION_COUNT }).map((_, i) => {
          const startAngle = -60 + i * SECTION_ANGLE
          const midAngle = startAngle + SECTION_ANGLE / 2

          // 점의 "중심"을 테두리에 두면 반이 잘려보일 수 있어 살짝 안쪽으로 당김
          const dp = polarPct(midAngle, DOT_RADIUS_PCT - 1.5)

          return (
            <div
              key={`roulette-dot-${i}`}
              className={cn("absolute rounded-full bg-white")}
              style={{
                width: "0.4rem",
                height: "0.4rem",
                left: `${dp.leftPct}%`,
                top: `${dp.topPct}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 40,
              }}
            />
          )
        })}

        <motion.div
          style={{ rotate: isAfterDrag ? rotateWithAngle : rotate }}
          className={cn("w-full h-full rounded-full relative z-30 overflow-hidden rotate-30")}
        >
          {/* 룰렛(6분할) - 섹션을 실제로 나누고 텍스트 배치/회전 */}
          <svg className={cn("absolute inset-0 w-full h-full")} viewBox="0 0 200 200" aria-hidden="true">
            {Array.from({ length: SECTION_COUNT }).map((_, i) => {
              // -90deg에서 시작(12시 방향)
              const startAngle = -90 + i * SECTION_ANGLE
              const endAngle = startAngle + SECTION_ANGLE
              const midAngle = startAngle + SECTION_ANGLE / 2

              const p1 = polar(startAngle, r)
              const p2 = polar(endAngle, r)
              const fill = i % 2 === 0 ? "#ffffff" : "#ededed"

              const tp = polar(midAngle, textR)

              const textRotate = (
                midAngle +
                90 +
                (images[i].includes("wine") || images[i].includes("coffee") ? 30 : 0)
              ).toFixed(3)
              const imageSize = 40

              return (
                <g key={`roulette-section-${i}`}>
                  <path d={`M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y} Z`} fill={fill} />
                  <image
                    href={images[i]}
                    xlinkHref={images[i]}
                    x={tp.x - imageSize / 2}
                    y={tp.y - imageSize / 2}
                    width={imageSize}
                    height={imageSize}
                    preserveAspectRatio="xMidYMid meet"
                    transform={`rotate(${textRotate} ${tp.x} ${tp.y})`}
                  />
                </g>
              )
            })}
          </svg>

          {/* 중앙 노란 원 + white gradient 반짝임 */}
          <div className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")}>
            <div className={cn("relative w-4 h-4 rounded-full bg-yellow-400 shadow-lg")}>
              {/* 하이라이트(화이트 그라데이션) */}
              <div
                className={cn("absolute inset-0 rounded-full opacity-90")}
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 15%, rgba(255,255,255,0.95), rgba(255,255,255,0) 55%)",
                }}
              />
              {/* 반짝이는 느낌(약한 펄스) */}
              <div
                className={cn("absolute -inset-2 rounded-full blur-sm opacity-40 animate-pulse")}
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
