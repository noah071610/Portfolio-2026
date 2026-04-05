import Galaxy from "../components/Galaxy"
import Smore from "../components/LeftHero/Smore"
import { cn } from "../lib/utils"

function SmorePage() {
  return (
    <main className={cn("w-screen h-dvh bg-black overflow-hidden", "sm:p-3")}>
      <Galaxy
        mouseRepulsion={false}
        mouseInteraction={false}
        density={1}
        glowIntensity={0.3}
        saturation={0}
        hueShift={140}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={0.5}
        speed={1}
      />
      <Smore />
    </main>
  )
}

export default SmorePage
