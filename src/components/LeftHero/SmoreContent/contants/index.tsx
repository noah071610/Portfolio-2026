import type { AnswerSheet, Question } from "../types"

export const eventData: {
  questions: Question[]
} = {
  questions: [
    {
      index: 0,
      title: "내가 선호하는 이상적인 프론트엔드 개발자는...",
      answers: [
        {
          index: 0,
          label: "AI를 사용해서 구현만 해낸다면<br/>백엔드 개발자라도 상관없다.",
          point: 70,
        },
        {
          index: 1,
          label: "프론트엔드 성능 최적화에 능숙한<br/>개발자를 선호한다.",
          point: 90,
        },
        {
          index: 2,
          label: "디자인/애니메이션 감각과 센스가 있는<br/>개발자를 선호한다.",
          point: 100,
        },
      ],
    },
    {
      index: 1,
      title: "내가 선호하는 이상적인 백엔드 개발자는...",
      answers: [
        {
          index: 0,
          label: "하나의 언어와 아키텍처에만 특화되어<br/>있는 백엔드 개발자를 선호한다.",
          point: 50,
        },
        {
          index: 1,
          label: "성능 최적화와 DB스케일링에 능숙한<br/>개발자를 선호한다.",
          point: 80,
        },
        {
          index: 2,
          label: "다양한 마이크로서비스 및 서버리스 등에 상황에 맞는 도전을 좋아하는 개발자를 선호한다.",
          point: 100,
        },
      ],
    },
    {
      index: 2,
      title: "내가 선호하는 이상적인 엔지니어는...",
      // image: "https://doda-static.com/img/900/80/1/1/1760956894457-6173036.jpg",
      answers: [
        { index: 0, label: "개발자는 개발만 하면 된다.", point: 30 },
        {
          index: 1,
          label: "개발 외 PM업무, CS등 다양한 경험도<br/>있는 엔지니어를 선호한다.",
          point: 100,
        },
        {
          index: 2,
          label: "좀 더 근본적인 CS지식이 있는<br/>엔지니어를 선호한다.",
          point: 100,
        },
      ],
    },
    {
      index: 3,
      title: "내가 채용하고 싶은 인재는...",
      // image: "https://doda-static.com/img/900/80/1/1/1760956894457-6173036.jpg",
      answers: [
        { index: 0, label: "성과 중심에 가치를 두는 인재를 선호한다.", point: 80 },
        {
          index: 1,
          label: "소통이 원활하고 커뮤니케이션<br/>능력이 있는 인재를 선호한다.",
          point: 90,
        },
        {
          index: 2,
          label: "고객 중심의 사고방식을 가지고 있는<br/>인재를 선호한다.",
          point: 100,
        },
      ],
    },
  ],
}

// export const resultMap = eventData.results.reduce(
//   (acc, curr) => {
//     acc[curr.hash] = curr
//     return acc
//   },
//   {} as Record<string, Result>,
// )

export const initialAnswerSheet: AnswerSheet = {
  point: 0,
  selected: [],
} as const
