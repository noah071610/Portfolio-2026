import CanapeSection from "@/sections/CanapeSection"
import MainSection from "@/sections/MainSection"
import RankingTogetherSection from "@/sections/RankingTogetherSection"
import SmoreSection from "@/sections/SmoreSection"
import WordbookSection from "@/sections/WordbookSection"
import { cn } from "../lib/utils"

function Home() {
  const searchParams = new URLSearchParams(window.location.search)
  const type = searchParams.get("type")
  return (
    <main className={cn("w-screen h-dvh bg-black overflow-hidden", "sm:p-3")}>
      {type === "smore" ? (
        <SmoreSection />
      ) : type === "canape" ? (
        <CanapeSection />
      ) : type === "ranking-together" ? (
        <RankingTogetherSection />
      ) : type === "wordbook" ? (
        <WordbookSection />
      ) : (
        <MainSection />
      )}
    </main>
  )
}

export default Home
