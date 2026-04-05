import SmartWordbook from "@/components/LeftHero/SmartWordbook"
import Galaxy from "../components/Galaxy"

function WordbookSection() {
  return (
    <>
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
      <SmartWordbook />
    </>
  )
}

export default WordbookSection
