import { cn } from "@/lib/utils"

export default function ArrowBtn({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right"
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "z-10 absolute top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/30 hover:bg-white/50 shadow transition",
        direction === "left" ? "-left-2" : "-right-2",
        "disabled:opacity-40 disabled:cursor-not-allowed",
      )}
      aria-label={direction === "left" ? "이전 슬라이드" : "다음 슬라이드"}
      tabIndex={0}
    >
      {direction === "left" ? (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
