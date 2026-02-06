import { useLayoutEffect } from "react"

export default function VisualScaleProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // 요구사항(정리):
    // - "줌을 해도" 100% 기준처럼 보이게(=줌을 역보정)
    // - 초기 진입이 이미 축소/확대 상태이거나, DPR이 1~1.5 같은 환경에서도
    //   DPR=2, zoom=1에서 font-size 16px이던 체감에 맞추기
    //   => fontSize = 16 * (referenceDpr / currentDpr)
    // - 단, 모바일처럼 화면이 작은 환경에서는 이 DPR 정규화가 오히려 너무 작아질 수 있어
    //   최소 화면에서는 적용을 끔(기본 16px 유지)

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

    const updateScale = () => {
      const vv = window.visualViewport
      const viewportWidth = vv?.width ?? window.innerWidth
      const viewportHeight = vv?.height ?? window.innerHeight
      const minViewport = Math.min(viewportWidth, viewportHeight)

      const baseFontSizePx = 16
      const referenceDpr = 2
      const currentDpr = window.devicePixelRatio || 1

      // 핵심: DPR(=줌 포함)이 낮아질수록(font-size를) 키워서 “줌으로 작아지는” 걸 상쇄
      // 예) DPR2에서 80% 줌이면 DPR~1.6 => scale=2/1.6=1.25 => font-size가 커져서 결과적으로 체감 유지
      let dprScale = referenceDpr / currentDpr

      // 모바일/작은 화면에서는 DPR 정규화가 너무 작은 글씨를 만들 수 있어서 비활성화
      // (아이폰 DPR3: 2/3=0.66으로 작아지는 문제 방지)
      const isSmallScreen = minViewport < 520
      if (isSmallScreen) dprScale = 1

      // 안전 클램프(극단적인 줌/환경에서 폭주 방지)
      dprScale = clamp(dprScale, 0.75, 3)

      const finalScale = dprScale

      const root = document.documentElement
      root.style.setProperty("--zoom-inv", dprScale.toString())
      root.style.setProperty("--visual-scale", finalScale.toString())
      root.style.fontSize = `${baseFontSizePx * finalScale}px`
    }

    // 줌(Ctrl/Cmd +/-)은 브라우저에 따라 resize가 안 뜨는 경우가 있어서,
    // DPR 변화를 matchMedia로 감지해서 항상 updateScale이 돌도록 함.
    let dprMql: MediaQueryList | null = null
    const attachDprListener = () => {
      dprMql?.removeEventListener?.("change", onDprChange)
      dprMql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      dprMql.addEventListener?.("change", onDprChange)
    }
    const onDprChange = () => {
      updateScale()
      attachDprListener() // DPR이 바뀌면 쿼리 자체도 갱신해야 함
    }

    window.addEventListener("resize", updateScale, { passive: true })
    window.visualViewport?.addEventListener("resize", updateScale, { passive: true })
    attachDprListener()
    updateScale()

    return () => {
      window.removeEventListener("resize", updateScale)
      window.visualViewport?.removeEventListener("resize", updateScale)
      dprMql?.removeEventListener?.("change", onDprChange)
    }
  }, [])

  return <>{children}</>
}
