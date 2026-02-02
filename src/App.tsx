import { useCallback, useState } from "react"
import Galaxy from "./components/Galaxy"
import Canape from "./components/LeftHero/Canape"
import Skills from "./components/LeftHero/Skills"
import Smore from "./components/LeftHero/Smore"
import Section from "./components/Section"
import { imageAssets } from "./data/images"
import {
  canapeExperienceData,
  outsourcingExperienceData,
  rankingtogetherExperienceData,
  smooreExperienceData,
} from "./data/portfolio"
import { currentSkillMap } from "./data/skills"
import { cn } from "./lib/utils"

function App() {
  const [playNumber, setPlayNumber] = useState<number | null>(null)

  const onClickSection = useCallback((number?: number | null) => {
    setPlayNumber(number ?? null)
  }, [])

  const onClickRightSide: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target
    if (!(target instanceof Element)) return

    const sectionEl = target.closest('[id^="section-"]')
    if (!sectionEl) {
      setPlayNumber(null)
      return
    }

    const m = sectionEl.id.match(/^section-(\d+)$/)
    if (!m) {
      setPlayNumber(null)
      return
    }

    onClickSection(Number(m[1]))
  }
  return (
    <main className={cn("w-screen h-dvh p-3 bg-black overflow-hidden")}>
      <div className={cn("w-full h-full overflow-scroll")}>
        <div
          id="content"
          className={cn("w-250 mx-auto grid grid-cols-[26.25rem_36.25rem] rounded-md border border-border")}
        >
          <div
            className={cn("w-full sticky top-0 bg-black rounded-l-md overflow-hidden")}
            style={{ height: "calc(100dvh - 1.5rem)" }}
          >
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.5}
              speed={1}
            />
            {playNumber === 1 && <Skills allLogosLoaded={true} />}
            {playNumber === 3 && <Smore />}
            {playNumber === 4 && <Canape />}
          </div>
          <div className={cn("bg-mainBg rounded-r-md overflow-hidden")}>
            {/* left side */}
            <div className={cn("w-full h-40 bg-red-200")}></div>

            {/* right side */}
            <div onClick={onClickRightSide} id="right-side" className={cn("w-full px-5 relative")}>
              {/* profile */}
              <div className={cn("flex items-end gap-4 px-10 w-full mb-10")}>
                <img
                  src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="profile"
                  className={cn("w-20 h-20 rounded-full object-cover -translate-y-[30%]")}
                />
                <div className={cn("pt-2")}>
                  <p className={cn("text-xl font-bold")}>장현수</p>
                  <p className={cn("text-xs text-description mb-1")}>Full Stack & App Developer</p>
                  <div className={cn("flex items-center gap-2")}>
                    <p className={cn("text-sm text-description")}>Do my best to make the best</p>
                  </div>
                </div>
              </div>

              {/* skills */}
              <Section sectionNumber={1}>
                <div className={cn("mb-6")}>
                  <h3 className={cn("text-lg font-bold")}>기술 스택</h3>
                  <p className={cn("text-sm text-description")}>실무 / 실제 프로젝트에서 주로 사용한 기술.</p>
                </div>

                <div className={cn("w-full flex items-center gap-2 flex-wrap")}>
                  {Object.entries(currentSkillMap).map(([key, value]) => (
                    <img key={key} src={`https://img.shields.io/badge/${value}`} alt={key} className={cn("h-5")} />
                  ))}
                </div>
              </Section>

              {/* career */}
              <Section sectionNumber={2} hasNoContent={true}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>경력</h3>
                  <p className={cn("text-sm text-description")}>스타트업 초기멤버로 함께 성장한 하나의 기업</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex gap-3")}>
                    <div
                      style={{ background: `url(${imageAssets.doda.squareLogo}) center / cover` }}
                      className={cn("box")}
                    ></div>
                    <div className={cn("flex flex-col")}>
                      <p className={cn("text-md font-bold mb-1")}>도다마인드</p>
                      <p className={cn("text-[0.8rem] leading-4 text-description")}>
                        2021년 11월 ~ 2026년 2월 (4년 3개월)
                      </p>
                      <p className={cn("text-[0.8rem] leading-4 text-description")}>풀스택 개발</p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* SMOORE PRODUCT */}
              <Section sectionNumber={3}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>스모어 프로덕트</h3>
                  <p className={cn("text-sm text-description")}>인터렉티브 퀴즈&설문 빌더</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 text-description")}>
                      블로그, 가이드 등 서브 페이지를 포함한 풀스택 개발
                      <br />
                      대규모 리팩토링과 테스트 코드 작성 및 타사 앱과의 api 연동 개발 경험
                      <br />
                      캐시카우 프로젝트, 슬랙 봇, 크롬 익스텐션 등 사이드 프로젝트 개발 다수
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>분류</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {smooreExperienceData.map((item, index) => (
                          <tr key={`smoore-product-${index}`}>
                            <td>{item.category}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`smoore-product-description-${index}-${descriptionIndex}`}>{description}</p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* CANAPE PRODUCT */}
              <Section sectionNumber={4}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>카나페 프로덕트</h3>
                  <p className={cn("text-sm text-description")}>노코드 참여형 이벤트/콘텐츠 빌더</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 text-description")}>
                      · 블로그, 가이드 등 서브 페이지를 포함한 풀스택 개발 및 PM 업무 수행
                      <br />
                      · 결제 시스템과 클라우드 서버 장애 대응 및 복구 / MAU 50만~100만 트래픽 처리 경험
                      <br />
                      · 공식 지원 api sdk 개발 및 개발자용 공식문서 직접 작성 후 유지보수 경험
                      <br />· 레거시 리팩토링 및 성능 최적화와 아름다운 애니메이션 주도 개발
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>분류</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {canapeExperienceData.map((item, index) => (
                          <tr key={`canape-product-${index}`}>
                            <td>{item.category}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`canape-product-description-${index}-${descriptionIndex}`}>{description}</p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* RANKING TOGETHER PRODUCT */}
              <Section sectionNumber={5}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>랭킹투게더</h3>
                  <p className={cn("text-sm text-description")}>크리에이티브 컨텐츠 공유 플랫폼</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col")}>
                    <p className={cn("text-sm leading-5 text-description mb-0.5")}>
                      · AI 활용 능력을 향상하고, 아이디어를 구체화하는
                      <br />
                      스타트업 프로세스를 1인 개발으로 경험하기 위한 개인 프로젝트
                    </p>
                    <p className={cn("text-sm leading-5.5 text-description")}>
                      · 디시인사이드, 오픈채팅에서 잠깐 DAU를 1000명 달성 <br /> · 피봇 후 드랍한 프로젝트. 코딩이 제일
                      쉽고 개발이 제일 어렵다
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>분류</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankingtogetherExperienceData.map((item, index) => (
                          <tr key={`rankingtogether-product-${index}`}>
                            <td>{item.category}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`rankingtogether-product-description-${index}-${descriptionIndex}`}>
                                  {description}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* OUTSOURCING PRODUCT */}
              <Section sectionNumber={6}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>외주 작업</h3>
                  <p className={cn("text-sm text-description")}>고객사의 납품할 제품 전담 개발</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 text-description")}>
                      · 프론트엔드 100% 개발 및 CTO와 협업해 백엔드, 배포
                      <br />· 클라이언트 요청 사항 반영 및 개발 담당으로서 팀원과의 적극적인 협업 경험
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>기업</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outsourcingExperienceData.map((item, index) => (
                          <tr key={`outsourcing-product-${index}`}>
                            <td>{item.company}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`outsourcing-product-description-${index}-${descriptionIndex}`}>
                                  {description}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* AI SMART WORDBOOK PRODUCT */}
              <Section sectionNumber={7}>
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>스마트 단어장 어플</h3>
                  <p className={cn("text-sm text-description")}>간단하게 단어장을 만들고 외울 수 있는 어플</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 text-description")}>
                      · 플러터를 사용한 구축 및 앱스토어 배포
                      <br />· 실제 단어장에 한땀 한땀 적은 단어장 처럼 공부 할 수 있게 다양한 기능 제공
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>기업</th>
                          <th>설명</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outsourcingExperienceData.map((item, index) => (
                          <tr key={`outsourcing-product-${index}`}>
                            <td>{item.company}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`outsourcing-product-description-${index}-${descriptionIndex}`}>
                                  {description}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
