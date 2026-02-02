import { getRandom } from "@/lib/getRandom"
import { getCircle, getPolygon, getRectangle } from "@/lib/matter"
import { cn } from "@/lib/utils"
import { Bodies, Engine, Mouse, MouseConstraint, Render, Runner, World } from "matter-js"
import { useEffect, useRef } from "react"

export default function Skills({ allLogosLoaded = true }: { allLogosLoaded: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!allLogosLoaded) return
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let teardown: (() => void) | null = null
    let lastWidth = 0
    let lastHeight = 0

    const setup = (width: number, height: number) => {
      teardown?.()

      // canvas 크기를 left side 컨테이너에 맞춤
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const engine = Engine.create({
        gravity: { x: 0, y: 0 },
      })

      const render = Render.create({
        engine,
        canvas,
        options: {
          wireframes: false,
          background: "transparent",
          width,
          height,
        },
      })

      const world = engine.world

      const wall = 15
      const wallOptions = {
        isStatic: true,
        render: { fillStyle: "transparent" },
        friction: 0,
        frictionStatic: 0,
      }

      const topWall = Bodies.rectangle(width / 2, wall / 2, width, wall, wallOptions)
      const leftWall = Bodies.rectangle(wall / 2, height / 2, wall, height, wallOptions)
      const rightWall = Bodies.rectangle(width - wall / 2, height / 2, wall, height, wallOptions)
      const ground = Bodies.rectangle(width / 2, height - (wall + 15) / 2, width, wall + 15, wallOptions)

      const mouse = Mouse.create(canvas)
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.05,
          damping: 1,
          render: { visible: false },
        },
      })

      // keep the mouse in sync with rendering
      render.mouse = mouse

      const iconSize = 36
      const getY = () => getRandom(200, height - 200)
      const getX = () => {
        return getRandom(200, width - 200)
      }

      const rows = [
        ["docker", "github", "nestjs", "nextjs"].map((v) => getCircle(getX(), getY(), iconSize, v)),
        [
          "aws",
          "css",
          "html",
          "javascript",
          "mysql",
          "tailwind-css",
          "typescript",
          "figma",
          "notion",
          "sass",
          "slack",
        ].map((v) => getRectangle(getX(), getY(), iconSize, v)),
        ["nginx", "react", "nodejs"].map((v) => getPolygon(getX(), getY(), iconSize, v)),
      ]

      World.add(world, [leftWall, rightWall, ground, mouseConstraint])

      Render.run(render)
      const runner = Runner.create()
      Runner.run(runner, engine)

      const sleep = 100
      World.add(world, topWall)
      const t1 = window.setTimeout(() => {
        World.add(world, rows.flat())
      }, sleep)

      teardown = () => {
        window.clearTimeout(t1)
        Render.stop(render)
        Runner.stop(runner)
        World.clear(engine.world, false)
        Engine.clear(engine)
      }
    }

    const measureAndSetup = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.floor(rect.width)
      const height = Math.floor(rect.height)
      if (width <= 0 || height <= 0) return
      if (width === lastWidth && height === lastHeight) return
      lastWidth = width
      lastHeight = height
      setup(width, height)
    }

    // 최초 1회 + 레이아웃 변화 대응
    measureAndSetup()
    const ro = new ResizeObserver(() => measureAndSetup())
    ro.observe(container)

    return () => {
      ro.disconnect()
      teardown?.()
      teardown = null
    }
  }, [allLogosLoaded])

  return (
    <div className={cn("absolute top-0 left-0 w-full h-full overflow-hidden z-100")} ref={containerRef}>
      <canvas className={cn("relative z-10")} ref={canvasRef} />
    </div>
  )
}
