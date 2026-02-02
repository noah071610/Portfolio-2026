"use client"

import { EASE_OUT } from "@/lib/animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const STAGGER_DELAY = 0.14

function ResultCardPage({ result }: { result: number }) {
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
              //   backgroundImage:
              //     "linear-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255,1) 80%, rgba(0, 0, 0, 1) 100%)",
            }}
          ></div>
          <div
            className={cn("absolute w-full z-10 h-0 pb-[calc(100%+0.5rem)] bg-center bg-cover bg-no-repeat")}
            style={{
              //   backgroundColor: "rgba(255, 255, 255, 1)",
              backgroundImage: `url('https://loosedrawing.com/assets/media/illustrations/png/991.png')`,
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
            <label className={cn("text-xs text-description font-semibold")}>지원자와의 궁합지수는...</label>
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
            <p className={cn("text-sm leading-6 text-white")}>
              저는 AI로 생산성을 극대화 시키고 효율을 늘리지만 주객전도로 끌려가지 않고 좋은 도구로 사용하는 개발자가
              되는 것이 목표입니다.
            </p>
            <p className={cn("text-sm leading-6 text-white")}>
              이와 반대로 단순히 구현만 하고 한 가지 기술, 업무에만 얽매인다면 개발자로서 좀 더 합리적인 선택을 내리기
              어려워지고 장차 개발자가 필요한 이유 자체가 AI에게 흔들리게 된다고 생각합니다.
            </p>
            <p className={cn("text-sm leading-6 text-white")}>
              그렇기 때문에 개발자 본연의 업무뿐만 아니라 실무에서는 프로젝트 매니징, CS, 제품 전략 수립, 아키텍처 설계
              등 PM으로서의 다양한 경험도 주저하지 않으며 우여곡절 성장했습니다.
            </p>
            <p className={cn("text-sm leading-6 text-white")}>
              특히 고객은 항상 우선이며 B2B와 B2C를 막론하고 기업이 최종적으로 추구해야하는 가장 중요한 가치라고
              생각합니다. 제품을 알리는 것도, 이윤을 창출하는 것 도 결국 고객에게서 나오니까요.
            </p>
            {result >= 90 && (
              <p className={cn("text-sm leading-6 text-white")}>
                <b>저희의 궁합은 {result}%입니다!</b> 미래에 저희가 만나뵙게 된다면 너무나도 영광일 것 같습니다.
              </p>
            )}
            {result < 90 && (
              <p className={cn("text-sm leading-6 text-white")}>
                <b>저희의 궁합은 {result}%입니다!</b>
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ResultCardPage
