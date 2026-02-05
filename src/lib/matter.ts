import { Bodies, Body } from "matter-js"
import { getRandom } from "./getRandom"

const ICON_PX = 60
const getScale = (size: number) => size / ICON_PX
const baseUrl = "https://noah071610.github.io/Portfolio-2026/"

const FRICTION = 0.05
const RESTITUTION = 0.5
export const getCircle = (x: number, y: number, size: number, asset: string) => {
  const circle = () =>
    Bodies.circle(x, y, size, {
      friction: FRICTION,
      restitution: RESTITUTION,
      angle: getRandom(0, 360),
      angularVelocity: 0.1,
      render: {
        sprite: {
          texture: `${baseUrl}/images/icons/${asset}.png`,
          xScale: getScale(size),
          yScale: getScale(size),
        },
      },
    })

  // 랜덤한 초기 속도 설정

  const target = circle()
  Body.setVelocity(target, { x: getRandom(-1, 1), y: getRandom(0, 5) })

  return target
}

export const getRectangle = (x: number, y: number, size: number, asset: string) => {
  const rectangle = () =>
    Bodies.rectangle(x, y, size + 30, size + 30, {
      friction: FRICTION,
      restitution: RESTITUTION,
      angle: getRandom(0, 360),
      angularVelocity: 0.1,
      render: {
        sprite: {
          texture: `${baseUrl}/images/icons/${asset}.png`,
          xScale: getScale(size),
          yScale: getScale(size),
        }, // 여기
      },
    })

  const target = rectangle()
  Body.setVelocity(target, { x: getRandom(-1, 1), y: getRandom(0, 5) })

  return target
}

export const getPolygon = (x: number, y: number, size: number, asset: string) => {
  const polygon = () =>
    Bodies.polygon(x, y, 6, size, {
      friction: FRICTION,
      restitution: RESTITUTION,
      angle: getRandom(0, 360),
      angularVelocity: 0.1,
      render: {
        sprite: {
          texture: `${baseUrl}/images/icons/${asset}.png`,
          xScale: getScale(size),
          yScale: getScale(size),
        }, // 여기
      },
    })

  const target = polygon()
  Body.setVelocity(target, { x: getRandom(-1, 1), y: getRandom(0, 5) })

  return target
}
