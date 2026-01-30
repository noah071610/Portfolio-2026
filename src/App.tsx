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
  return (
    <main className={cn("w-screen min-h-dvh p-2 bg-black")}>
      <div
        className={cn(
          "w-[1000px] h-full mx-auto grid grid-cols-[420px_580px] rounded-md border border-border overflow-hidden",
        )}
      >
        <div className={cn("bg-amber-200")}></div>
        <div className={cn("bg-mainBg")}>
          {/* left side */}
          <div className={cn("w-full h-[170px] bg-red-200")}></div>

          {/* right side */}
          <div id="right-side-main" className={cn("w-full px-5 relative")}>
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
            <section className={cn("section")}>
              <div className={cn("mb-6")}>
                <h3 className={cn("text-lg font-bold")}>기술 스택</h3>
                <p className={cn("text-sm text-description")}>실무 / 실제 프로젝트에서 주로 사용한 기술.</p>
              </div>

              <div className={cn("w-full flex items-center gap-2 flex-wrap")}>
                {Object.entries(currentSkillMap).map(([key, value]) => (
                  <img key={key} src={`https://img.shields.io/badge/${value}`} alt={key} className={cn("")} />
                ))}
              </div>
            </section>

            {/* career */}
            <section className={cn("section")}>
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
            </section>

            {/* SMOORE PRODUCT */}
            <section className={cn("section")}>
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
            </section>

            {/* CANAPE PRODUCT */}
            <section className={cn("section")}>
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
            </section>

            {/* RANKING TOGETHER PRODUCT */}
            <section className={cn("section")}>
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
            </section>

            {/* OUTSOURCING PRODUCT */}
            <section className={cn("section")}>
              <div className={cn("mb-4")}>
                <h3 className={cn("text-lg font-bold")}>외주 작업</h3>
                <p className={cn("text-sm text-description")}>엔터프라이즈 고객사의 제품 납품</p>
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
                              <p key={`outsourcing-product-description-${index}-${descriptionIndex}`}>{description}</p>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
