import MainSection from "@/sections/MainSection"
import SmoreSection from "@/sections/SmorePage"
import { cn } from "../lib/utils"

function Home() {
  const searchParams = new URLSearchParams(window.location.search)
  const type = searchParams.get("type")
  return (
    <main className={cn("w-screen h-dvh bg-black overflow-hidden", "sm:p-3")}>
      {type === "smore" ? <SmoreSection /> : <MainSection />}
    </main>
  )
}

export default Home
