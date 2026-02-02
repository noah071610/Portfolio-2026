import { useLayoutEffect, useRef } from "react"

export default function VisualScaleProvider({ children }: { children: React.ReactNode }) {
  // 페이지 로드 시점의 하드웨어 기본 DPR 저장 (Mac Retina는 여기서 2가 저장됨)
  const baseDPR = useRef<number>(2)

  useLayoutEffect(() => {
    // 초기화: 현재 장치의 기본 해상도 비율을 1.0(기준)으로 잡음
    baseDPR.current = 2

    const updateScale = () => {
      const currentDPR = window.devicePixelRatio || 1

      // 1. 순수 브라우저 확대 비율 계산
      // 현재 DPR이 4이고 기본이 2라면, 사용자는 200% 확대한 것임 -> 결과값 2
      const browserZoomLevel = currentDPR / baseDPR.current

      // 2. 역산 배율 (확대될수록 요소는 작아지게 보정)
      const inv = 1 / browserZoomLevel

      // 3. 뷰포트 너비에 따른 반응형 배율
      const baseWidth = 450
      const responsiveRatio = Math.min(window.innerWidth / baseWidth, 1)

      // 4. 최종 통합 스케일
      const finalScale = inv * responsiveRatio

      const root = document.documentElement
      root.style.setProperty("--zoom-inv", inv.toString())
      root.style.setProperty("--visual-scale", finalScale.toString())
      root.style.fontSize = `${16 * finalScale}px`
    }

    // 브라우저 확대/축소 시 resize 이벤트가 발생함
    window.addEventListener("resize", updateScale)
    updateScale()

    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return <>{children}</>
}
