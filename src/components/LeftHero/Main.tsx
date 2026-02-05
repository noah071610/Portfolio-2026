import { cn } from "@/lib/utils"

export default function Main() {
  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full overflow-hidden z-100 flex items-center justify-center",
        //
      )}
    >
      <div className={cn("w-[65%]")}>
        <p className={cn("text-2xl font-bold text-[#c9c9c9] inline-block orbitron")}>
          The developer who knows <span className={cn("text-white")}>WHY</span> this product is being built
        </p>
      </div>
    </div>
  )
}
