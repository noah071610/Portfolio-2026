/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MotionProps } from "framer-motion"

export const EASE_OUT = [0.21, 0.88, 0.29, 1] as const

const _slideAnimation = {
  opacityDuration: 0.25,
  xDuration: 0.6,
  scaleDuration: 0.4,
  xEase: [0.04, 1.01, 0.48, 1],
  xPercentage: 55,
  scale: 0.45,

  thumbnailScale: 0.87,
  thumbnailOpacityDuration: 0.2,
}

export const quizAnimationVariants: { [key: string]: any } = {
  initial: {
    opacity: 0,
    y: 0,
    x: `${_slideAnimation.xPercentage}%`,
    scale: _slideAnimation.scale,
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  stable: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  outgoing: {
    opacity: 0,
    y: 0,
    x: `-${_slideAnimation.xPercentage}%`,
    scale: _slideAnimation.scale,
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  incoming: {
    opacity: 1,
    y: 0,
    x: [`${_slideAnimation.xPercentage - 10}%`, 0],
    scale: [_slideAnimation.scale, 1],
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  goBack: {
    opacity: 0,
    y: 0,
    x: `${_slideAnimation.xPercentage}%`,
    scale: _slideAnimation.scale,
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  comeBack: {
    opacity: [0, 1],
    y: 0,
    x: [`-${_slideAnimation.xPercentage}%`, 0],
    scale: [_slideAnimation.scale, 1],
    transition: {
      opacity: { duration: _slideAnimation.opacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
} as const

export const quizAnimationThumbnailVariants: { [key: string]: any } = {
  initial: {
    opacity: 0,
    x: `${_slideAnimation.xPercentage}%`,
    scale: _slideAnimation.thumbnailScale,
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  stable: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  outgoing: {
    opacity: 0,
    x: `-${_slideAnimation.xPercentage + 25}%`,
    scale: _slideAnimation.thumbnailScale,
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  incoming: {
    opacity: [0, 1],
    x: [`${_slideAnimation.xPercentage - 10}%`, 0],
    scale: [_slideAnimation.thumbnailScale, 1],
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  goBack: {
    opacity: 0,
    x: `${_slideAnimation.xPercentage}%`,
    scale: _slideAnimation.thumbnailScale,
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
  comeBack: {
    opacity: [0, 1],
    x: [`-${_slideAnimation.xPercentage}%`, 0],
    scale: [_slideAnimation.thumbnailScale, 1],
    transition: {
      opacity: { duration: _slideAnimation.thumbnailOpacityDuration },
      x: {
        duration: _slideAnimation.xDuration,
        ease: _slideAnimation.xEase,
      },
      scale: {
        duration: _slideAnimation.scaleDuration,
        ease: _slideAnimation.xEase,
      },
    },
  },
} as const

export const fadeUpStaggerAnimation = {
  variants: {
    initial: {
      opacity: 0,
      y: 100,
      transition: {
        y: {
          duration: 1.12,
          ease: [0.21, 0.88, 0.29, 1],
        },
        opacity: {
          duration: 0.7,
        },
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: 1.12,
          ease: [0.21, 0.88, 0.29, 1],
        },
        opacity: {
          duration: 0.7,
        },
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      x: `-${_slideAnimation.xPercentage}%`,
      scale: _slideAnimation.scale,
      transition: {
        opacity: { duration: _slideAnimation.opacityDuration },
        x: {
          duration: _slideAnimation.xDuration,
          ease: _slideAnimation.xEase,
        },
        scale: {
          duration: _slideAnimation.scaleDuration,
          ease: _slideAnimation.xEase,
        },
      },
    },
  },
} as MotionProps
