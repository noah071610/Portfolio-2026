import { imageAssets } from "@/data/images"
import { cn } from "@/lib/utils"
import useEmblaCarousel from "embla-carousel-react"
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

export default function SmartWordbook() {
  const images = useMemo(
    () => [
      imageAssets.wordbook.wordbook1,
      imageAssets.wordbook.wordbook2,
      imageAssets.wordbook.wordbook3,
      imageAssets.wordbook.wordbook4,
    ],
    [],
  )

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
      {/* preload: 이미지 미리 다운로드/캐시 */}
      <div aria-hidden className="pointer-events-none absolute w-0 h-0 overflow-hidden opacity-0">
        {images.map((src) => (
          <img key={src} src={src} alt="" loading="eager" decoding="async" />
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
                {images.map((src, i) => (
                  <div key={src} className="flex-[0_0_100%] min-w-0 h-full">
                    <img
                      src={src}
                      alt={`wordbook-${i + 1}`}
                      className={cn(
                        "w-full h-full object-cover select-none",
                        i === activeIndex ? "opacity-100" : "opacity-85",
                      )}
                      draggable={false}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
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
