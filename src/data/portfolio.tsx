export const portfolio_tags = {
  achieve: <div className="badge badge-soft badge-primary min-w-17 text-xs">성과</div>,
  startup: <div className="badge badge-soft badge-warning min-w-17 text-xs">스타트업</div>,
  experience: <div className="badge badge-soft badge-secondary min-w-17 text-xs">경력</div>,
  etc: <div className="badge badge-soft badge-tertiary min-w-17 text-xs">개발 외</div>,
}

export const smooreExperienceData = [
  {
    category: portfolio_tags.startup,
    descriptions: [
      "C-level만 있는 회사에 초기 멤버로 들어가 풀스택 개발",
      "다양한 스타트업 경영 방식에 대해 적극적으로 의논하고 도입",
    ],
  },
  {
    category: portfolio_tags.startup,
    descriptions: ["개발자 면접관 참여, 고객사에 직접 찾아가 피드백 수렴, 일본 진출 서포트 등 개발 외 업무 수행"],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: [
      "다른 팀원이 눈치채지 못한 SEO 이슈에 대해 자발적으로 대처하고 최적화한 경험. Google search console에서 일일 평균 클릭 수 1000% 상승",
    ],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: [
      "이미지 크롭과 압축, 스프라이팅, lambda 이미지 리사이징, S3 버킷 개발으로 최대 용량 50% 이상 압축, 최대 16배 이상 http 요청 감소 성과 -> 용량 최적화에 대한 깊은 이해",
    ],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: ["node.js 서버에 Redis를 사용한 자동 캐싱 Class 함수를 구축 후 활용. 평균 30% 이상 속도 개선 추정"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: [
      "앱과 로그인 페이지, 홈페이지 그 외 서브페이지 등 풀스택 전담 개발, 웹사이트는 배포 후 MAU 200% 증가",
    ],
  },
  {
    category: portfolio_tags.experience,
    descriptions: [
      "대규모 SaaS 서버를 무중단 리팩토링했던 경험. 약 91개의 테스트 코드 작성 및 검토 후 테스트 자동화. 수많은 잠재적 에러 발생 가능성 감소",
    ],
  },
  {
    category: portfolio_tags.experience,
    descriptions: [
      "Next.js cache와 SSG 그리고 react query, http 캐시 등 strict한 캐싱을 선호하며, 이를 적극 사용한 프론트엔드 성능 최적화 경험",
    ],
  },
  {
    category: portfolio_tags.etc,
    descriptions: [
      "일본어, 영어 통역 자격증을 보유한 능력을 바탕으로 AI에 도움을 받아 번역을 검수하며 보다 완벽한 다국어 지원 개발",
    ],
  },
]

export const canapeExperienceData = [
  {
    category: portfolio_tags.startup,
    descriptions: [
      "프로덕트 매니저로서 백로그 및 로드맵 일정 관리와 개발자 R&R 분배, growth팀과 매출 분석 및 비즈니스 전략 수립 경험",
      "제품 비전부터 전략까지 경험하며 WHY를 던지고 HOW를 제안하는 개발자",
    ],
  },
  {
    category: portfolio_tags.startup,
    descriptions: [
      "스타트업부터 대기업까지 다양한 분야의 개발&마케팅팀과 서비스 커스터마이징 연동 및 콜라보레이션 협업 미팅 진행 경험",
    ],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: ["Cloudflare와 Vercel서버 장애, CVE-2025-55182/CVE-2025-66478 보안 취약점 즉각 대응 및 복구 경험"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["DAU 최대 3만, MAU 50만~100만 대규모 프로젝트에서의 서버 트래픽 처리 경험"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["프로덕트 연동 sdk 개발 및 개발자용 공식문서 직접 작성 후 유지보수 경험"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["프론트엔드 백엔드 레거시 리팩토링 및 성능 최적화 경험"],
  },
]

export const outsourcingExperienceData = [
  {
    company: <div className="badge badge-outline badge-info">HIxx</div>,
    descriptions: ["6개국 이상 참여 트래픽 10만 예상 프로젝트 리드 개발"],
  },
  {
    company: <div className="badge badge-outline badge-warning">노머x</div>,
    descriptions: ["참여율을 높이는 애니메이션을 적극 제안하며 모바일 first 콘텐츠 개발"],
  },
  {
    company: <div className="badge badge-outline badge-error">닥터포xx</div>,
    descriptions: ["고용량 영상 및 이미지를 깨짐 없이 최적화하는 프론트엔드 개발"],
  },
]

export const rankingtogetherExperienceData = [
  {
    category: portfolio_tags.achieve,
    descriptions: ["Lambda에 재귀함수가 들어가 많은 request 발생하는 것을 cloud watch로 찾아내 개선"],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: [
      "비용 절감을 위한 스토리지, 클라우드 서버를 탐색 및 도입. 지출을 줄여주는 것도 매출에 기여하는 것이라고 통감",
    ],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["백엔드 DB 인덱싱 최적화 및 fullText search 도입"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: [
      "CI/CD 설계와 Docker를 통한 도커라이징 및 AWS EC2 배포 -> 리버스 프록시, 메모리 스왑, 포트 포워딩, SSL 적용",
    ],
  },
]
