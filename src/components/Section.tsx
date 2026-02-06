import useMediaQuery from "@/lib/useMediaQuery"
import { cn } from "@/lib/utils"
import { PlayIcon } from "lucide-react"
export default function Section({
  children,
  sectionNumber,
  hasNoContent = false,
  onClickRightSide,
  onClickSection,
  setIsOpenGalaxy,
}: {
  sectionNumber: number
  children: React.ReactNode
  hasNoContent?: boolean
  onClickRightSide?: (e: React.MouseEvent<HTMLDivElement>, isStop?: boolean) => void
  onClickSection: (number: number) => void
  setIsOpenGalaxy: (isOpen: boolean) => void
}) {
  const isMobile = useMediaQuery("(max-width: 640px)")
  // const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // const didAutoClickRef = useRef(false)

  // const clearHoverTimeout = () => {
  //   if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  //   hoverTimeoutRef.current = null
  // }

  // const startHoverAutoClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!onClickRightSide) return
  //   if (didAutoClickRef.current) return
  //   clearHoverTimeout()
  //   hoverTimeoutRef.current = setTimeout(() => {
  //     didAutoClickRef.current = true
  //     onClickRightSide(e)
  //     clearHoverTimeout()
  //   }, 2000)
  // }

  // const stopHoverAutoClick = () => {
  //   clearHoverTimeout()
  //   didAutoClickRef.current = false
  // }

  // useEffect(() => clearHoverTimeout, [])

  return (
    <section
      id={`section-${sectionNumber}`}
      // onMouseEnter={startHoverAutoClick}
      // onMouseLeave={stopHoverAutoClick}
      className={cn("section", !hasNoContent ? "hover:border-description" : "")}
    >
      {!hasNoContent && (
        <div
          className={cn(
            "cursor-pointer absolute top-4 right-4 flex items-center justify-center p-1.75 rounded-full bg-border",
            "group",
          )}
          onClick={
            isMobile
              ? () => {
                  if (!hasNoContent) {
                    onClickSection(sectionNumber)
                    setIsOpenGalaxy(true)
                  }
                }
              : onClickRightSide
          }
        >
          <PlayIcon className={cn("size-3.5 text-sm text-description", "group-hover:text-white")} />
        </div>
      )}
      {children}
    </section>
  )
}
