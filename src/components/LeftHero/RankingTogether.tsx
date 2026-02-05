import { imageAssets } from "@/data/images"
import { cn } from "@/lib/utils"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

export default function RankingTogether() {
  const videos = useMemo(() => [imageAssets.videos.vn, imageAssets.videos.play, imageAssets.videos.result], [])
  const videoElsRef = useRef<Array<HTMLVideoElement | null>>([])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  })
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return

    const sync = () => {
      const nextIndex = emblaApi.selectedScrollSnap()
      setActiveIndex(nextIndex)

      // 선택된 슬라이드 영상은 autoplay 보조, 나머지는 pause해서 리소스 절약
      videoElsRef.current.forEach((el, i) => {
        if (!el) return
        if (i === nextIndex) {
          try {
            el.currentTime = 0
            void el.play()
          } catch {
            // ignore
          }
        } else {
          try {
            el.pause()
          } catch {
            // ignore
          }
        }
      })
    }

    emblaApi.on("select", sync)
    // 초기 진입 시에도 한 번 동기화
    sync()

    return () => {
      emblaApi.off("select", sync)
    }
  }, [emblaApi])

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        //
      )}
    >
      {/* preload: 3개 영상을 미리 다운로드/캐시 */}
      <div aria-hidden className="pointer-events-none absolute w-0 h-0 overflow-hidden opacity-0">
        {videos.map((src) => (
          <video key={src} preload="auto" muted playsInline>
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </div>

      <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2")}>
        <motion.div
          initial="initial"
          animate="visible"
          variants={{
            initial: {
              opacity: 0,
              y: 360,
            },
            visible: {
              opacity: 1,
              y: 0,
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
          className={cn("w-85 h-160 relative ")}
        >
          <div
            className={cn(
              "w-83 h-158 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[4rem]",
              // "bg-[linear-gradient(180deg,#6b3db1_0%,#4b20a1_35%,#2c097d_100%)]",
              "bg-mainBg",
            )}
          />
          <div
            className={cn("w-full h-full absolute inset-0")}
            style={{
              backgroundImage: `url(${imageAssets.frame})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className={cn("w-full h-full relative", "pt-14 pb-8 px-8")}>
            <div className="w-full h-full overflow-hidden" ref={emblaRef}>
              <div className="flex h-full touch-pan-y">
                {videos.map((src, i) => (
                  <div key={src} className="flex-[0_0_100%] min-w-0 h-full">
                    <video
                      ref={(el) => {
                        videoElsRef.current[i] = el
                      }}
                      className="w-full h-full"
                      autoPlay={i === activeIndex}
                      loop
                      muted
                      playsInline
                      preload="auto"
                    >
                      <source src={src} type="video/mp4" />
                      브라우저가 비디오 태그를 지원하지 않습니다.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
