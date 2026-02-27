import type { AnswerSheet } from "../types"

export const eventData = {
  questions: [
    {
      index: 0,
      title: "event.q1.title",
      answers: [
        {
          index: 0,
          label: "event.q1.a1",
          point: 70,
        },
        {
          index: 1,
          label: "event.q1.a2",
          point: 90,
        },
        {
          index: 2,
          label: "event.q1.a3",
          point: 100,
        },
      ],
    },
    {
      index: 1,
      title: "event.q2.title",
      answers: [
        {
          index: 0,
          label: "event.q2.a1",
          point: 50,
        },
        {
          index: 1,
          label: "event.q2.a2",
          point: 80,
        },
        {
          index: 2,
          label: "event.q2.a3",
          point: 100,
        },
      ],
    },
    {
      index: 2,
      title: "event.q3.title",
      answers: [
        {
          index: 0,
          label: "event.q3.a1",
          point: 30,
        },
        {
          index: 1,
          label: "event.q3.a2",
          point: 100,
        },
        {
          index: 2,
          label: "event.q3.a3",
          point: 100,
        },
      ],
    },
    {
      index: 3,
      title: "event.q4.title",
      answers: [
        {
          index: 0,
          label: "event.q4.a1",
          point: 80,
        },
        {
          index: 1,
          label: "event.q4.a2",
          point: 90,
        },
        {
          index: 2,
          label: "event.q4.a3",
          point: 100,
        },
      ],
    },
  ],
}

export const initialAnswerSheet: AnswerSheet = {
  point: 0,
  selected: [],
} as const
