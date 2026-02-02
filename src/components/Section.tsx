import { cn } from "@/lib/utils"
import { PlayIcon } from "lucide-react"

export default function Section({
  children,
  sectionNumber,
  hasNoContent = false,
}: {
  sectionNumber: number
  children: React.ReactNode
  hasNoContent?: boolean
}) {
  return (
    <section id={`section-${sectionNumber}`} className={cn("section", !hasNoContent ? "hover:border-description" : "")}>
      {!hasNoContent && (
        <div
          className={cn(
            "cursor-pointer absolute top-4 right-4 flex items-center justify-center p-1.75 rounded-full bg-border",
            "group",
          )}
        >
          <PlayIcon className={cn("size-3.5 text-sm text-description", "group-hover:text-white")} />
        </div>
      )}
      {children}
    </section>
  )
}
