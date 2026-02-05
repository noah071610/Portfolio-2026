export const CARD_CONFIG = {
  COUNT: 7,
  CENTER: 3,
  // 드래그 이동량 계산 단위 (rem)
  // 실제 포인터 이동(px)은 `TarotCard.tsx`에서 rem으로 변환해 맞춰서 계산합니다.
  DELTA_CALC: 100 / 16,
  // 카드 크기 (rem)
  W: 160 / 16,
  H: 248 / 16,
  DRAG_DELAY: 10,
}

// `TarotCard.tsx`의 카드 기본 배치(x/rotate/y) 기준
// (TRIPLE_LEFT ~ TRIPLE_RIGHT 순서)
const CARD_BASE_POSE = {
  // x/y는 rem 기준 숫자 값입니다. (ex: x: 6.25 => "6.25rem")
  TRIPLE_LEFT: { x: -240 / 16, rotate: -30, y: 100 / 16 },
  DOUBLE_LEFT: { x: -180 / 16, rotate: -16, y: 60 / 16 },
  LEFT: { x: -100 / 16, rotate: -8, y: 22 / 16 },
  CENTER: { x: 0, rotate: 0, y: -20 / 16 },
  RIGHT: { x: 100 / 16, rotate: 8, y: 22 / 16 },
  DOUBLE_RIGHT: { x: 180 / 16, rotate: 16, y: 60 / 16 },
  TRIPLE_RIGHT: { x: 240 / 16, rotate: 30, y: 100 / 16 },
} as const

export const CARD_POSITION = {
  RENDING: {
    TRIPLE_LEFT: {
      ...CARD_BASE_POSE.TRIPLE_LEFT,
      scale: 0.7,
      opacity: 0,
      zIndex: 10,
      rotateY: 0,
    },
    DOUBLE_LEFT: {
      ...CARD_BASE_POSE.DOUBLE_LEFT,
      scale: 0.85,
      opacity: 0,
      zIndex: 250,
      rotateY: 0,
    },
    LEFT: {
      ...CARD_BASE_POSE.LEFT,
      scale: 0.93,
      opacity: 1,
      zIndex: 500,
      rotateY: 0,
    },
    CENTER: {
      ...CARD_BASE_POSE.CENTER,
      scale: 1,
      opacity: 1,
      zIndex: 1000,
      rotateY: 0,
    },
    RIGHT: {
      ...CARD_BASE_POSE.RIGHT,
      scale: 0.93,
      opacity: 1,
      zIndex: 500,
      rotateY: 0,
    },
    DOUBLE_RIGHT: {
      ...CARD_BASE_POSE.DOUBLE_RIGHT,
      scale: 0.85,
      opacity: 0,
      zIndex: 250,
      rotateY: 0,
    },
    TRIPLE_RIGHT: {
      ...CARD_BASE_POSE.TRIPLE_RIGHT,
      scale: 0.7,
      opacity: 0,
      zIndex: 10,
      rotateY: 0,
    },
  },
  START: {
    TRIPLE_LEFT: {
      ...CARD_BASE_POSE.TRIPLE_LEFT,
      scale: 0.7,
      opacity: 1,
      zIndex: 10,
    },
    DOUBLE_LEFT: {
      ...CARD_BASE_POSE.DOUBLE_LEFT,
      scale: 0.85,
      opacity: 1,
      zIndex: 250,
    },
    LEFT: {
      ...CARD_BASE_POSE.LEFT,
      scale: 0.9,
      opacity: 1,
      zIndex: 500,
    },
    CENTER: {
      ...CARD_BASE_POSE.CENTER,
      scale: 1,
      opacity: 1,
      zIndex: 1000,
    },
    RIGHT: {
      ...CARD_BASE_POSE.RIGHT,
      scale: 0.9,
      opacity: 1,
      zIndex: 500,
    },
    DOUBLE_RIGHT: {
      ...CARD_BASE_POSE.DOUBLE_RIGHT,
      scale: 0.85,
      opacity: 1,
      zIndex: 250,
    },
    TRIPLE_RIGHT: {
      ...CARD_BASE_POSE.TRIPLE_RIGHT,
      scale: 0.7,
      opacity: 1,
      zIndex: 10,
    },
  },
  SHOW_REWARD: {
    TRIPLE_LEFT: {
      ...CARD_BASE_POSE.TRIPLE_LEFT,
      opacity: 0,
      y: 80 / 16,
      scale: 0.7,
      zIndex: 10,
    },
    DOUBLE_LEFT: {
      ...CARD_BASE_POSE.DOUBLE_LEFT,
      opacity: 0,
      y: 50 / 16,
      scale: 0.85,
      zIndex: 250,
    },
    LEFT: {
      ...CARD_BASE_POSE.LEFT,
      opacity: 0,
      y: 15 / 16,
      scale: 0.9,
      zIndex: 500,
    },
    CENTER: {
      ...CARD_BASE_POSE.CENTER,
      scale: 1.12,
      y: 20 / 16,
      opacity: 1,
      zIndex: 1000,
    },
    RIGHT: {
      ...CARD_BASE_POSE.RIGHT,
      opacity: 0,
      y: 15 / 16,
      scale: 0.9,
      zIndex: 500,
    },
    DOUBLE_RIGHT: {
      ...CARD_BASE_POSE.DOUBLE_RIGHT,
      opacity: 0,
      y: 50 / 16,
      scale: 0.85,
      zIndex: 250,
    },
    TRIPLE_RIGHT: {
      ...CARD_BASE_POSE.TRIPLE_RIGHT,
      opacity: 0,
      y: 80 / 16,
      scale: 0.7,
      zIndex: 10,
    },
  },
}

export const POSITION_RENDERING_ARR = [
  CARD_POSITION.RENDING.TRIPLE_LEFT,
  CARD_POSITION.RENDING.DOUBLE_LEFT,
  CARD_POSITION.RENDING.LEFT,
  CARD_POSITION.RENDING.CENTER,
  CARD_POSITION.RENDING.RIGHT,
  CARD_POSITION.RENDING.DOUBLE_RIGHT,
  CARD_POSITION.RENDING.TRIPLE_RIGHT,
]

export const POSITION_START_ARR = [
  CARD_POSITION.START.TRIPLE_LEFT,
  CARD_POSITION.START.DOUBLE_LEFT,
  CARD_POSITION.START.LEFT,
  CARD_POSITION.START.CENTER,
  CARD_POSITION.START.RIGHT,
  CARD_POSITION.START.DOUBLE_RIGHT,
  CARD_POSITION.START.TRIPLE_RIGHT,
]

export const POSITION_SHOW_REWARD_ARR = [
  CARD_POSITION.SHOW_REWARD.TRIPLE_LEFT,
  CARD_POSITION.SHOW_REWARD.DOUBLE_LEFT,
  CARD_POSITION.SHOW_REWARD.LEFT,
  CARD_POSITION.SHOW_REWARD.CENTER,
  CARD_POSITION.SHOW_REWARD.RIGHT,
  CARD_POSITION.SHOW_REWARD.DOUBLE_RIGHT,
  CARD_POSITION.SHOW_REWARD.TRIPLE_RIGHT,
]

export const CARD_ANIMATION_DIRECTION = [
  {
    index: CARD_CONFIG.CENTER - 3, // TRIPLE_LEFT 카드
    from: CARD_POSITION.START.TRIPLE_LEFT,
    to: CARD_POSITION.START.TRIPLE_LEFT, // 더 왼쪽으로 이동할 수 있도록
  },
  {
    index: CARD_CONFIG.CENTER - 2,
    from: CARD_POSITION.START.DOUBLE_LEFT,
    to: CARD_POSITION.START.TRIPLE_LEFT,
  },
  {
    index: CARD_CONFIG.CENTER - 1,
    from: CARD_POSITION.START.LEFT,
    to: CARD_POSITION.START.DOUBLE_LEFT,
  },
  {
    index: CARD_CONFIG.CENTER,
    from: CARD_POSITION.START.CENTER,
    to: CARD_POSITION.START.LEFT,
  },
  {
    index: CARD_CONFIG.CENTER + 1,
    from: CARD_POSITION.START.RIGHT,
    to: CARD_POSITION.START.CENTER,
  },
  {
    index: CARD_CONFIG.CENTER + 2,
    from: CARD_POSITION.START.DOUBLE_RIGHT,
    to: CARD_POSITION.START.RIGHT,
  },
  {
    index: CARD_CONFIG.CENTER + 3, // TRIPLE_RIGHT 카드
    from: CARD_POSITION.START.TRIPLE_RIGHT,
    to: CARD_POSITION.START.DOUBLE_RIGHT, // 더 오른쪽으로 이동할 수 있도록
  },
]
