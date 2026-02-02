export enum StageType {
  COVER = 0,
  COVER_END = 1,
  QUIZ = 2,
  RESULT_LOADING = 3,
  RESULT = 4,
}

export type QuestionTransitioningType = "stable" | "outgoing" | "incoming" | "goBack" | "comeBack"

export interface Answer {
  index: number
  label: string
  point: number
}

export interface AnswerSheet {
  point: number
  selected: Answer[]
}

export interface Question {
  index: number
  title: string
  image?: string
  answers: Answer[]
}

export interface Result {
  hash: string
  title: string
  description: string
  assets: {
    thumbnail: string
    recommendedProduct: string
  }
}
